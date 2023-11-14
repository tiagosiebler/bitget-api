import { RestClientV2 } from '../src/index';

// or
// import { RestClientV2 } from 'bitget-api';

const restClient = new RestClientV2();

(async () => {
  try {
    const response = await restClient.getSpotCandles({
      symbol: 'BTCUSDT',
      granularity: '1min',
      limit: '1000',
    });

    console.table(response.data);
    console.log('getCandles: ', response.data.length);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
