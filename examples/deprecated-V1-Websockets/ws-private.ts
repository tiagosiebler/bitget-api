import { WebsocketClient, DefaultLogger } from '../../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bitget-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    silly: (...params) => console.log('silly', ...params),
  };

  logger.info(`Starting private V1 websocket`);

  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  const wsClient = new WebsocketClient(
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
  wsClient.subscribeTopic('SPBL', 'account');
  // : order updates
  // wsClient.subscribeTopic('SPBL', 'orders');

  // futures private
  // : account updates
  // wsClient.subscribeTopic('UMCBL', 'account');
  // // : position updates
  // wsClient.subscribeTopic('UMCBL', 'positions');
  // // : order updates
  // wsClient.subscribeTopic('UMCBL', 'orders');
  // // : plan order updates
  // wsClient.subscribeTopic('UMCBL', 'ordersAlgo');
})();
