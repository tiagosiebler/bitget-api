import { RestClientV3 } from '../../src/index';

// or
// import { RestClientV3 } from 'bitget-api';

const restClient = new RestClientV3();

(async () => {
  try {
    const response = await restClient.getCandles({
      symbol: 'BTCUSDT',
      category: 'SPOT',
      interval: '1m',
    });

    console.table(response.data);
    console.log('getCandles: ', response.data.length);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
