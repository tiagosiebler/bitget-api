import { FuturesClient, WebsocketClient } from '../../src/index';

// or
// import { SpotClient } from 'bitget-api';

const futuresClient = new FuturesClient();

const symbol = 'BTCUSDT_UMCBL';

(async () => {
  try {
    // Fetch the last 1000 1min candles for a symbol
    const timestampNow = Date.now();
    const msPerCandle = 60 * 1000; // 60 seconds x 1000
    const candlesToFetch = 1000;
    const msFor1kCandles = candlesToFetch * msPerCandle;
    const startTime = timestampNow - msFor1kCandles;

    const response = await futuresClient.getCandles(
      symbol,
      '1m',
      startTime.toString(),
      timestampNow.toString(),
      candlesToFetch.toString(),
    );
    console.log('getCandles returned ' + response.length + ' candles');
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
