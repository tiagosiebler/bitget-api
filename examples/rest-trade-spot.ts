import {
  RestClientV2,
  SpotOrderRequestV2,
  WebsocketClientV2,
} from '../src/index';

// import { RestClientV2, WebsocketClient } from '../src/index';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

// If running from CLI in unix, you can pass env vars as such:
// API_KEY_COM=‘lkm12n3-2ba3-1mxf-fn13-lkm12n3a’ API_SECRET_COM='035B2B9637E1BDFFEE2646BFBDDB8CE4' API_PASSPHRASE_COM='ComplexPa$$!23$5^' ts-node examples/rest-trade-spot.ts

// note the single quotes, preventing special characters such as $ from being incorrectly passed

const client = new RestClientV2({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
  // apiKey: 'apiKeyHere',
  // apiSecret: 'apiSecretHere',
  // apiPass: 'apiPassHere',
});

const wsClient = new WebsocketClientV2({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
});

function logWSEvent(type, data) {
  console.log(new Date(), `WS ${type} event: `, data);
}

// simple sleep function
function promiseSleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/** This is a simple script wrapped in a immediately invoked function expression, designed to check for any available BTC balance and immediately sell the full amount for USDT */
(async () => {
  try {
    // Add event listeners to log websocket events on account
    wsClient.on('update', (data) => logWSEvent('update', data));
    wsClient.on('open', (data) => logWSEvent('open', data));
    wsClient.on('response', (data) => logWSEvent('response', data));
    wsClient.on('reconnect', (data) => logWSEvent('reconnect', data));
    wsClient.on('reconnected', (data) => logWSEvent('reconnected', data));
    wsClient.on('authenticated', (data) => logWSEvent('authenticated', data));
    wsClient.on('exception', (data) => logWSEvent('exception', data));

    // Subscribe to private account topics
    // spot private
    // : account updates
    wsClient.subscribeTopic('SPOT', 'account');

    // : order updates (note: symbol is required)
    wsClient.subscribeTopic('SPOT', 'orders', 'BTCUSDT');

    // wait briefly for ws to be ready (could also use the response or authenticated events, to make sure topics are subscribed to before starting)
    await promiseSleep(2.5 * 1000);

    const balanceResult = await client.getSpotAccountAssets();
    const allBalances = balanceResult.data;

    const balanceBTC = allBalances.find(
      (bal) => bal.coin === 'BTC' || bal.coin === 'btc',
    );
    const btcAmount = balanceBTC ? Number(balanceBTC.available) : 0;
    // console.log('balance: ', JSON.stringify(balances, null, 2));
    console.log('BTC balance result: ', balanceBTC);

    if (!btcAmount) {
      console.error('No BTC to trade');
      return;
    }

    console.log(`BTC available: ${btcAmount}`);
    const symbol = 'BTCUSDT';

    const symbolsResult = await client.getSpotSymbolInfo();
    const btcRules = symbolsResult.data.find((rule) => rule.symbol === symbol);
    console.log('btc trading rules: ', btcRules);
    if (!btcRules) {
      return console.log('no rules found for trading ' + symbol);
    }

    const quantity = btcRules.minTradeAmount;

    const order: SpotOrderRequestV2 = {
      symbol: symbol,
      side: 'sell',
      orderType: 'market',
      force: 'gtc',
      size: quantity,
    } as const;

    console.log('submitting order: ', order);

    const sellResult = await client.spotSubmitOrder(order);

    console.log('sell result: ', sellResult);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
