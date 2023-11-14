import { FuturesClient, WebsocketClient } from '../../src/index';

// or
// import { SpotClient } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

const client = new FuturesClient({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
  // apiKey: 'apiKeyHere',
  // apiSecret: 'apiSecretHere',
  // apiPass: 'apiPassHere',
});

/** This is a simple script wrapped in a immediately invoked function expression, designed to check for any available BTC balance and immediately sell the full amount for USDT */
(async () => {
  try {
    const now = new Date();
    const toTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    console.log(
      await client.getAccountBill({
        symbol: 'BTCUSDT_UMCBL',
        marginCoin: 'USDT',
        startTime: now.getTime() + '', // should be sent as a string
        endTime: toTime.getTime() + '', // should be sent as a string
        pageSize: 100,
      }),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
