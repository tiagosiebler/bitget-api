import { createHmac } from 'crypto';

import {
  DefaultLogger,
  RestClientV3,
  WebsocketClientV3,
} from '../../src/index.js';

// or
// import { createHmac } from 'crypto';
// import { DefaultLogger, RestClientV3, WebsocketClientV3 } from 'bitget-api';

/**
 * Injecting a custom signMessage function.
 *
 * As of version 3.0.0 of the bitget-api Node.js/TypeScript/JavaScript
 * SDK for Bitget, the SDK uses the Web Crypto API for signing requests.
 * While it is compatible with Node and Browser environments, it is
 * slightly slower than using Node's native crypto module (only
 * available in backend Node environments).
 *
 * For latency sensitive users, you can inject the previous node crypto sign
 * method (or your own even faster implementation), if this change affects you.
 *
 * This example demonstrates how to inject a custom sign function, to achieve
 * the same peformance as seen before the Web Crypto API was introduced.
 *
 * For context on standard usage, the "signMessage" function is used:
 * - During every single API call
 * - After opening a new private WebSocket connection
 */

const apiKey = process.env.API_KEY_COM;
const apiSecret = process.env.API_SECRET_COM;
const apiPass = process.env.API_PASS_COM;

const restClient = new RestClientV3({
  apiKey: apiKey,
  apiSecret: apiSecret,
  apiPass: apiPass,
  /**
   * Set this to true to enable demo trading:
   */
  demoTrading: true,
  /**
   * Overkill in almost every case, but if you need any optimisation available,
   * you can inject a faster sign mechanism such as node's native createHmac:
   */
  customSignMessageFn: async (message, secret) => {
    return createHmac('sha256', secret).update(message).digest('hex');
  },
});

// Optional, uncomment the "trace" override to log a lot more info about what the WS client is doing
const customLogger = {
  ...DefaultLogger,
  // trace: (...params) => console.log('trace', ...params),
};

const wsClient = new WebsocketClientV3(
  {
    apiKey: apiKey,
    apiSecret: apiSecret,
    apiPass: apiPass,
    /**
     * Set this to true to enable demo trading for the private account data WS
     * Topics: order,execution,position,wallet,greeks
     */
    demoTrading: true,
    /**
     * Overkill in almost every case, but if you need any optimisation available,
     * you can inject a faster sign mechanism such as node's native createHmac:
     */
    customSignMessageFn: async (message, secret) => {
      return createHmac('sha256', secret).update(message).digest('hex');
    },
  },
  customLogger,
);

function setWsClientEventListeners(
  websocketClient: WebsocketClientV3,
  accountRef: string,
): Promise<void> {
  return new Promise((resolve) => {
    websocketClient.on('update', (data) => {
      console.log(new Date(), accountRef, 'data ', JSON.stringify(data));
      // console.log('raw message received ', JSON.stringify(data, null, 2));
    });

    websocketClient.on('open', (data) => {
      console.log(
        new Date(),
        accountRef,
        'connection opened open:',
        data.wsKey,
      );
    });
    websocketClient.on('response', (data) => {
      console.log(
        new Date(),
        accountRef,
        'log response: ',
        JSON.stringify(data, null, 2),
      );

      if (typeof data.req_id === 'string') {
        const topics = data.req_id.split(',');
        if (topics.length) {
          console.log(new Date(), accountRef, 'Subscribed to topics: ', topics);
          return resolve();
        }
      }
    });
    websocketClient.on('reconnect', ({ wsKey }) => {
      console.log(
        new Date(),
        accountRef,
        'ws automatically reconnecting.... ',
        wsKey,
      );
    });
    websocketClient.on('reconnected', (data) => {
      console.log(new Date(), accountRef, 'ws has reconnected ', data?.wsKey);
    });
    websocketClient.on('exception', (data) => {
      console.error(new Date(), accountRef, 'ws exception: ', data);
    });
  });
}

(async () => {
  try {
    const onSubscribed = setWsClientEventListeners(wsClient, 'demoAcc');

    wsClient.subscribe(['position', 'account', 'order'], 'v3Private');

    // Simple promise to ensure we're subscribed before trying anything else
    await onSubscribed;

    // Start trading
    const balResponse1 = await restClient.getBalances();
    console.log('balResponse1: ', JSON.stringify(balResponse1, null, 2));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
