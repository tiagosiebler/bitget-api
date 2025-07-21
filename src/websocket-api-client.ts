import {
  BitgetInstTypeV3,
  CancelOrderRequestV3,
  CancelOrderResponseV3,
  WSAPIPlaceOrderRequestV3,
  WSAPIPlaceOrderResponseV3,
  WSAPIResponse,
  WSClientConfigurableOptions,
} from './types';
import { DefaultLogger, WS_KEY_MAP } from './util';
import { WebsocketClientV3 } from './websocket-client-v3';

/**
 * Configurable options specific to only the REST-like WebsocketAPIClient
 */
export interface WSAPIClientConfigurableOptions {
  /**
   * Default: true
   *
   * Attach default event listeners, which will console log any high level
   * events (opened/reconnecting/reconnected/etc).
   *
   * If you disable this, you should set your own event listeners
   * on the embedded WS Client `wsApiClient.getWSClient().on(....)`.
   */
  attachEventListeners: boolean;
}

/**
 * This is a minimal Websocket API wrapper around the WebsocketClient.
 *
 * Note: You can also directly use the sendWSAPIRequest() method to make WS API calls, but some
 * may find the below methods slightly more intuitive.
 *
 * Refer to the WS API promises example for a more detailed example on using sendWSAPIRequest() directly:
 * https://github.com/tiagosiebler/bitget-api/blob/master/examples/V3/ws-api-trade-raw.ts
 */
export class WebsocketAPIClient {
  private wsClient: WebsocketClientV3;

  private options: WSClientConfigurableOptions & WSAPIClientConfigurableOptions;

  constructor(
    options?: WSClientConfigurableOptions &
      Partial<WSAPIClientConfigurableOptions>,
    logger?: DefaultLogger,
  ) {
    this.wsClient = new WebsocketClientV3(options, logger);

    this.options = {
      attachEventListeners: true,
      ...options,
    };

    this.setupDefaultEventListeners();
  }

  public getWSClient(): WebsocketClientV3 {
    return this.wsClient;
  }

  public setTimeOffsetMs(newOffset: number): void {
    return this.getWSClient().setTimeOffsetMs(newOffset);
  }

  /*
   * Bitget WebSocket API Methods
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel
   */

  /**
   * Submit a new order
   *
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel
   *
   * @returns
   */
  submitNewOrder(
    category: BitgetInstTypeV3,
    params: WSAPIPlaceOrderRequestV3,
  ): Promise<WSAPIResponse<[WSAPIPlaceOrderResponseV3], 'place-order'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v3Private,
      'place-order',
      category,
      params,
    );
  }

  /**
   * Submit a new order
   *
   * https://www.bitget.com/api-doc/uta/websocket/private/Batch-Place-Order-Channel
   *
   * @returns
   */
  placeBatchOrders(
    category: BitgetInstTypeV3,
    params: WSAPIPlaceOrderRequestV3[],
  ): Promise<WSAPIResponse<WSAPIPlaceOrderResponseV3[], 'batch-place'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v3Private,
      'batch-place',
      category,
      params,
    );
  }

  /*
   * Bitget WebSocket API Methods
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel
   */

  /**
   * Cancel Order
   *
   * https://www.bitget.com/api-doc/uta/websocket/private/Cancel-Order-Channel
   *
   * @returns
   */
  cancelOrder(
    category: BitgetInstTypeV3,
    params: CancelOrderRequestV3,
  ): Promise<WSAPIResponse<[CancelOrderResponseV3], 'cancel-order'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v3Private,
      'cancel-order',
      category,
      params,
    );
  }

  /**
   * Batch Cancel Order
   *
   * https://www.bitget.com/api-doc/uta/websocket/private/Batch-Cancel-Order-Channel
   *
   * @returns
   */
  cancelBatchOrders(
    category: BitgetInstTypeV3,
    params: CancelOrderRequestV3[],
  ): Promise<WSAPIResponse<CancelOrderResponseV3[], 'batch-cancel'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v3Private,
      'batch-cancel',
      category,
      params,
    );
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   * Private methods for handling some of the convenience/automation provided by the WS API Client
   *
   *
   *
   *
   *
   *
   *
   */

  private setupDefaultEventListeners() {
    if (this.options.attachEventListeners) {
      /**
       * General event handlers for monitoring the WebsocketClient
       */
      this.wsClient
        .on('open', (data) => {
          console.log(new Date(), 'ws connected', data.wsKey);
        })
        .on('reconnect', ({ wsKey }) => {
          console.log(new Date(), 'ws automatically reconnecting.... ', wsKey);
        })
        .on('reconnected', (data) => {
          console.log(new Date(), 'ws has reconnected ', data?.wsKey);
        })
        .on('authenticated', (data) => {
          console.info(new Date(), 'ws has authenticated ', data?.wsKey);
        })
        .on('exception', (data) => {
          console.error(new Date(), 'ws exception: ', JSON.stringify(data));
        });
    }
  }
}
