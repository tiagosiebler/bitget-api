# Node.js & Typescript Bitget API SDK

[![Build & Test](https://github.com/tiagosiebler/bitget-api/actions/workflows/e2etests.yml/badge.svg?branch=master)](https://github.com/tiagosiebler/bitget-api/actions/workflows/e2etests.yml)
[![npm version](https://img.shields.io/npm/v/bitget-api)][1]
[![npm size](https://img.shields.io/bundlephobia/min/bitget-api/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/bitget-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/bitget-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/bitget-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/bitget-api)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/nodetraders)

<p align="center">
  <a href="https://www.npmjs.com/package/bitget-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/bitget-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/bitget-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

[1]: https://www.npmjs.com/package/bitget-api

Updated & performant JavaScript & Node.js SDK for the Bitget V2 REST APIs and WebSockets:

- Professional, robust & performant Bitget SDK with extensive production use in live trading environments.
- Complete integration with all Bitget APIs.
  - [x] Supports V1 REST APIs & WebSockets (legacy)
  - [x] Supports V2 REST APIs & WebSockets
  - [x] Supports V3/UTA REST APIs & WebSockets (latest)
  - [x] Supports order placement via V3 WebSocket API
- Complete TypeScript support (with type declarations for all API requests & responses).
  - Strongly typed requests and responses.
  - Automated end-to-end tests on most API calls, ensuring no breaking changes are released to npm.
- Actively maintained with a modern, promise-driven interface.
- Over 100 integration tests making real API calls & WebSocket connections, validating any changes before they reach npm.
- Robust WebSocket integration with configurable connection heartbeats & automatic reconnect then resubscribe workflows.
  - Event driven messaging.
  - Smart WebSocket persistence with automatic reconnection handling.
  - Emit `reconnected` event when dropped connection is restored.
  - Optional beautification of WebSocket events for improved readability.
- Officially listed Node.js SDK in [Bitget API docs](https://bitgetlimited.github.io/apidoc/en/spot/#sdk-code-example).
- Browser support (via webpack bundle - see "Browser Usage" below).
- Support all authentication methods supported by Bitget:
  - [x] HMAC
  - [x] RSA
- Heavy automated end-to-end testing with real API calls.
  - End-to-end testing before any release.
  - Real API calls in e2e tests.
- Proxy support via axios integration.
- Active community support & collaboration in telegram: [Node.js Algo Traders](https://t.me/nodetraders).

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Issues & Discussion](#issues--discussion)
- [Related Projects](#related-projects)
- [Documentation](#documentation)
- [Structure](#structure)
- [Usage](#usage)
  - [REST API Clients](#rest-api-clients)
    - [V3 REST APIs (Unified Trading Account)](#v3-rest-apis)
    - [V2 REST APIs](#v2-rest-apis)
  - [WebSockets](#websockets)
    - [V3 Unified Trading Account](#v3-unified-trading-account)
      - [Sending Orders via WebSockets](#sending-orders-via-websockets)
      - [Receiving Realtime Data](#receiving-realtime-data)
    - [V2 WebSockets](#v2-websockets)
  - [Customise Logging](#logging)
    - [Custom Logger](#customise-logging)
    - [Debug HTTP Requests](#debug-http-requests)
  - [Frontend Usage](#browser-usage)
    - [Import](#import)
    - [Webpack](#webpack)
- [LLMs & AI](#use-with-llms--ai)
- [Used By](#used-by)
- [Contributions & Thanks](#contributions--thanks)

## Installation

`npm install --save bitget-api`

## Examples

Refer to the [examples](./examples) folder for implementation demos.

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/bitget-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Follow our announcement channel for real-time updates on [X/Twitter](https://x.com/sieblyio)

<!-- template_related_projects -->

## Related Projects

Check out my related JavaScript/TypeScript/Node.js projects:

- Try our REST API & WebSocket SDKs published on npmjs:
  - [Bybit Node.js SDK: bybit-api](https://www.npmjs.com/package/bybit-api)
  - [Kraken Node.js SDK: @siebly/kraken-api](https://www.npmjs.com/package/coinbase-api)
  - [OKX Node.js SDK: okx-api](https://www.npmjs.com/package/okx-api)
  - [Binance Node.js SDK: binance](https://www.npmjs.com/package/binance)
  - [Gate (gate.com) Node.js SDK: gateio-api](https://www.npmjs.com/package/gateio-api)
  - [Bitget Node.js SDK: bitget-api](https://www.npmjs.com/package/bitget-api)
  - [Kucoin Node.js SDK: kucoin-api](https://www.npmjs.com/package/kucoin-api)
  - [Coinbase Node.js SDK: coinbase-api](https://www.npmjs.com/package/coinbase-api)
  - [Bitmart Node.js SDK: bitmart-api](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [OrderBooks Node.js: orderbooks](https://www.npmjs.com/package/orderbooks)
  - [Crypto Exchange Account State Cache: accountstate](https://www.npmjs.com/package/accountstate)
- Check out my examples:
  - [awesome-crypto-examples Node.js](https://github.com/tiagosiebler/awesome-crypto-examples)
  <!-- template_related_projects_end -->

## Documentation

Most methods accept JS objects. These can be populated using parameters specified by Bitget's API documentation, or check the type definition in each class within this repository (see table below for convenient links to each class).

- Bitget API Documentation
  - [V3/UTA API Documentation](https://www.bitget.com/api-doc/uta/intro) (Latest - Unified Trading Account)
  - [V2 API Documentation](https://www.bitget.com/api-doc/common/intro)
  - [Legacy V1 API Documentation](https://bitgetlimited.github.io/apidoc/en/spot/#introduction) (deprecated)
- [REST Endpoint Function List](./docs/endpointFunctionList.md)
- [TSDoc Documentation (autogenerated using typedoc)](https://tsdocs.dev/docs/bitget-api)

## Structure

This connector is fully compatible with both TypeScript and pure JavaScript projects, while the connector is written in TypeScript. A pure JavaScript version can be built using `npm run build`, which is also the version published to [npm](https://www.npmjs.com/package/bitget-api).

The version on npm is the output from the `build` command and can be used in projects without TypeScript (although TypeScript is definitely recommended).

- [src](./src) - the whole connector written in TypeScript
- [lib](./lib) - the JavaScript version of the project (built from TypeScript). This should not be edited directly, as it will be overwritten with each release.
- [dist](./dist) - the webpack bundle of the project for use in browser environments (see guidance on webpack below).
- [examples](./examples) - some implementation examples & demonstrations. Contributions are welcome!

---

# Usage

Create API credentials at Bitget:

- [Livenet API Management](https://www.bitget.com/en/support/articles/360011132814-How-to-create-API)
- [Demo Trading Environment](https://www.bitget.com/en/demo-trading)

## REST API Clients

Each REST API group has a dedicated REST client. To avoid confusion, here are the available REST clients and the corresponding API groups:
| Class | Description |
|:------------------------------------: |:---------------------------------------------------------------------------------------------: |
| [RestClientV3](src/rest-client-v3.ts) | [V3/UTA REST APIs for Bitget's Unified Trading Account](https://www.bitget.com/api-doc/uta/intro) |
| [WebsocketClientV3](src/websocket-client-v3.ts) | Universal WS client for Bitget's V3/UTA WebSockets |
| [WebsocketAPIClient](src/websocket-api-client.ts) | Websocket API Client, for RESTlike order placement via Bitget's V3/UTA WebSocket API |
| [RestClientV2](src/rest-client-v2.ts) | [V2 REST APIs](https://www.bitget.com/api-doc/common/intro) |
| [WebsocketClientV2](src/websocket-client-v2.ts) | Universal WS client for all Bitget's V2 WebSockets |
| [~~SpotClient~~ (deprecated, use RestClientV2)](src/spot-client.ts) | [~~Spot APIs~~](https://bitgetlimited.github.io/apidoc/en/spot/#introduction) |
| [~~FuturesClient~~ (deprecated, use RestClientV2)](src/futures-client.ts) | [~~Futures APIs~~](https://bitgetlimited.github.io/apidoc/en/mix/#introduction) |
| [~~BrokerClient~~ (deprecated, use RestClientV2)](src/broker-client.ts) | [~~Broker APIs~~](https://bitgetlimited.github.io/apidoc/en/broker/#introduction) |
| [~~WebsocketClient~~ (deprecated, use WebsocketClientV2)](src/websocket-client.ts) | ~~Universal client for all Bitget's V1 WebSockets~~ |

Examples for using each client can be found in:

- the [examples](./examples) folder.
- the [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples) repository.

If you're missing an example, you're welcome to request one. Priority will be given to [github sponsors](https://github.com/sponsors/tiagosiebler).

### Getting Started

All REST APIs are integrated in each dedicated Rest Client class. See the above table for which REST client to use. If you've upgraded to the Unified Trading Account, you should use the V3 REST APIs and WebSockets.

There are several REST API modules as there are some differences in each API group:

1. `RestClientV3` for the latest V3/UTA APIs (Unified Trading Account) - recommended for new projects.
2. `RestClientV2` for V2 APIs - use if you haven't upgraded to UTA yet.
3. Legacy V1 clients (`SpotClient`, `FuturesClient`, `BrokerClient`) - deprecated, migrate to V2 or V3.

More Node.js & JavaScript examples for Bitget's REST APIs & WebSockets can be found in the [examples](./examples) folder on GitHub.

#### V3 REST APIs

These are only available if you have upgraded to the Unified Trading Account. If not, use the V2 APIs instead.

```javascript
import { RestClientV3 } from 'bitget-api';
// or if you prefer require:
// const { RestClientV3 } = require('bitget-api');

// note the single quotes, preventing special characters such as $ from being incorrectly passed
const client = new RestClientV3({
  apiKey: process.env.API_KEY_COM || 'insert_api_key_here',
  apiSecret: process.env.API_SECRET_COM || 'insert_api_secret_here',
  apiPass: process.env.API_PASS_COM || 'insert_api_pass_here',
});

(async () => {
  try {
    console.log(await client.getBalances());

    const newOrder = await client.submitNewOrder({
      category: 'USDT-FUTURES',
      orderType: 'market',
      side: 'buy',
      qty: '0.001',
      symbol: 'BTCUSDT',
    });

    console.log('Order submitted: ', newOrder);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
```

#### V2 REST APIs

Not sure which function to call or which parameters to use? Click the class name in the table above to look at all the function names (they are in the same order as the official API docs), and check the API docs for a list of endpoints/parameters/responses.

If you found the method you're looking for in the API docs, you can also search for the endpoint in the [RestClientV2](src/rest-client-v2.ts) class. This class has all V2 endpoints available.

```javascript
import { RestClientV2 } from 'bitget-api';
// or if you prefer require:
// const { RestClientV2 } = require('bitget-api');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';
const API_PASS = 'zzz';

const client = new RestClientV2({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
});

// For public-only API calls, simply don't provide a key & secret or set them to undefined
// const client = new RestClientV2();

client
  .getSpotAccount()
  .then((result) => {
    console.log('getSpotAccount result: ', result);
  })
  .catch((err) => {
    console.error('getSpotAccount error: ', err);
  });

client
  .getSpotCandles({
    symbol: 'BTCUSDT',
    granularity: '1min',
    limit: '1000',
  })
  .then((result) => {
    console.log('getCandles result: ', result);
  })
  .catch((err) => {
    console.error('getCandles error: ', err);
  });
```

## WebSockets

All WebSocket functionality is supported via the WebsocketClient. Since there are currently 3 generations of Bitget's API, there are 3 WebsocketClient classes in this Node.js, JavaScript & TypeScript SDK for Bitget.

Use the following guidance to decide which one to use:

- **Unified Trading Account / V3** (latest generation):
  - For receiving data, use the [WebsocketClientV3](./src/websocket-client-v3.ts).
  - For sending orders via WebSockets, use the [WebsocketAPIClient](./src/websocket-api-client.ts).
- **V2** (not upgraded to Unified Trading Account yet)
  - Use the [WebsocketClientV2](./src/websocket-client-v2.ts).
- **V1** (deprecated)
  - This is the oldest API group supported by Bitget. You should migrate to V3 or V2 as soon as possible.
  - If you're not ready to migrate, you can use the [WebsocketClientLegacyV1](./src/websocket-client-legacy-v1.ts) class in the meantime.

All WebSocket clients support:

- Event driven messaging
- Smart WebSocket persistence with automatic reconnection
- Heartbeat mechanisms to detect disconnections
- Automatic resubscription after reconnection
- Error handling and connection monitoring
- Optional data beautification

Higher level examples below, while more thorough examples can be found in the examples folder on GitHub.

##### V3 Unified Trading Account

###### Sending orders via WebSockets

The V3 / Unified Trading Account APIs introduce order placement via a persisted WebSocket connection. This Bitget Node.js, JavaScript & TypeScript SDK supports Bitget's full V3 API offering, including the WebSocket API.

There are two approaches to placing orders via the Bitget WebSocket APIs. The recommended route is to use the dedicated WebsocketAPIClient class, included with this SDK.

This integration looks & feels like a REST API client, but uses WebSockets, via the WebsocketClient's sendWSAPIRequest method. It returns promises and has end to end types.

A simple example is below, but for a more thorough example, check the example here: [./examples/V3/ws-api-client-trade.ts](./examples/V3/ws-api-client-trade.ts)

```typescript
import { WebsocketAPIClient } from 'bitget-api';
// or if you prefer require:
// const { WebsocketAPIClient } = require("bitget-api");

// Make an instance of the WS API Client class with your API keys
const wsClient = new WebsocketAPIClient({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,

  // Whether to use the demo trading wss connection
  // demoTrading: true,
});

async function start() {
  // Start using it like a REST API. All actions are sent via a persisted WebSocket connection.

  /**
   * Place Order
   * https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel#request-parameters
   */
  try {
    const res = await wsClient.submitNewOrder('spot', {
      orderType: 'limit',
      price: '100',
      qty: '0.1',
      side: 'buy',
      symbol: 'BTCUSDT',
      timeInForce: 'gtc',
    });

    console.log(new Date(), 'WS API "submitNewOrder()" result: ', res);
  } catch (e) {
    console.error(new Date(), 'Exception with WS API "submitNewOrder()": ', e);
  }
}

start().catch((e) => console.error('Exception in example: '.e));
```

###### Receiving realtime data

Use the WebsocketClientV3 to receive data via the V3 WebSockets

```typescript
import { WebsocketClientV3 } from "bitget-api";
// or if you prefer require:
// const { WebsocketClientV3 } = require("bitget-api");

const API_KEY = "yourAPIKeyHere";
const API_SECRET = "yourAPISecretHere;
const API_PASS = "yourAPIPassHere";

const wsClient = new WebsocketClientV3(
  {
    // Only necessary if you plan on using private/account websocket topics
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
  }
);

// Connect event handlers to process incoming events
wsClient.on('update', (data) => {
  console.log('WS raw message received ', data);
  // console.log('WS raw message received ', JSON.stringify(data, null, 2));
});

wsClient.on('open', (data) => {
  console.log('WS connection opened:', data.wsKey);
});
wsClient.on('response', (data) => {
  console.log('WS response: ', JSON.stringify(data, null, 2));
});
wsClient.on('reconnect', ({ wsKey }) => {
  console.log('WS automatically reconnecting.... ', wsKey);
});
wsClient.on('reconnected', (data) => {
  console.log('WS reconnected ', data?.wsKey);
});
wsClient.on('exception', (data) => {
  console.log('WS error', data);
});

/**
 * Subscribe to topics as you wish
 */

// You can subscribe to one topic at a time
wsClient.subscribe(
  {
    topic: 'account',
    payload: {
      instType: 'UTA', // Note: all account events go on the UTA instType
    },
  },
  WS_KEY_MAP.v3Private, // This parameter points to private or public
);

// Note: all account events go on the UTA instType
const ACCOUNT_INST_TYPE = 'UTA';
const ACCOUNT_WS_KEY = WS_KEY_MAP.v3Private;

// Or multiple at once:
wsClient.subscribe(
  [
    {
      topic: 'account',
      payload: {
        instType: ACCOUNT_INST_TYPE,
      },
    },
    {
      topic: 'position',
      payload: {
        instType: ACCOUNT_INST_TYPE,
      },
    },
    {
      topic: 'fill',
      payload: {
        instType: ACCOUNT_INST_TYPE,
      },
    },
    {
      topic: 'order',
      payload: {
        instType: ACCOUNT_INST_TYPE,
      },
    },
  ],
  ACCOUNT_WS_KEY,
);

// Example public events
wsClient.subscribe(
  [
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'ETHUSDT',
      },
    },
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'XRPUSDT',
      },
    },
    {
      topic: 'ticker',
      payload: {
        instType: 'usdt-futures',
        symbol: 'BTCUSDT',
      },
    },
    {
      topic: 'ticker',
      payload: {
        instType: 'usdt-futures',
        symbol: 'BTCUSDT',
      },
    },
  ],
  WS_KEY_MAP.v3Public,
);
```

For more examples, including how to use websockets with Bitget, check the [examples](./examples/) and [test](./test/) folders.

### V2 WebSockets

If you haven't upgraded to the Unified Trading Account, use the V2 WebSocket client:

```javascript
import { WebsocketClientV2 } from 'bitget-api';
// or if you prefer require:
// const { WebsocketClientV2 } = require('bitget-api');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';
const API_PASS = 'zzz';

const wsClient = new WebsocketClientV2({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASS,
  // Optional: connect to demo trading environment
  // demoTrading: true,
});

// Handle incoming messages
wsClient.on('update', (data) => {
  console.log('WS update received: ', data);
});

wsClient.on('open', (data) => {
  console.log('WS connection opened: ', data.wsKey);
});

wsClient.on('reconnected', (data) => {
  console.log('WS reconnected: ', data?.wsKey);
});

wsClient.on('exception', (data) => {
  console.log('WS error: ', data);
});

// Subscribe to public data streams
wsClient.subscribeTopic('SPOT', 'ticker', symbol);

// Subscribe to private data streams (requires authentication)
wsClient.subscribeTopic('SPOT', 'account');
```

---

## Logging

### Customise logging

Pass a custom logger which supports the log methods `trace`, `info` and `error`, or override methods from the default logger as desired.

```javascript
import { WebsocketClientV2, DefaultLogger } from 'bitget-api';
// or if you prefer require:
// const { WebsocketClientV2, DefaultLogger } = require('bitget-api');

// Disable all logging on the trace level (less console logs)
const customLogger = {
  ...DefaultLogger,
  trace: () => {},
};

const ws = new WebsocketClientV2(
  {
    apiKey: 'API_KEY',
    apiSecret: 'API_SECRET',
    apiPass: 'API_PASS',
  },
  customLogger,
);
```

### Debug HTTP requests

In rare situations, you may want to see the raw HTTP requets being built as well as the API response. These can be enabled by setting the `BITGETTRACE` env var to `true`.

## Browser Usage

### Import

This is the "modern" way, allowing the package to be directly imported into frontend projects with full typescript support.

1. Install these dependencies
   ```sh
   npm install crypto-browserify stream-browserify
   ```
2. Add this to your `tsconfig.json`
   ```json
   {
     "compilerOptions": {
       "paths": {
         "crypto": [
           "./node_modules/crypto-browserify"
         ],
         "stream": [
           "./node_modules/stream-browserify"
         ]
   }
   ```
3. Declare this in the global context of your application (ex: in polyfills for angular)
   ```js
   (window as any).global = window;
   ```

### Webpack

This is the "old" way of using this package on webpages. This will build a minified js bundle that can be pulled in using a script tag on a website.

Build a bundle using webpack:

- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO - contributions welcome.

## Use with LLMs & AI

This SDK includes a bundled `llms.txt` file in the root of the repository. If you're developing with LLMs, use the included `llms.txt` with your LLM - it will significantly improve the LLMs understanding of how to correctly use this SDK.

This file contains AI optimised structure of all the functions in this package, and their parameters for easier use with any learning models or artificial intelligence.

---

## Used By

[![Repository Users Preview Image](https://dependents.info/tiagosiebler/bitget-api/image)](https://github.com/tiagosiebler/bitget-api/network/dependents)

---

<!-- template_contributions -->

### Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->
- Sign up with my referral links:
  - OKX (receive a 20% fee discount!): https://www.okx.com/join/42013004
  - Binance (receive a 20% fee discount!): https://accounts.binance.com/register?ref=OKFFGIJJ
  - HyperLiquid (receive a 4% fee discount!): https://app.hyperliquid.xyz/join/SDK
  - Gate: https://www.gate.io/signup/NODESDKS?ref_type=103

<!---
old ones:
  - BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
  - BTC(SegWit): `bc1ql64wr9z3khp2gy7dqlmqw7cp6h0lcusz0zjtls`
  - ETH(ERC20): `0xe0bbbc805e0e83341fadc210d6202f4022e50992`
  - USDT(TRC20): `TA18VUywcNEM9ahh3TTWF3sFpt9rkLnnQa
  - gate: https://www.gate.io/signup/AVNNU1WK?ref_type=103

-->
<!-- template_contributions_end -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

<!-- template_star_history -->

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/bybit-api,tiagosiebler/okx-api,tiagosiebler/binance,tiagosiebler/bitget-api,tiagosiebler/bitmart-api,tiagosiebler/gateio-api,tiagosiebler/kucoin-api,tiagosiebler/coinbase-api,tiagosiebler/orderbooks,tiagosiebler/accountstate,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/bybit-api&tiagosiebler/okx-api&tiagosiebler/binance&tiagosiebler/bitget-api&tiagosiebler/bitmart-api&tiagosiebler/gateio-api&tiagosiebler/kucoin-api&tiagosiebler/coinbase-api&tiagosiebler/orderbooks&tiagosiebler/accountstate&tiagosiebler/awesome-crypto-examples&Date)

<!-- template_star_history_end -->
