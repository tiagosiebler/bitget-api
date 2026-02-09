import {
  DefaultLogger,
  WebsocketClientV3,
  WS_KEY_MAP,
} from '../../../src/index.js';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClientV2 } from 'bitget-api';

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

  // You can subscribe to one topic at a time
  wsClient.subscribe(
    {
      topic: 'account',
      payload: {
        instType: 'UTA', // Note: all account events go on the UTA instType
      },
    },
    WS_KEY_MAP.v3Private, // This parameter points to private or public
  );

  // Note: all account events go on the UTA instType
  const ACCOUNT_INST_TYPE = 'UTA';
  const ACCOUNT_WS_KEY = WS_KEY_MAP.v3Private;

  // Or multiple at once:
  wsClient.subscribe(
    [
      {
        topic: 'account',
        payload: {
          instType: ACCOUNT_INST_TYPE,
        },
      },
      {
        topic: 'position',
        payload: {
          instType: ACCOUNT_INST_TYPE,
        },
      },
      {
        topic: 'fill',
        payload: {
          instType: ACCOUNT_INST_TYPE,
        },
      },
      {
        topic: 'order',
        payload: {
          instType: ACCOUNT_INST_TYPE,
        },
      },
    ],
    ACCOUNT_WS_KEY,
  );

  // Topics are tracked per websocket type
  // The below example will pull a list of subscribed topics on that connection (e.g. all private topics), after a 5 second delay:
  setTimeout(() => {
    const privateTopics = wsClient.getWsStore().getTopics(WS_KEY_MAP.v3Private);

    console.log('private topics currently in state: ', privateTopics);
  }, 5 * 1000);
})();
