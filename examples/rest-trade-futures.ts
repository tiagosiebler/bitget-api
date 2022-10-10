import { FuturesClient, WebsocketClient } from '../src/index';

// or
// import { SpotClient } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

const client = new FuturesClient({
  apiKey: API_KEY,
  // apiKey: 'apiKeyHere',
  apiSecret: API_SECRET,
  // apiSecret: 'apiSecretHere',
  apiPass: API_PASS,
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
    Math.floor(parseFloat(value + 'e' + decimals)) + 'e-' + decimals
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
    wsClient.subscribeTopic('UMCBL', 'account');
    // : position updates
    wsClient.subscribeTopic('UMCBL', 'positions');
    // : order updates
    wsClient.subscribeTopic('UMCBL', 'orders');

    // wait briefly for ws to be ready (could also use the response or authenticated events, to make sure topics are subscribed to before starting)
    await promiseSleep(2.5 * 1000);

    const symbol = 'BTCUSDT_UMCBL';
    const marginCoin = 'USDT';

    const balanceResult = await client.getAccount(symbol, marginCoin);
    const accountBalance = balanceResult.data;
    // const balances = allBalances.filter((bal) => Number(bal.available) != 0);
    const usdtAmount = accountBalance.available;
    console.log('USDT balance: ', usdtAmount);

    if (!usdtAmount) {
      console.error('No USDT to trade');
      return;
    }

    const symbolRulesResult = await client.getSymbols('umcbl');
    const bitcoinUSDFuturesRule = symbolRulesResult.data.find(
      (row) => row.symbol === symbol
    );
    console.log('symbol rules: ', bitcoinUSDFuturesRule);
    if (!bitcoinUSDFuturesRule) {
      console.error('Failed to get trading rules for ' + symbol);
      return;
    }

    const order = {
      marginCoin,
      orderType: 'market',
      side: 'open_long',
      size: bitcoinUSDFuturesRule.minTradeNum,
      symbol,
    } as const;

    console.log('placing order: ', order);

    const result = await client.submitOrder(order);

    console.log('order result: ', result);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
