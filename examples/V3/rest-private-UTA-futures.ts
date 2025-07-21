import { RestClientV3 } from '../../src/index';

// or
// import { RestClientV3 } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

// If running from CLI in unix, you can pass env vars as such:
// API_KEY_COM='lkm12n3-2ba3-1mxf-fn13-lkm12n3a' API_SECRET_COM='035B2B9637E1BDFFEE2646BFBDDB8CE4' API_PASSPHRASE_COM='ComplexPa$$!23$5^' ts-node examples/V3/rest-private-futures.ts

// note the single quotes, preventing special characters such as $ from being incorrectly passed

const client = new RestClientV3({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
  // apiKey: 'apiKeyHere',
  // apiSecret: 'apiSecretHere',
  // apiPass: 'apiPassHere',
});

/** This is a simple script wrapped in a immediately invoked function expression, designed to check account assets for futures trading */
(async () => {
  try {
    console.log(await client.getAccountAssets());
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
