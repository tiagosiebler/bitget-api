import { RestClientV2, SpotClient } from '../src/index';

// or
// import { SpotClient } from 'bitget-api';

const restClient = new RestClientV2();

const symbol = 'BTCUSDT';

(async () => {
  try {
    // Fetch the last 1000 1min candles for a symbol
    const timestampNow = Date.now();
    const msPerCandle = 60 * 1000; // 60 seconds x 1000
    const candlesToFetch = 1000;
    const msFor1kCandles = candlesToFetch * msPerCandle;
    const startTime = timestampNow - msFor1kCandles;

    const response = await restClient.getFuturesCandles({
      symbol,
      productType: 'USDT-FUTURES',
      granularity: '1m',
      startTime: startTime.toString(),
      endTime: timestampNow.toString(),
      limit: candlesToFetch.toString(),
    });

    console.table(response.data);

    console.log('getCandles returned ' + response.data.length + ' candles');
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
