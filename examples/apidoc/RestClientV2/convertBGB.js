const { RestClientV2 } = require('bitget-api');

  // ENDPOINT: /api/v2/convert/bgb-convert
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L255

const client = new RestClientV2({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.convertBGB(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
