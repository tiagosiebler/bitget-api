# Node.js & Typescript Bitget API SDK

[![Build & Test](https://github.com/tiagosiebler/bitget-api/actions/workflows/integrationtest.yml/badge.svg?branch=master)](https://github.com/tiagosiebler/bitget-api/actions/workflows/integrationtest.yml) [![npm version](https://img.shields.io/npm/v/bitget-api)][1] [![npm size](https://img.shields.io/bundlephobia/min/bitget-api/latest)][1] [![npm downloads](https://img.shields.io/npm/dt/bitget-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/bitget-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/bitget-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/bitget-api) [![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/nodetraders)


[![connector logo](https://github.com/tiagosiebler/bitget-api/blob/master/docs/images/logo1.png?raw=true)][1]

[1]: https://www.npmjs.com/package/bitget-api


Node.js connector for the Bitget APIs and WebSockets:
- Complete integration with all Bitget APIs.
- TypeScript support (with type declarations for most API requests & responses).
- Over 100 integration tests making real API calls & WebSocket connections, validating any changes before they reach npm.
- Robust WebSocket integration with configurable connection heartbeats & automatic reconnect then resubscribe workflows.
- Browser support (via webpack bundle - see "Browser Usage" below).

## Installation
`npm install --save bitget-api`

## Issues & Discussion
- Issues? Check the [issues tab](https://github.com/tiagosiebler/bitget-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.

## Related projects
Check out my related projects:
- Try my connectors:
  - [ftx-api](https://www.npmjs.com/package/ftx-api)
  - [bybit-api](https://www.npmjs.com/package/bybit-api)
  - [binance](https://www.npmjs.com/package/binance)
  - [bitget-api](https://www.npmjs.com/package/bitget-api)
  - [okx-api](https://www.npmjs.com/package/okx-api)
- Try my misc utilities:
  - [orderbooks](https://www.npmjs.com/package/orderbooks)
- Check out my examples:
  - [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples)

## Documentation
Most methods pass values as-is into HTTP requests. These can be populated using parameters specified by Bitget's API documentation, or check the type definition in each class within this repository (see table below for convenient links to each class).
- [bitget API Documentation](https://www.bitget.com/docs-v5/en/#rest-api).

## Structure
This connector is fully compatible with both TypeScript and pure JavaScript projects, while the connector is written in TypeScript. A pure JavaScript version can be built using `npm run build`, which is also the version published to [npm](https://www.npmjs.com/package/bitget-api).

The version on npm is the output from the `build` command and can be used in projects without TypeScript (although TypeScript is definitely recommended).
- [src](./src) - the whole connector written in TypeScript
- [lib](./lib) - the JavaScript version of the project (built from TypeScript). This should not be edited directly, as it will be overwritten with each release.
- [dist](./dist) - the webpack bundle of the project for use in browser environments (see guidance on webpack below).
- [examples](./examples) - some implementation examples & demonstrations. Contributions are welcome!

---

## REST API Clients
Each REST API group has a dedicated REST client. To avoid confusion, here are the available REST clients and the corresponding API groups:
|                         Class           |                                                                 Description                    |
|:------------------------------------:   |:---------------------------------------------------------------------------------------------: |
| [SpotClient](src/spot-client.ts)        | [Spot APIs](https://bitgetlimited.github.io/apidoc/en/spot/#introduction)                      |
| [FuturesClient](src/futures-client.ts)  | [Futures APIs](https://bitgetlimited.github.io/apidoc/en/mix/#introduction)                    |
| [BrokerClient](src/broker-client.ts)    | [Broker APIs](https://bitgetlimited.github.io/apidoc/en/broker/#introduction)                  |
| [WebsocketClient](src/websocket-client.ts)    | Universal client for all Bitget's Websockets                  |

Examples for using each client can be found in:
- the [examples](./examples) folder.
- the [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples) repository.

If you're missing an example, you're welcome to request one. Priority will be given to [github sponsors](https://github.com/sponsors/tiagosiebler).


### Usage
First, create API credentials on Bitget's website.

All REST clients have can be used in a similar way. However, method names, parameters and responses may vary depending on the API category you're using!

Not sure which function to call or which parameters to use? Click the class name in the table above to look at all the function names (they are in the same order as the official API docs), and check the API docs for a list of endpoints/paramters/responses.

```javascript
const {
  SpotClient,
  FuturesClient,
  BrokerClient,
} = require('bitget-api');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';
const API_PASS = 'zzz';

const client = new SpotClient({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
},
  // requestLibraryOptions
);

// For public-only API calls, simply don't provide a key & secret or set them to undefined
// const client = new SpotClient();


client.getApiKeyInfo()
  .then(result => {
    console.log("getApiKeyInfo result: ", result);
  })
  .catch(err => {
    console.error("getApiKeyInfo error: ", err);
  });

const symbol = 'BTCUSDT_SPBL';
client.getCandles(symbol, '1min');
  .then(result => {
    console.log("getCandles result: ", result);
  })
  .catch(err => {
    console.error("getCandles error: ", err);
  });
```

#### WebSockets

For more examples, including how to use websockets with bitget, check the [examples](./examples/) and [test](./test/) folders.

---

## Customise Logging
Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('bitget-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const ws = new WebsocketClient(
  {
      apiKey: 'API_KEY',
      apiSecret: 'API_SECRET',
      apiPass: 'API_PASS',
  },
  DefaultLogger
);
```

## Browser Usage
Build a bundle using webpack:
- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

---

## Contributions & Thanks
### Donations
#### tiagosiebler
Support my efforts to make algo trading accessible to all - register with my referral links:
- [Bybit](https://www.bybit.com/en-US/register?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Binance](https://www.binance.com/en/register?ref=20983262)
- [Bitget](https://www.bitget.com/join/18504944)
- [FTX](https://ftx.com/referrals#a=ftxapigithub)

Or buy me a coffee using any of these:
- BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
- ETH (ERC20): `0xd773d8e6a50758e1ada699bb6c4f98bb4abf82da`

### Contributions & Pull Requests
Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.
