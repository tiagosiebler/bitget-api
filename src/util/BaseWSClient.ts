import EventEmitter from 'events';
import WebSocket from 'isomorphic-ws';

import { WebsocketClientOptions, WSClientConfigurableOptions } from '../types';
import WsStore from './WsStore';
import { WsConnectionStateEnum } from './WsStore.types';
import { DefaultLogger } from './logger';
import { isWsPong } from './requestUtils';
import { getWsAuthSignature } from './websocket-util';

interface WSClientEventMap<WsKey extends string> {
  /** Connection opened. If this connection was previously opened and reconnected, expect the reconnected event instead */
  open: (evt: { wsKey: WsKey; event: any }) => void;
  /** Reconnecting a dropped connection */
  reconnect: (evt: { wsKey: WsKey; event: any }) => void;
  /** Successfully reconnected a connection that dropped */
  reconnected: (evt: { wsKey: WsKey; event: any }) => void;
  /** Connection closed */
  close: (evt: { wsKey: WsKey; event: any }) => void;
  /** Received reply to websocket command (e.g. after subscribing to topics) */
  response: (response: any & { wsKey: WsKey }) => void;
  /** Received data for topic */
  update: (response: any & { wsKey: WsKey }) => void;
  /** Exception from ws client OR custom listeners (e.g. if you throw inside your event handler) */
  exception: (response: any & { wsKey: WsKey }) => void;
  /** Confirmation that a connection successfully authenticated */
  authenticated: (event: { wsKey: WsKey; event: any }) => void;
}

// Type safety for on and emit handlers: https://stackoverflow.com/a/61609010/880837
export interface BaseWebsocketClient<
  TWSKey extends string,
  TWSTopicSubscribeEventArgs extends object,
> {
  on<U extends keyof WSClientEventMap<TWSKey>>(
    event: U,
    listener: WSClientEventMap<TWSKey>[U],
  ): this;

  emit<U extends keyof WSClientEventMap<TWSKey>>(
    event: U,
    ...args: Parameters<WSClientEventMap<TWSKey>[U]>
  ): boolean;
}

export interface BaseWSClientImpl {}

const LOGGER_CATEGORY = { category: 'bitget-ws' };

export abstract class BaseWebsocketClient<
  TWSKey extends string,
  TWSTopicSubscribeEventArgs extends object,
