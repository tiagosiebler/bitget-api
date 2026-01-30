import { RestClientV3 } from '../../../src/index.js';

// or
// import { RestClientV3 } from 'bitget-api';

const restClient = new RestClientV3();

const symbol = 'BTCUSDT';

(async () => {
  try {
    const response = await restClient.getCandles({
      symbol,
      category: 'USDT-FUTURES',
      interval: '1m',
    });

    console.table(response.data);

    console.log('getCandles returned ' + response.data.length + ' candles');
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
