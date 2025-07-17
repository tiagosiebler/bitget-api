import { DefaultLogger, WebsocketClientV2 } from '../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClientV2 } from 'bitget-api';

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

  // note the single quotes, preventing special characters such as $ from being incorrectly passed

  const wsClient = new WebsocketClientV2(
    {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      apiPass: API_PASS,
      // restOptions: {
      // optionally provide rest options, e.g. to pass through a proxy
      // },
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
  // auth happens async after the ws connection opens
  wsClient.on('authenticated', (data) => {
    console.log('WS authenticated', data);
    // wsClient.subscribePublicSpotTickers(['BTCUSDT', 'LTCUSDT']);
  });
  wsClient.on('exception', (data) => {
    console.log('WS error', data);
  });

  /**
   * Private account updates
   */

  // spot private
  // : account updates
  wsClient.subscribeTopic('SPOT', 'account');

  // : order updates (note: symbol is required)
  // wsClient.subscribeTopic('SPOT', 'orders', 'BTCUSDT');

  // futures private
  // : account updates
  wsClient.subscribeTopic('USDT-FUTURES', 'account');
  wsClient.subscribeTopic('USDC-FUTURES', 'account');

  // : position updates
  // wsClient.subscribeTopic('USDT-FUTURES', 'positions');

  // : order updates
  // wsClient.subscribeTopic('USDT-FUTURES', 'orders');

  // : plan order updates
  // wsClient.subscribeTopic('USDT-FUTURES', 'orders-algo');

  // wsClient
  //   .getWsStore()
  //   .getKeys()
  //   .forEach((wsKey) => {
  //     const state = wsClient.getWsStore().get(wsKey);
  //     console.log(`${wsKey} state: `, state.subscribedTopics.values());
  //   });

  // setTimeout(() => {
  //   wsClient.unsubscribeTopic('USDT-FUTURES', 'account');
  // }, 1000 * 2);

  // setTimeout(() => {
  //   wsClient
  //     .getWsStore()
  //     .getKeys()
  //     .forEach((wsKey) => {
  //       const state = wsClient.getWsStore().get(wsKey);
  //       console.log(`${wsKey} state: `, state.subscribedTopics.values());
  //     });
  // }, 1000 * 5);
})();
