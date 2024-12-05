import { RestClientV2, WebsocketClient } from '../src/index';

// or
// import { RestClientV2 } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

const client = new RestClientV2({
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
    const fromTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    console.log(
      await client.getFuturesAccountBills({
        productType: 'USDT-FUTURES',
        startTime: fromTime.getTime() + '', // should be sent as a string
        endTime: now.getTime() + '', // should be sent as a string
        limit: '100',
      }),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
