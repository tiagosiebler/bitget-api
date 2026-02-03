import { DefaultLogger, WebsocketAPIClient } from '../../../src/index.js';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketAPIClient } from 'bitget-api';

// function attachEventHandlers<TWSClient extends WebsocketClientV3>(
//   wsClient: TWSClient,
// ): void {
//   wsClient.on('update', (data) => {
//     console.log('raw message received ', JSON.stringify(data));
//   });
//   wsClient.on('open', (data) => {
//     console.log('ws connected', data.wsKey);
//   });
//   wsClient.on('reconnect', ({ wsKey }) => {
//     console.log('ws automatically reconnecting.... ', wsKey);
//   });
//   wsClient.on('reconnected', (data) => {
//     console.log('ws has reconnected ', data?.wsKey);
//   });
//   wsClient.on('authenticated', (data) => {
//     console.log('ws has authenticated ', data?.wsKey);
//   });
// }

(async () => {
  const logger = {
    ...DefaultLogger,
    trace: (...params: any[]) => console.log('trace', ...params),
  };

  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  // If running from CLI in unix, you can pass env vars as such:
  // API_KEY_COM='lkm12n3-2ba3-1mxf-fn13-lkm12n3a' API_SECRET_COM='035B2B9637E1BDFFEE2646BFBDDB8CE4' API_PASSPHRASE_COM='ComplexPa$$!23$5^' ts-node examples/ws-private.ts

  const wsClient = new WebsocketAPIClient(
    {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      apiPass: API_PASS,

      // Whether to use the demo trading wss connection
      // demoTrading: true,

      // If you want your own event handlers instead of the default ones with logs,
      // disable this setting and see the `attachEventHandlers` example below:
      // attachEventListeners: false
    },
    logger, // Optional: inject a custom logger
  );

  // Optional, see above "attachEventListeners". Attach basic event handlers, so nothing is left unhandled
  // attachEventHandlers(wsClient.getWSClient());

  // Optional: prepare the WebSocket API connection in advance.
  // This happens automatically but you can do this early before making any API calls, to prevent delays from a cold start.
  await wsClient.getWSClient().connectWSAPI();

  /**
   * Bitget's WebSocket API be used like a REST API, through this SDK's WebsocketAPIClient. The WebsocketAPIClient is a utility class wrapped around WebsocketClientV3's sendWSAPIRequest() capabilities.
   *
   * Each request sent via the WebsocketAPIClient will automatically:
   * - route via the active WS API connection
   * - return a Promise, which automatically resolves/rejects when a matching response is received
   *
   * Note: this requires V3/UTA API keys!
   */

  /**
   * Place Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel#request-parameters
   */
  try {
    const res = await wsClient.submitNewOrder('spot', {
      orderType: 'limit',
      price: '100',
      qty: '0.1',
      side: 'buy',
      symbol: 'BTCUSDT',
      timeInForce: 'gtc',
    });
    /**
      const res = {
        "event": "trade",
        "id": "1750034396082",
        "category": "spot",
        "topic": "place-order",
        "args": [
          {
            "symbol": "BTCUSDT",
            "orderId": "xxxxxxxx",
            "clientOid": "xxxxxxxx",
            "cTime": "1750034397008"
          }
        ],
        "code": "0",
        "msg": "success",
        "ts": "1750034397076"
      };
     */

    console.log(new Date(), 'WS API "submitNewOrder()" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "submitNewOrder()": ', e);
  }

  /**
   * Batch Place Order Channel
   * https://www.bitget.com/api-doc/uta/websocket/private/Batch-Place-Order-Channel
   */

  try {
    /**
     * Note: batch place will never reject the request, even if all orders were rejected. Check the "code" and "msg" properties for individual orders in the response, to detect batch place errors.
     */
    const res = await wsClient.placeBatchOrders('spot', [
      {
        clientOid: 'xxxxxxxx1',
        orderType: 'limit',
        price: '100',
        qty: '0.1',
        side: 'buy',
        symbol: 'BTCUSDT',
        timeInForce: 'gtc',
      },
      {
        clientOid: 'xxxxxxxx2',
        orderType: 'limit',
        price: '100',
        qty: '0.15',
        side: 'buy',
        symbol: 'BTCUSDT',
        timeInForce: 'gtc',
      },
    ]);

    /**
      const res = {
        "event": "trade",
        "id": "1750035029506",
        "category": "spot",
        "topic": "batch-place",
        "args": [
          {
            "code": "0",
            "msg": "Success",
            "symbol": "BTCUSDT",
            "orderId": "xxxxxxxx",
            "clientOid": "xxxxxxxx"
          },
          {
            "code": "0",
            "msg": "Success",
            "symbol": "BTCUSDT",
            "orderId": "xxxxxxxx",
            "clientOid": "xxxxxxxx"
          }
        ],
        "code": "0",
        "msg": "Success",
        "ts": "1750035029925"
      }
     */

    console.log(new Date(), 'WS API "placeBatchOrders()" result: ', res);
  } catch (e) {
    console.error(
      new Date(),
      'Exception with WS API "placeBatchOrders()": ',
      e,
    );
  }

  /**
   * Cancel Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Cancel-Order-Channel
   */

  try {
    const res = await wsClient.cancelOrder('spot', {
      clientOid: 'xxxxxxxx1',
    });

    /**
      const res = {
        "event": "trade",
        "id": "1750034870205",
        "topic": "cancel-order",
        "args": [
          {
            "orderId": "xxxxxxxx",
            "clientOid": "xxxxxxxx"
          }
        ],
        "code": "0",
        "msg": "Success",
        "ts": "1750034870597"
      }
     */

    console.log(new Date(), 'WS API "cancelOrder()" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "cancelOrder()": ', e);
  }

  /**
   * Batch Cancel Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Batch-Cancel-Order-Channel
   */

  try {
    const res = await wsClient.cancelBatchOrders('spot', [
      {
        clientOid: 'xxxxxxxx1',
      },
      {
        orderId: '123123123',
      },
    ]);

    /**
      const res = {
        "event": "trade",
        "id": "bb553cc0-c1fa-454e-956d-c96c8d715760",
        "topic": "batch-cancel",
        "args": [
          {
            "code": "0",
            "msg": "Success",
            "orderId": "xxxxxxxxxxxxx"
          },
          {
            "code": "25204",
            "msg": "Order does not exist",
            "orderId": "xxxxxxxxxxxxx"
          }
        ],
        "code": "0",
        "msg": "Success",
        "ts": "1751980011084"
      }
     */

    console.log(new Date(), 'WS API "cancelBatchOrders()" result: ', res);
  } catch (e) {
    console.error(
      new Date(),
      'Exception with WS API "cancelBatchOrders()": ',
      e,
    );
  }

  console.log(new Date(), 'Reached end of example.');
})();
