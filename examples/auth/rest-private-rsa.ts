import { RestClientV2, RestClientV3 } from '../../src';

// Import frmo NPM:
// import { RestClientV2, RestClientV3 } from 'bitget-api';
// or if you prefer require:
// const { RestClientV2, RestClientV3 } = require('bitget-api');

// Received after creating a new API key with a self-generated RSA public key on Bitget
const API_KEY = 'bg_0866563123123123123f567e83e52fd';

// The self-generated RSA private key, this is never directly given to Bitget, but used to generate a signature
// Note: this MUST include the "BEGIN PRIVATE KEY" header so that the SDK understands this is RSA auth
const rsaPrivateKey = `
-----BEGIN PRIVATE KEY-----
MIIJQQIBADANBgkqhkiG9w0BAQEFAASCCSswggknAgEAAoICAQC4kNgO71O0xkuH
FjHnr5pimpEeiGPAtDTAeJoS55+kVrh3ThHsm0ARf36zimU
gwrCWAnKqPlbqzWzs9mH9JvZWrEaOgWy
8wMSJ21vtz1rRJhfaUUsOC1KLoWyvzqWW44zKaxoKSqCUMJqDbxIq7RjGlmc8KGJ
scFWRSdfGEEpvqLlpTLoEtWHZP0pUUamSWrH/IgieFFhKaOPvmED24DJAlqSeEFw
z7TW4dfWPRgjCRu4AAfgCtjb+3/7ONeQfx5XFvKFM7VNi/9sRh+alRqpzKrlI
79bM1p/egrC4c8KUqrNk2s5c3HIU......THISISANEXAMPLE
-----END PRIVATE KEY-----
`;

// This is set by you when registering your RSA API key in Bitget's website.
const API_PASS = 'TestingRSA';

const client = new RestClientV2({
  apiKey: API_KEY,
  apiSecret: rsaPrivateKey,
  apiPass: API_PASS,
});

const clientV3 = new RestClientV3({
  apiKey: API_KEY,
  apiSecret: rsaPrivateKey,
  apiPass: API_PASS,
});

// const wsClient = new WebsocketClientV2({
//   apiKey: API_KEY,
//   apiSecret: rsaPrivateKey,
//   apiPass: API_PASS,
// });

(async () => {
  try {
    console.log('V2 private api call result: ', await client.getBalances());
  } catch (e) {
    console.error('V2 request failed: ', e);
  }
  try {
    console.log('V3 private api call result: ', await clientV3.getBalances());
  } catch (e) {
    console.error('V3 request failed: ', e);
  }
})();
