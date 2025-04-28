import {
  FuturesPlaceOrderRequestV2,
  RestClientV2,
  WebsocketClientV2,
} from '../src';

// or
// import { FuturesPlaceOrderRequestV2, RestClientV2, WebsocketClientV2 } from '../src';

// read from environmental variables
const API_KEY = process.env.API_KEY_COM;
const API_SECRET = process.env.API_SECRET_COM;
const API_PASS = process.env.API_PASS_COM;

// If running from CLI in unix, you can pass env vars as such:
// API_KEY_COM=‘lkm12n3-2ba3-1mxf-fn13-lkm12n3a’ API_SECRET_COM='035B2B9637E1BDFFEE2646BFBDDB8CE4' API_PASSPHRASE_COM='ComplexPa$$!23$5^' ts-node examples/rest-trade-futures.ts

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

    // futures private
    // : account updates
    wsClient.subscribeTopic('USDT-FUTURES', 'account');

    // : position updates
    wsClient.subscribeTopic('USDT-FUTURES', 'positions');

    // : order updates
    wsClient.subscribeTopic('USDT-FUTURES', 'orders');

    // wait briefly for ws to be ready (could also use the response or authenticated events, to make sure topics are subscribed to before starting)
    await promiseSleep(2.5 * 1000);

    const symbol = 'BTCUSDT';
    const marginCoin = 'USDT';

    const balanceResult = await client.getFuturesAccountAssets({
      productType: 'USDT-FUTURES',
    });
    const accountBalance = balanceResult.data;
    // const balances = allBalances.filter((bal) => Number(bal.available) != 0);
    const assetList = accountBalance.find(
      (bal) => bal.marginCoin === marginCoin,
    )?.assetList;
    const usdtAmount = assetList?.find(
      (asset) => asset.coin === 'USDT',
    )?.balance;

    console.log('USDT balance: ', usdtAmount);

    if (!usdtAmount) {
      console.error('No USDT to trade');
      return;
    }

    const symbolRulesResult = await client.getFuturesContractConfig({
      symbol,
      productType: 'USDT-FUTURES',
    });
    const bitcoinUSDFuturesRule = symbolRulesResult.data.find(
      (row) => row.symbol === symbol,
    );

    console.log('symbol rules: ', bitcoinUSDFuturesRule);
    if (!bitcoinUSDFuturesRule) {
      console.error('Failed to get trading rules for ' + symbol);
      return;
    }

    const order: FuturesPlaceOrderRequestV2 = {
      marginCoin: marginCoin,
      marginMode: 'crossed',
      productType: 'USDT-FUTURES',
      orderType: 'market',
      side: 'buy',
      size: bitcoinUSDFuturesRule.minTradeNum,
      symbol: symbol,
    } as const;

    console.log('placing order: ', order);

    const result = await client.futuresSubmitOrder(order);

    console.log('order result: ', result);

    const positionsResult = await client.getFuturesPositions({
      productType: 'USDT-FUTURES',
    });
    const positionsToClose = positionsResult.data.filter(
      (pos) => pos.total !== '0',
    );

    console.log('open positions to close: ', positionsToClose);

    // Loop through any active positions and send a closing market order on each position
    for (const position of positionsToClose) {
      const closingSide = position.holdSide === 'long' ? 'sell' : 'buy';
      const closingOrder: FuturesPlaceOrderRequestV2 = {
        marginCoin: position.marginCoin,
        marginMode: 'crossed',
        productType: 'USDT-FUTURES',
        orderType: 'market',
        side: closingSide,
        size: position.available,
        symbol: position.symbol,
      };

      console.log('closing position with market order: ', closingOrder);

      const result = await client.futuresSubmitOrder(closingOrder);
      console.log('position closing order result: ', result);
    }

    console.log(
      'positions after closing all: ',
      await client.getFuturesPositions({
        productType: 'USDT-FUTURES',
      }),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
