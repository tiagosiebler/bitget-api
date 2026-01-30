import { DefaultLogger, WebsocketClientV2 } from '../../../src/index.js';

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

  const wsClient = new WebsocketClientV2(
    {
      // restOptions: {
      // optionally provide rest options, e.g. to pass through a proxy
      // },

      // Set demoTrading to true, to route all connections to the demo trading wss URLs:
      demoTrading: true,

      // If using private topics, make sure to include API keys
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
   * Public events
   */

  const symbol = 'BTCUSDT';
  wsClient.subscribeTopic('SPOT', 'ticker', symbol);

  wsClient.subscribeTopic('USDC-FUTURES', 'account');
})();
