const { RestClientV2 } = require('bitget-api');

  // ENDPOINT: /api/v2/spot/wallet/subaccount-deposit-records
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L491

const client = new RestClientV2({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSubAccountDepositRecords(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
