import { WebsocketAPIClient } from 'bitget-api';
// or if you want to use the require syntax
//const { WebsocketAPIClient } = require('bitget-api');

// This example shows how to call this Bitget WebSocket API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "bitget-api" for Bitget exchange
// This Bitget API SDK is available on npm via "npm install bitget-api"
// WS API ENDPOINT: batch-place
// METHOD: WebSocket API
// PUBLIC: YES

// Create a WebSocket API client instance
const client = new WebsocketAPIClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
  apiPass: 'insert_api_pass_here',
});

// The WebSocket connection is established automatically when needed
// You can use the client to make requests immediately

// Example use of the placeBatchOrders method
client.placeBatchOrders(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

