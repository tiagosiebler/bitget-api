import { SpotClient, WebsocketClient } from '../../src/index';

// or
// import { SpotClient } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

const client = new SpotClient({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
  // apiKey: 'apiKeyHere',
  // apiSecret: 'apiSecretHere',
  // apiPass: 'apiPassHere',
});

const wsClient = new WebsocketClient({
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

// WARNING: for sensitive math you should be using a library such as decimal.js!
function roundDown(value, decimals) {
  return Number(
    Math.floor(parseFloat(value + 'e' + decimals)) + 'e-' + decimals,
  );
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
    wsClient.subscribeTopic('SPBL', 'account');
    wsClient.subscribeTopic('SPBL', 'orders');

    // wait briefly for ws to be ready (could also use the response or authenticated events, to make sure topics are subscribed to before starting)
    await promiseSleep(2.5 * 1000);

    const balanceResult = await client.getBalance();
    const allBalances = balanceResult.data;
    // const balances = allBalances.filter((bal) => Number(bal.available) != 0);
    const balanceBTC = allBalances.find((bal) => bal.coinName === 'BTC');
    const btcAmount = balanceBTC ? Number(balanceBTC.available) : 0;
    // console.log('balance: ', JSON.stringify(balances, null, 2));
    console.log('BTC balance result: ', balanceBTC);

    if (!btcAmount) {
      console.error('No BTC to trade');
      return;
    }

    console.log(`BTC available: ${btcAmount}`);
    const symbol = 'BTCUSDT_SPBL';

    const symbolsResult = await client.getSymbols();
    const btcRules = symbolsResult.data.find((rule) => rule.symbol === symbol);
    console.log('btc trading rules: ', btcRules);
    if (!btcRules) {
      return console.log('no rules found for trading ' + symbol);
    }

    const quantityScale = Number(btcRules.quantityScale);
    // const quantityRoundedDown = btcAmount - btcAmount % 0.01
    const quantity = roundDown(btcAmount, quantityScale);

    const order = {
      symbol: symbol,
      side: 'sell',
      force: 'normal',
      orderType: 'market',
      quantity: String(quantity),
    } as const;

    console.log('submitting order: ', order);

    const sellResult = await client.submitOrder(order);

    console.log('sell result: ', sellResult);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