> extends EventEmitter {
  private wsStore: WsStore<TWSKey, TWSTopicSubscribeEventArgs>;

  protected logger: typeof DefaultLogger;
  protected options: WebsocketClientOptions;

  constructor(
    options: WSClientConfigurableOptions,
    logger?: typeof DefaultLogger,
  ) {
    super();

    this.logger = logger || DefaultLogger;
    this.wsStore = new WsStore(this.logger);

    this.options = {
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      recvWindow: 0,
      ...options,
    };
  }

  protected abstract getWsKeyForTopic(
    subscribeEvent: TWSTopicSubscribeEventArgs,
    isPrivate?: boolean,
  ): TWSKey;

  protected abstract isPrivateChannel(
    subscribeEvent: TWSTopicSubscribeEventArgs,
  ): boolean;

  protected abstract shouldAuthOnConnect(wsKey: TWSKey): boolean;
  protected abstract getWsUrl(wsKey: TWSKey): string;
  protected abstract getMaxTopicsPerSubscribeEvent(
    wsKey: TWSKey,
  ): number | null;

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  abstract connectAll(): Promise<WebSocket | undefined>[];

  /**
   * Subscribe to topics & track/persist them. They will be automatically resubscribed to if the connection drops/reconnects.
   * @param wsTopics topic or list of topics
   * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public subscribe(
    wsTopics: TWSTopicSubscribeEventArgs[] | TWSTopicSubscribeEventArgs,
    isPrivateTopic?: boolean,
  ) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];

    topics.forEach((topic) => {
      const wsKey = this.getWsKeyForTopic(topic, isPrivateTopic);

      // Persist this topic to the expected topics list
      this.wsStore.addTopic(wsKey, topic);

      // TODO: tidy up unsubscribe too, also in other connectors

      // if connected, send subscription request
      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
      ) {
        // if not authenticated, dont sub to private topics yet.
        // This'll happen automatically once authenticated
        const isAuthenticated = this.wsStore.get(wsKey)?.isAuthenticated;
        if (!isAuthenticated) {
          return this.requestSubscribeTopics(
            wsKey,
            topics.filter((topic) => !this.isPrivateChannel(topic)),
          );
        }
        return this.requestSubscribeTopics(wsKey, topics);
      }

      // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
      if (
        !this.wsStore.isConnectionState(
          wsKey,
          WsConnectionStateEnum.CONNECTING,
        ) &&
        !this.wsStore.isConnectionState(
          wsKey,
          WsConnectionStateEnum.RECONNECTING,
        )
      ) {
        return this.connect(wsKey);
      }
    });
  }

  /**
   * Unsubscribe from topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
   * @param wsTopics topic or list of topics
   * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public unsubscribe(
    wsTopics: TWSTopicSubscribeEventArgs[] | TWSTopicSubscribeEventArgs,
    isPrivateTopic?: boolean,
  ) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach((topic) => {
      this.wsStore.deleteTopic(
        this.getWsKeyForTopic(topic, isPrivateTopic),
        topic,
      );

      const wsKey = this.getWsKeyForTopic(topic, isPrivateTopic);

      // unsubscribe request only necessary if active connection exists
      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
      ) {
        this.requestUnsubscribeTopics(wsKey, [topic]);
      }
    });
  }

  /** Get the WsStore that tracks websockets & topics */
  public getWsStore(): WsStore<TWSKey, TWSTopicSubscribeEventArgs> {
    return this.wsStore;
  }

  public close(wsKey: TWSKey, force?: boolean) {
    this.logger.info('Closing connection', { ...LOGGER_CATEGORY, wsKey });
    this.setWsState(wsKey, WsConnectionStateEnum.CLOSING);
    this.clearTimers(wsKey);

    const ws = this.getWs(wsKey);
    ws?.close();
    if (force) {
      ws?.terminate();
    }
  }

  public closeAll(force?: boolean) {
    this.wsStore.getKeys().forEach((key: TWSKey) => {
      this.close(key, force);
    });
  }

  /**
   * Request connection to a specific websocket, instead of waiting for automatic connection.
   */
  protected async connect(wsKey: TWSKey): Promise<WebSocket | undefined> {
    try {
      if (this.wsStore.isWsOpen(wsKey)) {
        this.logger.error(
          'Refused to connect to ws with existing active connection',
          { ...LOGGER_CATEGORY, wsKey },
        );
        return this.wsStore.getWs(wsKey);
      }

      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTING)
      ) {
        this.logger.error(
          'Refused to connect to ws, connection attempt already active',
          { ...LOGGER_CATEGORY, wsKey },
        );
        return;
      }

      if (
        !this.wsStore.getConnectionState(wsKey) ||
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.INITIAL)
      ) {
        this.setWsState(wsKey, WsConnectionStateEnum.CONNECTING);
      }

      const url = this.getWsUrl(wsKey); // + authParams;
      const ws = this.connectToWsUrl(url, wsKey);

      return this.wsStore.setWs(wsKey, ws);
    } catch (err) {
      this.parseWsError('Connection failed', err, wsKey);
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
    }
  }

  private parseWsError(context: string, error: any, wsKey: TWSKey) {
    if (!error.message) {
      this.logger.error(`${context} due to unexpected error: `, error);
      this.emit('response', { ...error, wsKey });
      this.emit('exception', { ...error, wsKey });
      return;
    }

    switch (error.message) {
      case 'Unexpected server response: 401':
        this.logger.error(`${context} due to 401 authorization failure.`, {
          ...LOGGER_CATEGORY,
          wsKey,
        });
        break;

      default:
        this.logger.error(
          `${context} due to unexpected response error: "${
            error?.msg || error?.message || error
          }"`,
          { ...LOGGER_CATEGORY, wsKey, error },
        );
        break;
    }

    this.emit('response', { ...error, wsKey });
    this.emit('exception', { ...error, wsKey });
  }

  /** Get a signature, build the auth request and send it */
  private async sendAuthRequest(wsKey: TWSKey): Promise<void> {
    try {
      const { apiKey, apiSecret, apiPass, recvWindow } = this.options;

      const { signature, expiresAt } = await getWsAuthSignature(
        apiKey,
        apiSecret,
        apiPass,
        recvWindow,
      );

      this.logger.info(`Sending auth request...`, {
        ...LOGGER_CATEGORY,
        wsKey,
      });

      const request = {
        op: 'login',
        args: [
          {
            apiKey: this.options.apiKey,
            passphrase: this.options.apiPass,
            timestamp: expiresAt,
            sign: signature,
          },
        ],
      };
      // console.log('ws auth req', request);

      return this.tryWsSend(wsKey, JSON.stringify(request));
    } catch (e) {
      this.logger.silly(e, { ...LOGGER_CATEGORY, wsKey });
    }
  }

  private reconnectWithDelay(wsKey: TWSKey, connectionDelayMs: number) {
    this.clearTimers(wsKey);
    if (
      this.wsStore.getConnectionState(wsKey) !==
      WsConnectionStateEnum.CONNECTING
    ) {
      this.setWsState(wsKey, WsConnectionStateEnum.RECONNECTING);
    }

    this.wsStore.get(wsKey, true).activeReconnectTimer = setTimeout(() => {
      this.logger.info('Reconnecting to websocket', {
        ...LOGGER_CATEGORY,
        wsKey,
      });
      this.connect(wsKey);
    }, connectionDelayMs);
  }

  private ping(wsKey: TWSKey) {
    if (this.wsStore.get(wsKey, true).activePongTimer) {
      return;
    }

    this.clearPongTimer(wsKey);

    this.logger.silly('Sending ping', { ...LOGGER_CATEGORY, wsKey });
    this.tryWsSend(wsKey, 'ping');

    this.wsStore.get(wsKey, true).activePongTimer = setTimeout(() => {
      this.logger.info('Pong timeout - closing socket to reconnect', {
        ...LOGGER_CATEGORY,
        wsKey,
      });
      this.getWs(wsKey)?.terminate();
      delete this.wsStore.get(wsKey, true).activePongTimer;
    }, this.options.pongTimeout);
  }

  private clearTimers(wsKey: TWSKey) {
    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activeReconnectTimer) {
      clearTimeout(wsState.activeReconnectTimer);
    }
  }

  // Send a ping at intervals
  private clearPingTimer(wsKey: TWSKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePingTimer) {
      clearInterval(wsState.activePingTimer);
      wsState.activePingTimer = undefined;
    }
  }

  // Expect a pong within a time limit
  private clearPongTimer(wsKey: TWSKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePongTimer) {
      clearTimeout(wsState.activePongTimer);
      wsState.activePongTimer = undefined;
    }
  }

  /**
   * @private Use the `subscribe(topics)` method to subscribe to topics. Send WS message to subscribe to topics.
   */
  private requestSubscribeTopics(
    wsKey: TWSKey,
    topics: TWSTopicSubscribeEventArgs[],
  ) {
    if (!topics.length) {
      return;
    }

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    if (maxTopicsPerEvent && topics.length > maxTopicsPerEvent) {
      this.logger.silly(
        `Subscribing to topics in batches of ${maxTopicsPerEvent}`,
      );
      for (var i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        this.logger.silly(`Subscribing to batch of ${batch.length}`);
        this.requestSubscribeTopics(wsKey, batch);
      }
      this.logger.silly(
        `Finished batch subscribing to ${topics.length} topics`,
      );
      return;
    }

    const wsMessage = JSON.stringify({
      op: 'subscribe',
      args: topics,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * @private Use the `unsubscribe(topics)` method to unsubscribe from topics. Send WS message to unsubscribe from topics.
   */
  private requestUnsubscribeTopics(
    wsKey: TWSKey,
    topics: TWSTopicSubscribeEventArgs[],
  ) {
    if (!topics.length) {
      return;
    }

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    if (maxTopicsPerEvent && topics.length > maxTopicsPerEvent) {
      this.logger.silly(
        `Unsubscribing to topics in batches of ${maxTopicsPerEvent}`,
      );
      for (var i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        this.logger.silly(`Unsubscribing to batch of ${batch.length}`);
        this.requestUnsubscribeTopics(wsKey, batch);
      }
      this.logger.silly(
        `Finished batch unsubscribing to ${topics.length} topics`,
      );
      return;
    }

    const wsMessage = JSON.stringify({
      op: 'unsubscribe',
      args: topics,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  public tryWsSend(wsKey: TWSKey, wsMessage: string) {
    try {
      this.logger.silly(`Sending upstream ws message: `, {
        ...LOGGER_CATEGORY,
        wsMessage,
        wsKey,
      });
      if (!wsKey) {
        throw new Error(
          'Cannot send message due to no known websocket for this wsKey',
        );
      }
      const ws = this.getWs(wsKey);
      if (!ws) {
        throw new Error(
          `${wsKey} socket not connected yet, call "connectAll()" first then try again when the "open" event arrives`,
        );
      }
      ws.send(wsMessage);
    } catch (e) {
      this.logger.error(`Failed to send WS message`, {
        ...LOGGER_CATEGORY,
        wsMessage,
        wsKey,
        exception: e,
      });
    }
  }

  private connectToWsUrl(url: string, wsKey: TWSKey): WebSocket {
    this.logger.silly(`Opening WS connection to URL: ${url}`, {
      ...LOGGER_CATEGORY,
      wsKey,
    });

    const agent = this.options.requestOptions?.agent;
    const ws = new WebSocket(url, undefined, agent ? { agent } : undefined);
    ws.onopen = (event) => this.onWsOpen(event, wsKey);
    ws.onmessage = (event) => this.onWsMessage(event, wsKey);
    ws.onerror = (event) => this.parseWsError('websocket error', event, wsKey);
    ws.onclose = (event) => this.onWsClose(event, wsKey);

    return ws;
  }

  private async onWsOpen(event, wsKey: TWSKey) {
    if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTING)
    ) {
      this.logger.info('Websocket connected', {
        ...LOGGER_CATEGORY,
        wsKey,
      });
      this.emit('open', { wsKey, event });
    } else if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.RECONNECTING)
    ) {
      this.logger.info('Websocket reconnected', { ...LOGGER_CATEGORY, wsKey });
      this.emit('reconnected', { wsKey, event });
    }

    this.setWsState(wsKey, WsConnectionStateEnum.CONNECTED);

    // Some websockets require an auth packet to be sent after opening the connection
    if (this.shouldAuthOnConnect(wsKey)) {
      await this.sendAuthRequest(wsKey);
    }

    // Reconnect to topics known before it connected
    // Private topics will be resubscribed to once reconnected
    const topics = [...this.wsStore.getTopics(wsKey)];
    const publicTopics = topics.filter(
      (topic) => !this.isPrivateChannel(topic),
    );
    this.requestSubscribeTopics(wsKey, publicTopics);

    this.wsStore.get(wsKey, true)!.activePingTimer = setInterval(
      () => this.ping(wsKey),
      this.options.pingInterval,
    );
  }

  /** Handle subscription to private topics _after_ authentication successfully completes asynchronously */
  private onWsAuthenticated(wsKey: TWSKey) {
    const wsState = this.wsStore.get(wsKey, true);
    wsState.isAuthenticated = true;

    const topics = [...this.wsStore.getTopics(wsKey)];
    const privateTopics = topics.filter((topic) =>
      this.isPrivateChannel(topic),
    );

    if (privateTopics.length) {
      this.subscribe(privateTopics, true);
    }
  }

  private onWsMessage(event: unknown, wsKey: TWSKey) {
    try {
      // any message can clear the pong timer - wouldn't get a message if the ws wasn't working
      this.clearPongTimer(wsKey);

      if (isWsPong(event)) {
        this.logger.silly('Received pong', { ...LOGGER_CATEGORY, wsKey });
        return;
      }

      const msg = JSON.parse((event && event['data']) || event);
      const emittableEvent = { ...msg, wsKey };

      if (typeof msg === 'object') {
        if (typeof msg['code'] === 'number') {
          if (msg.event === 'login' && msg.code === 0) {
            this.logger.info(`Successfully authenticated WS client`, {
              ...LOGGER_CATEGORY,
              wsKey,
            });
            this.emit('response', emittableEvent);
            this.emit('authenticated', emittableEvent);
            this.onWsAuthenticated(wsKey);
            return;
          }
        }

        if (msg['event']) {
          if (msg.event === 'error') {
            this.logger.error(`WS Error received`, {
              ...LOGGER_CATEGORY,
              wsKey,
              message: msg || 'no message',
              // messageType: typeof msg,
              // messageString: JSON.stringify(msg),
              event,
            });
            this.emit('exception', emittableEvent);
            this.emit('response', emittableEvent);
            return;
          }
          return this.emit('response', emittableEvent);
        }

        if (msg['arg']) {
          return this.emit('update', emittableEvent);
        }
      }

      this.logger.warning('Unhandled/unrecognised ws event message', {
        ...LOGGER_CATEGORY,
        message: msg || 'no message',
        // messageType: typeof msg,
        // messageString: JSON.stringify(msg),
        event,
        wsKey,
      });

      // fallback emit anyway
      return this.emit('update', emittableEvent);
    } catch (e) {
      this.logger.error('Failed to parse ws event message', {
        ...LOGGER_CATEGORY,
        error: e,
        event,
        wsKey,
      });
    }
  }

  private onWsClose(event: unknown, wsKey: TWSKey) {
    this.logger.info('Websocket connection closed', {
      ...LOGGER_CATEGORY,
      wsKey,
    });

    if (
      this.wsStore.getConnectionState(wsKey) !== WsConnectionStateEnum.CLOSING
    ) {
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
      this.emit('reconnect', { wsKey, event });
    } else {
      this.setWsState(wsKey, WsConnectionStateEnum.INITIAL);
      this.emit('close', { wsKey, event });
    }
  }

  private getWs(wsKey: TWSKey) {
    return this.wsStore.getWs(wsKey);
  }

  private setWsState(wsKey: TWSKey, state: WsConnectionStateEnum) {
    this.wsStore.setConnectionState(wsKey, state);
  }
}
