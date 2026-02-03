/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PlaceOrderRequestV3,
  RestClientV3,
  WebsocketClientV3,
} from '../../../src/index.js';

// or
// import { PlaceOrderRequestV3, RestClientV3, WebsocketClientV3 } from '../src';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

// If running from CLI in unix, you can pass env vars as such:
// API_KEY_COM='lkm12n3-2ba3-1mxf-fn13-lkm12n3a' API_SECRET_COM='035B2B9637E1BDFFEE2646BFBDDB8CE4' API_PASSPHRASE_COM='ComplexPa$$!23$5^' ts-node examples/V3/rest-trade-futures.ts

// note the single quotes, preventing special characters such as $ from being incorrectly passed

const client = new RestClientV3({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
  // apiKey: 'apiKeyHere',
  // apiSecret: 'apiSecretHere',
  // apiPass: 'apiPassHere',
});

const wsClient = new WebsocketClientV3({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
});

function logWSEvent(type: string, data: any) {
  console.log(new Date(), `WS ${type} event: `, data);
}

// simple sleep function
function promiseSleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * This is a simple script wrapped in a immediately invoked function expression (to execute the below workflow immediately).
 *
 * It is designed to:
 * - open a private websocket channel to log account events
 * - check for any available USDT balance in the account
 * - immediately open a minimum sized long position on BTCUSDT
 * - check active positions
 * - immediately send closing orders for any active futures positions
 * - check positions again
 *
 */
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

    // Subscribe to private topics for UTA account
    wsClient.subscribe(
      {
        topic: 'account',
        payload: {
          instType: 'UTA',
        },
      },
      'v3Private',
    );

    // Subscribe to position updates
    wsClient.subscribe(
      {
        topic: 'position',
        payload: {
          instType: 'UTA',
        },
      },
      'v3Private',
    );

    // Subscribe to order updates
    wsClient.subscribe(
      {
        topic: 'order',
        payload: {
          instType: 'UTA',
        },
      },
      'v3Private',
    );

    // wait briefly for ws to be ready (could also use the response or authenticated events, to make sure topics are subscribed to before starting)
    await promiseSleep(2.5 * 1000);

    const symbol = 'BTCUSDT';

    const balanceResult = await client.getBalances();
    const accountBalance = balanceResult.data;

    const usdtAsset = accountBalance.assets?.find(
      (asset) => asset.coin === 'USDT',
    );
    const usdtAmount = usdtAsset ? Number(usdtAsset.available) : 0;

    console.log('USDT balance: ', usdtAmount);

    if (!usdtAmount) {
      console.error('No USDT to trade');
      return;
    }

    const symbolRulesResult = await client.getInstruments({
      category: 'USDT-FUTURES',
      symbol: symbol,
    });
    const bitcoinUSDFuturesRule = symbolRulesResult.data.find(
      (row) => row.symbol === symbol,
    );

    console.log('symbol rules: ', bitcoinUSDFuturesRule);
    if (!bitcoinUSDFuturesRule) {
      console.error('Failed to get trading rules for ' + symbol);
      return;
    }

    const order: PlaceOrderRequestV3 = {
      category: 'USDT-FUTURES',
      orderType: 'market',
      side: 'buy',
      qty: bitcoinUSDFuturesRule.minOrderQty,
      symbol: symbol,
    } as const;

    console.log('placing order: ', order);

    const result = await client.submitNewOrder(order);

    console.log('order result: ', result);

    const positionsResult = await client.getCurrentPosition({
      category: 'USDT-FUTURES',
    });
    const positionsToClose = positionsResult.data.list.filter(
      (pos) => pos.total !== '0',
    );

    console.log('open positions to close: ', positionsToClose);

    // Loop through any active positions and send a closing market order on each position
    for (const position of positionsToClose) {
      const closingSide = position.posSide === 'long' ? 'sell' : 'buy';
      const closingOrder: PlaceOrderRequestV3 = {
        category: 'USDT-FUTURES',
        orderType: 'market',
        side: closingSide,
        qty: position.total,
        symbol: position.symbol,
      };

      console.log('closing position with market order: ', closingOrder);

      const result = await client.submitNewOrder(closingOrder);
      console.log('position closing order result: ', result);
    }

    console.log(
      'positions after closing all: ',
      await client.getCurrentPosition({
        category: 'USDT-FUTURES',
      }),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
