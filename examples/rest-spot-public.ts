import { SpotClient } from '../src/index';

// or
// import { SpotClient } from 'bitget-api';

const client = new SpotClient();

const symbol = 'BTCUSDT_SPBL';

(async () => {
  try {
    console.log('getCandles: ', await client.getCandles(symbol, '1min'));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
