import WebSocket from 'isomorphic-ws';

import {
  BitgetInstTypeV2,
  WsKey,
  WsOperation,
  WsOperationLoginParams,
  WsRequestOperationBitget,
  WsTopic,
  WsTopicV2,
} from './types';
import {
  BaseWebsocketClient,
  EmittableEvent,
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  isPrivateChannel,
  isWsPong,
  MidflightWsRequestEvent,
  neverGuard,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_BASE_URL_MAP,
  WS_KEY_MAP,
  WS_LOGGER_CATEGORY,
  WsTopicRequest,
} from './util';
import { signMessage } from './util/node-support';
import { SignAlgorithm } from './util/webCryptoAPI';

const LOGGER_CATEGORY = { category: 'bitget-ws' };

const COIN_CHANNELS: WsTopicV2[] = [
  'account',
  'account-crossed',
  'account-isolated',
];

export class WebsocketClientV2 extends BaseWebsocketClient<
  WsKey,
  WsRequestOperationBitget<object> // subscribe requests have an "args" parameter with an object within
> {
  protected getWsKeyForTopic(
    // subscribeEvent: WsTopicSubscribeEventArgsV2,
    subscribeEvent: WsTopicRequest<string>, // TWSTopicSubscribeEventArgs == WsTopicRequest<string> now
    isPrivate?: boolean,
  ): WsKey {
    return isPrivate || isPrivateChannel(subscribeEvent.topic)
      ? WS_KEY_MAP.v2Private
      : WS_KEY_MAP.v2Public;
  }

  protected isPrivateChannel(subscribeEvent: WsTopicRequest<string>): boolean {
    return isPrivateChannel(subscribeEvent.topic);
  }

  protected isCustomReconnectionNeeded(): boolean {
    return false;
  }

  protected async triggerCustomReconnectionWorkflow(): Promise<void> {}

  protected sendPingEvent(wsKey: WsKey): void {
    this.tryWsSend(wsKey, 'ping');
  }

  protected sendPongEvent(wsKey: WsKey): void {
    this.tryWsSend(wsKey, 'pong');
  }

  protected isWsPing(data: any): boolean {
    if (data?.data === 'ping') {
      return true;
    }
    return false;
  }

  protected isWsPong(data: any): boolean {
    return isWsPong(data);
  }

  protected isPrivateTopicRequest(
    request: WsTopicRequest<string>,
    wsKey: WsKey,
  ): boolean {
    return WS_AUTH_ON_CONNECT_KEYS.includes(wsKey);
  }

  protected getPrivateWSKeys(): WsKey[] {
    return WS_AUTH_ON_CONNECT_KEYS;
  }

  protected isAuthOnConnectWsKey(wsKey: WsKey): boolean {
    return WS_AUTH_ON_CONNECT_KEYS.includes(wsKey);
  }

  protected async getWsUrl(wsKey: WsKey): Promise<string> {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey: 'livenet' | 'demo' = 'livenet';

    switch (wsKey) {
      case WS_KEY_MAP.spotv1:
      case WS_KEY_MAP.mixv1: {
        throw new Error(
          'Use the WebsocketClient instead of WebsocketClientV2 for V1 websockets',
        );
      }
      case WS_KEY_MAP.v2Private: {
        return WS_BASE_URL_MAP.v2Private.all[networkKey];
      }
      case WS_KEY_MAP.v2Public: {
        return WS_BASE_URL_MAP.v2Public.all[networkKey];
      }
      case WS_KEY_MAP.v3Private: {
        return WS_BASE_URL_MAP.v3Private.all[networkKey];
      }
      case WS_KEY_MAP.v3Public: {
        return WS_BASE_URL_MAP.v3Public.all[networkKey];
      }
      default: {
        this.logger.error('getWsUrl(): Unhandled wsKey: ', {
          ...LOGGER_CATEGORY,
          wsKey,
        });
        throw neverGuard(wsKey, 'getWsUrl(): Unhandled wsKey');
      }
    }
  }

  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    return getMaxTopicsPerSubscribeEvent(wsKey);
  }

  /**
   * @returns one or more correctly structured request events for performing a operations over WS. This can vary per exchange spec.
   */
  protected async getWsRequestEvents(
    operation: WsOperation,
    requests: WsTopicRequest<string, object>[],
  ): Promise<MidflightWsRequestEvent<WsRequestOperationBitget<object>>[]> {
    const wsRequestEvents: MidflightWsRequestEvent<
      WsRequestOperationBitget<object>
    >[] = [];
    const wsRequestBuildingErrors: unknown[] = [];

    const topics = requests.map(
      (r) => r.topic + ',' + Object.values(r.payload || {}).join(','),
    );

    // Previously used to track topics in a request. Keeping this for subscribe/unsubscribe requests, no need for incremental values
    const req_id =
      ['subscribe', 'unsubscribe'].includes(operation) && topics.length
        ? topics.join(',')
        : this.getNewRequestId().toFixed();

    /**
      {
        "op":"subscribe",
        "args":[
            {
                "instType":"SPOT",
                "channel":"ticker",
                "instId":"BTCUSDT"
            },
            {
                "instType":"SPOT",
                "channel":"candle5m",
                "instId":"BTCUSDT"
            }
        ]
      }
    */
    const wsEvent: WsRequestOperationBitget<object> = {
      op: operation,
      args: requests.map((request) => {
        // const request = {
        //   topic: 'ticker',
        //   payload: { instType: 'SPOT', instId: 'BTCUSDT' },
        // };
        // becomes:
        // const request = {
        //   channel: 'ticker',
        //   instType: 'SPOT',
        //   instId: 'BTCUSDT',
        // };
        return {
          channel: request.topic,
          ...request.payload,
        };
      }),
    };

    // console.log('getWsRequestEvents()', {
    //   operation,
    //   requests,
    //   topics,
    //   wsEvent: JSON.stringify(wsEvent, null, 2),
    //   req_id,
    // });

    const midflightWsEvent: MidflightWsRequestEvent<
      WsRequestOperationBitget<object>
    > = {
      requestKey: req_id,
      requestEvent: wsEvent,
    };

    wsRequestEvents.push({
      ...midflightWsEvent,
    });

    if (wsRequestBuildingErrors.length) {
      const label =
        wsRequestBuildingErrors.length === requests.length ? 'all' : 'some';

      this.logger.error(
        `Failed to build/send ${wsRequestBuildingErrors.length} event(s) for ${label} WS requests due to exceptions`,
        {
          ...WS_LOGGER_CATEGORY,
          wsRequestBuildingErrors,
          wsRequestBuildingErrorsStringified: JSON.stringify(
            wsRequestBuildingErrors,
            null,
            2,
          ),
        },
      );
    }

    return wsRequestEvents;
  }

  /**
   * Abstraction called to sort ws events into emittable event types (response to a request, data update, etc)
   */
  protected resolveEmittableEvents(): EmittableEvent[] {
    const results: EmittableEvent[] = [];
    return results;
  }

  async sendWSAPIRequest(): Promise<unknown> {
    return;
  }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.v2Private),
      this.connect(WS_KEY_MAP.v2Public),
    ];
  }

  /** Some private channels use `coin` instead of `instId`. This method handles building the sub/unsub request */
  private getSubRequest(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    coin: string = 'default',
  ): WsTopicRequest<string> {
    if (isPrivateChannel(topic)) {
      if (COIN_CHANNELS.includes(topic)) {
        const subscribeRequest: WsTopicRequest<string> = {
          topic,
          payload: {
            instType,
            coin,
          },
        };
        return subscribeRequest;
      }

      const subscribeRequest: WsTopicRequest<string> = {
        topic,
        payload: {
          instType,
          instId: coin,
        },
      };

      return subscribeRequest;
    }

    const subscribeRequest: WsTopicRequest<string> = {
      topic,
      payload: {
        instType,
        instId: coin,
      },
    };
    return subscribeRequest;
  }

  /**
   * Subscribe to a topic
   * @param instType instrument type (refer to API docs).
   * @param topic topic name (e.g. "ticker").
   * @param instId instrument ID (e.g. "BTCUSDT"). Use "default" for private topics.
   */
  public subscribeTopic(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    coin: string = 'default',
  ) {
    const subRequest = this.getSubRequest(instType, topic, coin);
    const isPrivateTopic = isPrivateChannel(topic);
    const wsKey = isPrivateTopic ? WS_KEY_MAP.v2Private : WS_KEY_MAP.v2Public;

    return this.subscribe(subRequest, wsKey);
  }

  /**
   * Unsubscribe from a topic
   * @param instType instrument type (refer to API docs).
   * @param topic topic name (e.g. "ticker").
   * @param instId instrument ID (e.g. "BTCUSDT"). Use "default" for private topics to get all symbols.
   */
  public unsubscribeTopic(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    coin: string = 'default',
  ) {
    const subRequest = this.getSubRequest(instType, topic, coin);

    const isPrivateTopic = isPrivateChannel(topic);
    const wsKey = isPrivateTopic ? WS_KEY_MAP.v2Private : WS_KEY_MAP.v2Public;

    return this.unsubscribe(subRequest, wsKey);
  }

  /**
   * Request subscription to one or more topics. Pass topics as either an array of strings,
   * or array of objects (if the topic has parameters).
   *
   * Objects should be formatted as {topic: string, params: object, category: CategoryV5}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests:
      | (WsTopicRequest<WsTopic | string> | WsTopic)
      | (WsTopicRequest<WsTopic | string> | WsTopic)[],
    wsKey: WsKey,
  ): Promise<unknown> {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);
    return this.subscribeTopicsForWsKey(normalisedTopicRequests, wsKey);
  }

  /**
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests:
      | (WsTopicRequest<WsTopic | string> | WsTopic)
      | (WsTopicRequest<WsTopic | string> | WsTopic)[],
    wsKey: WsKey,
  ) {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);

    return this.unsubscribeTopicsForWsKey(normalisedTopicRequests, wsKey);
  }

  // /**
  //  *
  //  *
  //  * Legacy internal methods that were redundant with the BaseWSClient upgrades for V3
  //  *
  //  *
  //  */

  // /**
  //  * Subscribe to topics & track/persist them. They will be automatically resubscribed to if the connection drops/reconnects.
  //  * @param wsTopics topic or list of topics
  //  * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
  //  */
  // public subscribeLegacy(
  //   wsTopics: WsTopicSubscribeEventArgsV2,
  //   isPrivateTopic?: boolean,
  // ) {
  //   const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];

  //   topics.forEach((topic) => {
  //     const wsKey = this.getWsKeyForTopic(topic, isPrivateTopic);

  //     // Persist this topic to the expected topics list
  //     this.getWsStore().addTopic(wsKey, topic);

  //     // if connected, send subscription request
  //     if (
  //       this.getWsStore().isConnectionState(
  //         wsKey,
  //         WsConnectionStateEnum.CONNECTED,
  //       )
  //     ) {
  //       // if not authenticated, dont sub to private topics yet.
  //       // This'll happen automatically once authenticated
  //       const isAuthenticated = this.getWsStore().get(wsKey)?.isAuthenticated;
  //       if (!isAuthenticated) {
  //         return this.requestSubscribeTopics(
  //           wsKey,
  //           topics.filter((topic) => !this.isPrivateChannel(topic)),
  //         );
  //       }
  //       return this.requestSubscribeTopics(wsKey, topics);
  //     }

  //     // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
  //     if (
  //       !this.getWsStore().isConnectionState(
  //         wsKey,
  //         WsConnectionStateEnum.CONNECTING,
  //       ) &&
  //       !this.getWsStore().isConnectionState(
  //         wsKey,
  //         WsConnectionStateEnum.RECONNECTING,
  //       )
  //     ) {
  //       return this.connect(wsKey);
  //     }
  //   });
  // }

  // /**
  //  * Unsubscribe from topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
  //  * @param wsTopics topic or list of topics
  //  * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
  //  */
  // public unsubscribeLegacy(
  //   wsTopics: WsTopicSubscribeEventArgsV2,
  //   isPrivateTopic?: boolean,
  // ) {
  //   const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
  //   topics.forEach((topic) => {
  //     this.getWsStore().deleteTopic(
  //       this.getWsKeyForTopic(topic, isPrivateTopic),
  //       topic,
  //     );

  //     const wsKey = this.getWsKeyForTopic(topic, isPrivateTopic);

  //     // unsubscribe request only necessary if active connection exists
  //     if (
  //       this.getWsStore().isConnectionState(
  //         wsKey,
  //         WsConnectionStateEnum.CONNECTED,
  //       )
  //     ) {
  //       this.requestUnsubscribeTopics(wsKey, [topic]);
  //     }
  //   });
  // }

  /**
   *
   *
   * Internal methods required to integrate with the BaseWSClient
   *
   *
   */

  protected async getWsAuthRequestEvent(
    wsKey: WsKey,
  ): Promise<WsRequestOperationBitget<WsOperationLoginParams>> {
    try {
      const { apiKey, apiSecret, apiPass } = this.options;
      const { signature, expiresAt } = await this.getWsAuthSignature(wsKey);

      if (!apiKey || !apiSecret || !apiPass) {
        this.logger.error(
          'Cannot authenticate websocket, either api key, secret or passphrase missing.',
          { ...WS_LOGGER_CATEGORY, wsKey },
        );
        throw new Error(
          'Cannot auth - missing api or secret or pass in config',
        );
      }

      const request: WsRequestOperationBitget<WsOperationLoginParams> = {
        op: 'login',
        args: [
          {
            apiKey,
            passphrase: apiPass,
            timestamp: expiresAt,
            sign: signature,
          },
        ],
      };

      return request;
    } catch (e) {
      this.logger.error(e, { ...WS_LOGGER_CATEGORY, wsKey });
      throw e;
    }
  }

  private async getWsAuthSignature(
    wsKey: WsKey,
  ): Promise<{ expiresAt: number; signature: string }> {
    const { apiKey, apiSecret, apiPass, recvWindow } = this.options;

    if (!apiKey || !apiSecret || !apiPass) {
      this.logger.error(
        'Cannot authenticate websocket, either api key, secret or passphrase missing.',
        { ...WS_LOGGER_CATEGORY, wsKey },
      );
      throw new Error('Cannot auth - missing api or secret or pass in config');
    }

    this.logger.trace("Getting auth'd request params", {
      ...WS_LOGGER_CATEGORY,
      wsKey,
    });

    const signatureExpiresAt = ((Date.now() + recvWindow) / 1000).toFixed(0);

    const signature = await this.signMessage(
      signatureExpiresAt + 'GET' + '/user/verify',
      apiSecret,
      'base64',
      'SHA-256',
    );

    return {
      expiresAt: +signatureExpiresAt,
      signature,
    };
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method: 'hex' | 'base64',
    algorithm: SignAlgorithm,
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
  }
}
