/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrokerClient, RestClientV2, WebsocketClient } from '../../src/index';

// or
// import { RestClientV2 } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

const client = new BrokerClient({
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
    // const account = await client.getSpotAccountAssets();

    // const data = account.data;
    // const cleanData = data.map((a) => {
    //   return [a.coin, +a.available].join(',');
    // });

    // console.log('res: ', data.length, '\ncoin,available');
    // console.log(cleanData.join('\n'));

    const res = await client.getAgentCommissionDetail();
    console.log('res: ', JSON.stringify(res, null, 2));

    // const businessTypeEnum = [
    //   'SMALL_EXCHANGE_USER_IN',
    //   'SMALL_EXCHANGE_USER_OUT',
    //   'WITHDRAW',
    //   // 'AIRDROP_REWARD',
    // ];
    // const billsRes = await client.getSpotAccountBills({ limit: '500' });

    // const rows = billsRes.data.filter(
    //   (data) => !businessTypeEnum.includes(data.businessType),
    // );
    // console.log('res, ', JSON.stringify(rows, null, 2));

    // for (const bill of rows) {
    //   if (!businessTypeEnum.includes(bill.businessType)) {
    //     console.error('missing enum: ', bill);
    //   }
    // }
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
