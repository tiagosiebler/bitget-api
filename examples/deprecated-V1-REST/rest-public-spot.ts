import { SpotClient } from '../../src/index';

// or
// import { SpotClient } from 'bitget-api';

const spotClient = new SpotClient();

const symbol = 'BTCUSDT_SPBL';

(async () => {
  try {
    const response = await spotClient.getCandles(symbol, '1min', {
      limit: '1000',
    });
    console.log('getCandles: ', response.data.length);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
