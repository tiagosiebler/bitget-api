import WebSocket from 'isomorphic-ws';

import {
  BitgetInstTypeV3,
  MessageEventLike,
  WsAPIOperationResponseMap,
  WSAPIRequestBitgetV3,
  WSAPIRequestFlags,
  WsAPITopicRequestParamMap,
  WsAPIWsKeyTopicMap,
  WsKey,
  WSOperation,
  WSOperationLoginParams,
  WsRequestOperationBitget,
  WsTopicV3,
} from './types';
import {
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getPromiseRefForWSAPIRequest,
  getWsUrl,
  isWSAPIResponse,
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
   * Ensures the WS API connection is active and ready.
   *
   * You do not need to call this, but if you call this before making any WS API requests,
   * it can accelerate the first request (by preparing the connection in advance).
   */
  public connectWSAPI(): Promise<unknown> {
    /** This call automatically ensures the connection is active AND authenticated before resolving */
    return this.assertIsAuthenticated(WS_KEY_MAP.v3Private);
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
    operation: WSOperation,
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
  ): Promise<WsRequestOperationBitget<WSOperationLoginParams>> {
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

      const request: WsRequestOperationBitget<WSOperationLoginParams> = {
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

      /**
       * WS API response handling
       */
      if (isWSAPIResponse(emittableEvent)) {
        // const eg1 = {
        //   event: 'error',
        //   id: '1',
        //   code: '43012',
        //   msg: 'Insufficient balance',
        // };

        const retCode = emittableEvent.code;
        const reqId = emittableEvent.id;
        const isError = retCode !== '0';

        const promiseRef = [emittableEvent.id].join('_');

        const loggableContext = {
          wsKey,
          promiseRef,
          parsedEvent: emittableEvent,
        };

        if (!reqId) {
          this.logger.error(
            'WS API response is missing reqId - promisified workflow could get stuck. If this happens, please get in touch with steps to reproduce. Trace:',
            loggableContext,
          );
        }

        if (isError) {
          try {
            this.getWsStore().rejectDeferredPromise(
              wsKey,
              promiseRef,
              emittableEvent,
              true,
            );
          } catch (e) {
            this.logger.error('Exception trying to reject WSAPI promise', {
              ...loggableContext,
              error: e,
            });
          }

          results.push({
            eventType: 'exception',
            event: emittableEvent,
            isWSAPIResponse: true,
          });
          return results;
        }

        // WS API Success
        try {
          this.getWsStore().resolveDeferredPromise(
            wsKey,
            promiseRef,
            emittableEvent,
            true,
          );
        } catch (e) {
          this.logger.error('Exception trying to resolve WSAPI promise', {
            ...loggableContext,
            error: e,
          });
        }

        results.push({
          eventType: 'response',
          event: emittableEvent,
          isWSAPIResponse: true,
        });

        return results;
      }

      /**
       * V3 event handling for consumers - behaves the same as V2
       */
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

  /**
   * V3/UTA supports order placement via WebSockets. This is the WS API:
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel
   *
   * @returns a promise that resolves/rejects when a matching response arrives
   */
  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends WsAPITopicRequestParamMap[TWSOperation],
    TWSAPIResponse extends
      WsAPIOperationResponseMap[TWSOperation] = WsAPIOperationResponseMap[TWSOperation],
  >(
    wsKey: WsKey,
    operation: TWSOperation,
    category: BitgetInstTypeV3,
    params: TWSParams & { signRequest?: boolean },
    requestFlags?: WSAPIRequestFlags,
  ): Promise<TWSAPIResponse> {
    this.logger.trace(`sendWSAPIRequest(): assert "${wsKey}" is connected`);

    await this.assertIsConnected(wsKey);
    this.logger.trace('sendWSAPIRequest()->assertIsConnected() ok');

    if (requestFlags?.authIsOptional !== true) {
      // this.logger.trace('sendWSAPIRequest(): assertIsAuthenticated(${wsKey})...');
      await this.assertIsAuthenticated(wsKey);
      // this.logger.trace('sendWSAPIRequest(): assertIsAuthenticated(${wsKey}) ok');
    }

    const request: WSAPIRequestBitgetV3<TWSParams> = {
      op: 'trade',
      id: `${this.getNewRequestId()}`,
      category: category,
      topic: operation,
      // Ensure "args" is always wrapped as array
      args: Array.isArray(params) ? params : [params],
    };

    // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    const promiseRef = getPromiseRefForWSAPIRequest(request);

    const deferredPromise = this.getWsStore().createDeferredPromise<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TWSAPIResponse & { request: any }
    >(wsKey, promiseRef, false);

    // Enrich returned promise with request context for easier debugging
    deferredPromise.promise
      ?.then((res) => {
        if (!Array.isArray(res)) {
          res.request = {
            wsKey,
            ...request,
          };
        }

        return res;
      })
      .catch((e) => {
        if (typeof e === 'string') {
          this.logger.error('Unexpected string thrown without Error object:', {
            e,
            wsKey,
            request,
          });
          return e;
        }
        e.request = {
          wsKey,
          operation,
          params: params,
        };
        // throw e;
        return e;
      });

    this.logger.trace(
      `sendWSAPIRequest(): sending raw request: ${JSON.stringify(request, null, 2)}`,
    );

    // Send event
    const throwExceptions = false;
    this.tryWsSend(wsKey, JSON.stringify(request), throwExceptions);

    this.logger.trace(
      `sendWSAPIRequest(): sent "${operation}" event with promiseRef(${promiseRef})`,
    );

    // Return deferred promise, so caller can await this call
    return deferredPromise.promise!;
  }
}
