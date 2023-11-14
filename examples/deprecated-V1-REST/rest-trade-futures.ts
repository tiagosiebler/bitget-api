import {
  FuturesClient,
  isWsFuturesAccountSnapshotEvent,
  isWsFuturesPositionsSnapshotEvent,
  NewFuturesOrder,
  WebsocketClient,
} from '../../src';

// or
// import {
//   FuturesClient,
//   isWsFuturesAccountSnapshotEvent,
//   isWsFuturesPositionsSnapshotEvent,
//   NewFuturesOrder,
//   WebsocketClient,
// } from 'bitget-api';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

const client = new FuturesClient({
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

/** WS event handler that uses type guards to narrow down event type */
async function handleWsUpdate(event) {
  if (isWsFuturesAccountSnapshotEvent(event)) {
    console.log(new Date(), 'ws update (account balance):', event);
    return;
  }

  if (isWsFuturesPositionsSnapshotEvent(event)) {
    console.log(new Date(), 'ws update (positions):', event);
    return;
  }

  logWSEvent('update (unhandled)', event);
}

/**
 * This is a simple script wrapped in a immediately invoked function expression (to execute the below workflow immediately).
 *
 * It is designed to:
 * - open a private websocket channel to log account events
 * - check for any available USDT balance in the futures account
 * - immediately open a minimum sized long position on BTCUSDT
 * - check active positions
 * - immediately send closing orders for any active futures positions
 * - check positions again
 *
 * The corresponding UI for this is at https://www.bitget.com/en/mix/usdt/BTCUSDT_UMCBL
 */
(async () => {
  try {
    // Add event listeners to log websocket events on account
    wsClient.on('update', (data) => handleWsUpdate(data));

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
      (row) => row.symbol === symbol,
    );

    console.log('symbol rules: ', bitcoinUSDFuturesRule);
    if (!bitcoinUSDFuturesRule) {
      console.error('Failed to get trading rules for ' + symbol);
      return;
    }

    const order: NewFuturesOrder = {
      marginCoin,
      orderType: 'market',
      side: 'open_long',
      size: bitcoinUSDFuturesRule.minTradeNum,
      symbol,
    } as const;

    console.log('placing order: ', order);

    const result = await client.submitOrder(order);

    console.log('order result: ', result);

    const positionsResult = await client.getPositions('umcbl');
    const positionsToClose = positionsResult.data.filter(
      (pos) => pos.total !== '0',
    );

    console.log('open positions to close: ', positionsToClose);

    // Loop through any active positions and send a closing market order on each position
    for (const position of positionsToClose) {
      const closingSide =
        position.holdSide === 'long' ? 'close_long' : 'close_short';
      const closingOrder: NewFuturesOrder = {
        marginCoin: position.marginCoin,
        orderType: 'market',
        side: closingSide,
        size: position.available,
        symbol: position.symbol,
      };

      console.log('closing position with market order: ', closingOrder);

      const result = await client.submitOrder(closingOrder);
      console.log('position closing order result: ', result);
    }

    console.log(
      'positions after closing all: ',
      await client.getPositions('umcbl'),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
