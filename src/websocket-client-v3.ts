import WebSocket from 'isomorphic-ws';

import {
  BitgetInstTypeV3,
  MessageEventLike,
  WsKey,
  WsOperation,
  WsOperationLoginParams,
  WsRequestOperationBitget,
  WsTopicV3,
} from './types';
import {
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getWsUrl,
  isWsPong,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  WS_LOGGER_CATEGORY,
  WsTopicRequest,
} from './util';
import {
  BaseWebsocketClient,
  EmittableEvent,
  MidflightWsRequestEvent,
} from './util/BaseWSClient';
import { SignAlgorithm, signMessage } from './util/webCryptoAPI';

/**
 * WebSocket client dedicated to the unified account (V3) WebSockets.
 *
 * Your Bitget account needs to be upgraded to unified account mode, to use the account-level WebSocket topics.
 */
export class WebsocketClientV3 extends BaseWebsocketClient<
  WsKey,
  WsRequestOperationBitget<object> // subscribe requests have an "args" parameter with an object within
> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.v3Private),
      this.connect(WS_KEY_MAP.v3Public),
    ];
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
  public subscribe<TWSPayload extends { instType?: BitgetInstTypeV3 }>(
    requests:
      | (WsTopicRequest<WsTopicV3, TWSPayload> | WsTopicV3)
      | (WsTopicRequest<WsTopicV3, TWSPayload> | WsTopicV3)[],
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
  public unsubscribe<TWSPayload extends { instType?: BitgetInstTypeV3 }>(
    requests:
      | (WsTopicRequest<WsTopicV3, TWSPayload> | WsTopicV3)
      | (WsTopicRequest<WsTopicV3, TWSPayload> | WsTopicV3)[],
    wsKey: WsKey,
  ) {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);

    return this.unsubscribeTopicsForWsKey(normalisedTopicRequests, wsKey);
  }

  /**
   *
   *
   * Internal methods required to integrate with the BaseWSClient
   *
   *
   */

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
    return getWsUrl(wsKey, this.options, this.logger);
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
                "instType":"spot",
                "topic":"ticker",
                "symbol":"BTCUSDT"
            },
            {
                "instType":"spot",
                "topic":"candle5m",
                "symbol":"BTCUSDT"
            }
        ]
      }
    */
    const wsEvent: WsRequestOperationBitget<object> = {
      op: operation,
      args: requests.map((request) => {
        // const request = {
        //   topic: 'ticker',
        //   payload: { instType: 'spot', symbol: 'BTCUSDT' },
        // };
        // becomes:
        // const request = {
        //   topic: 'ticker',
        //   instType: 'spot',
        //   symbol: 'BTCUSDT',
        // };
        return {
          topic: request.topic,
          ...request.payload,
        };
      }),
    };

    const midflightWsEvent: MidflightWsRequestEvent<
      WsRequestOperationBitget<object>
    > = {
      requestKey: req_id,
      requestEvent: wsEvent,
    };

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

    return [midflightWsEvent];
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

  /**
   * Abstraction called to sort ws events into emittable event types (response to a request, data update, etc)
   */
  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const msg = JSON.parse(event.data);
      const emittableEvent = { ...msg, wsKey };

      // TODO: are v3 events different from V2? if yes? migrate to resolveEmittableEvents
      // v2 event processing
      if (typeof msg === 'object') {
        if (typeof msg['code'] === 'number') {
          // v2 authentication event
          if (msg.event === 'login' && msg.code === 0) {
            results.push({
              eventType: 'response',
              event: emittableEvent,
            });
            results.push({
              eventType: 'authenticated',
              event: emittableEvent,
            });
            return results;
          }
        }

        if (msg['event']) {
          results.push({
            eventType: 'response',
            event: emittableEvent,
          });

          if (msg.event === 'error') {
            this.logger.error('WS Error received', {
              ...WS_LOGGER_CATEGORY,
              wsKey,
              message: msg || 'no message',
              // messageType: typeof msg,
              // messageString: JSON.stringify(msg),
              event,
            });
            results.push({
              eventType: 'exception',
              event: emittableEvent,
            });
          }

          return results;
        }

        if (msg['arg']) {
          results.push({
            eventType: 'update',
            event: emittableEvent,
          });
          return results;
        }
      }

      this.logger.info('Unhandled/unrecognised ws event message', {
        ...WS_LOGGER_CATEGORY,
        message: msg || 'no message',
        // messageType: typeof msg,
        // messageString: JSON.stringify(msg),
        event,
        wsKey,
      });

      // fallback emit anyway
      results.push({
        eventType: 'update',
        event: emittableEvent,
      });
      return results;
    } catch (e) {
      this.logger.error('Failed to parse ws event message', {
        ...WS_LOGGER_CATEGORY,
        error: e,
        event,
        wsKey,
      });
    }

    return results;
  }

  async sendWSAPIRequest(): Promise<unknown> {
    return;
  }
}
