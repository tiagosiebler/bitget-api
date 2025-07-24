import { DefaultLogger, WebsocketClientV3, WS_KEY_MAP } from '../../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClientV2 } from 'bitget-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    trace: (...params) => console.log('trace', ...params),
  };

  const wsClient = new WebsocketClientV3({}, logger);

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

  // You can subscribe to one topic at a time
  wsClient.subscribe(
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
    WS_KEY_MAP.v3Public, // This parameter points to private or public
  );

  // Or multiple at once:
  wsClient.subscribe(
    [
      {
        topic: 'ticker',
        payload: {
          instType: 'spot',
          symbol: 'BTCUSDT',
        },
      },
      {
        topic: 'ticker',
        payload: {
          instType: 'spot',
          symbol: 'ETHUSDT',
        },
      },
      {
        topic: 'ticker',
        payload: {
          instType: 'spot',
          symbol: 'XRPUSDT',
        },
      },
      {
        topic: 'ticker',
        payload: {
          instType: 'usdt-futures',
          symbol: 'BTCUSDT',
        },
      },
      {
        topic: 'ticker',
        payload: {
          instType: 'usdt-futures',
          symbol: 'BTCUSDT',
        },
      },
    ],
    WS_KEY_MAP.v3Public,
  );

  // Topics are tracked per websocket type
  // The below example will pull a list of subscribed topics on that connection (e.g. all public topics), after a 5 second delay:
  setTimeout(() => {
    const publicTopics = wsClient.getWsStore().getTopics(WS_KEY_MAP.v3Public);

    console.log('public topics: ', publicTopics);
  }, 5 * 1000);
})();
