import {
  DefaultLogger,
  WebsocketClientV3,
  WS_KEY_MAP,
} from '../../../src/index.js';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClientV3 } from 'bitget-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    trace: (...params) => console.log('trace', ...params),
  };

  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  // If running from CLI in unix, you can pass env vars as such:
  // API_KEY_COM='lkm12n3-2ba3-1mxf-fn13-lkm12n3a' API_SECRET_COM='035B2B9637E1BDFFEE2646BFBDDB8CE4' API_PASSPHRASE_COM='ComplexPa$$!23$5^' ts-node examples/ws-private.ts

  const wsClient = new WebsocketClientV3(
    {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      apiPass: API_PASS,
    },
    logger,
  );

  wsClient.on('update', (data) => {
    console.log('WS raw message received ', data);
    // console.log('WS raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('WS connection opened:', data.wsKey);
  });
  wsClient.on('response', (data) => {
    console.log('WS response: ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnect', ({ wsKey }) => {
    console.log('WS automatically reconnecting.... ', wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('WS reconnected ', data?.wsKey);
  });
  wsClient.on('exception', (data) => {
    console.log('WS error', data);
  });

  /**
   * Bitget's WebSocket API can be used via the sendWSAPIRequest() method.
   *
   * Use the `WS_KEY_MAP.v3Private` connection key for any requests.
   *
   * Note: this requires V3/UTA API keys!
   * Note: for a better user experience, it is recommended to use the WebsocketAPIClient.
   */

  // Use the V3 private wss connection URL
  const wsConnectionKey = WS_KEY_MAP.v3Private;

  /**
   * Place Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel#request-parameters
   */
  try {
    const res = await wsClient.sendWSAPIRequest(
      wsConnectionKey,
      'place-order',
      'spot',
      {
        orderType: 'limit',
        price: '100',
        qty: '0.1',
        side: 'buy',
        symbol: 'BTCUSDT',
        timeInForce: 'gtc',
      },
    );

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

    console.log(new Date(), 'WS API "place-order" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "place-order": ', e);
  }

  /**
   * Batch Place Order Channel
   * https://www.bitget.com/api-doc/uta/websocket/private/Batch-Place-Order-Channel
   */

  try {
    /**
     * Note: batch place will never reject the request, even if all orders were rejected. Check the "code" and "msg" properties for individual orders in the response, to detect batch place errors.
     */
    const res = await wsClient.sendWSAPIRequest(
      wsConnectionKey,
      'batch-place',
      'spot',
      [
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
      ],
    );

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

    console.log(new Date(), 'WS API "batch-place" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "batch-place": ', e);
  }

  /**
   * Cancel Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Cancel-Order-Channel
   */

  try {
    const res = await wsClient.sendWSAPIRequest(
      wsConnectionKey,
      'cancel-order',
      'spot',
      {
        clientOid: 'xxxxxxxx1',
      },
    );

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

    console.log(new Date(), 'WS API "cancel-order" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "cancel-order": ', e);
  }

  /**
   * Batch Cancel Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Batch-Cancel-Order-Channel
   */

  try {
    const res = await wsClient.sendWSAPIRequest(
      wsConnectionKey,
      'batch-cancel',
      'spot',
      [
        {
          clientOid: 'xxxxxxxx1',
        },
        {
          orderId: '123123123',
        },
      ],
    );

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

    console.log(new Date(), 'WS API "batch-cancel" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "batch-cancel": ', e);
  }

  console.log(new Date(), 'Reached end of example.');
})();
