import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from '../../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bitget-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    silly: (...params) => console.log('silly', ...params),
  };

  const wsClient = new WebsocketClient(
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
  // wsClient.subscribeTopic('SP', 'ticker', symbol);
  // // candles
  // wsClient.subscribeTopic('SP', 'candle1m', symbol);
  // // orderbook updates
  wsClient.subscribeTopic('SP', 'books', symbol);
  // // trades
  // wsClient.subscribeTopic('SP', 'trade', symbol);

  // // Futures public

  // // tickers
  // wsClient.subscribeTopic('MC', 'ticker', symbol);
  // // candles
  // wsClient.subscribeTopic('MC', 'candle1m', symbol);
  // // orderbook updates
  // wsClient.subscribeTopic('MC', 'books', symbol);
  // // trades
  // wsClient.subscribeTopic('MC', 'trade', symbol);

  // Topics are tracked per websocket type
  // Get a list of subscribed topics (e.g. for spot topics) (after a 5 second delay)
  setTimeout(() => {
    const publicSpotTopics = wsClient.getWsStore().getTopics(WS_KEY_MAP.spotv1);

    console.log('public spot topics: ', publicSpotTopics);
  }, 5 * 1000);
})();
