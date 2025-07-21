const { RestClientV3 } = require('bitget-api');


  // This example shows how to call this Bitget API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "bitget-api" for Bitget exchange
  // This Bitget API SDK is available on npm via "npm install bitget-api"
  // ENDPOINT: /api/v3/market/instruments
  // METHOD: GET
  // PUBLIC: YES

const client = new RestClientV3({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
  apiPass: 'insert_api_pass_here',
});

client.getInstruments(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
