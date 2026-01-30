import {
  DefaultLogger,
  WebsocketClientV2,
  WS_KEY_MAP,
} from '../../../src/index.js';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClientV2 } from 'bitget-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    trace: (...params) => console.log('trace', ...params),
  };

  const wsClient = new WebsocketClientV2(
    {
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
  wsClient.on('exception', (data) => {
    console.log('WS error', data);
  });

  /**
   * Public events
   */

  const symbol = 'BTCUSDT';

  // Spot public

  // tickers
  wsClient.subscribeTopic('SPOT', 'ticker', symbol);

  // candles
  // wsClient.subscribeTopic('SPOT', 'candle1m', symbol);

  // orderbook updates
  // wsClient.subscribeTopic('SPOT', 'books', symbol);

  // trades
  // wsClient.subscribeTopic('SPOT', 'trade', symbol);

  // Futures public

  // tickers
  // wsClient.subscribeTopic('USDT-FUTURES', 'ticker', symbol);

  // candles
  // wsClient.subscribeTopic('USDT-FUTURES', 'candle1m', symbol);

  // orderbook updates
  // wsClient.subscribeTopic('USDT-FUTURES', 'books', symbol);

  // trades
  // wsClient.subscribeTopic('USDT-FUTURES', 'trade', symbol);

  // Topics are tracked per websocket type
  // Get a list of subscribed topics (e.g. all  public topics) (after a 5 second delay)
  setTimeout(() => {
    const publicTopics = wsClient.getWsStore().getTopics(WS_KEY_MAP.v2Public);

    console.log('public  topics: ', publicTopics);
  }, 5 * 1000);
})();
