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

- Complete integration with all Bitget APIs.
- TypeScript support (with type declarations for most API requests & responses).
- Over 100 integration tests making real API calls & WebSocket connections, validating any changes before they reach npm.
- Robust WebSocket integration with configurable connection heartbeats & automatic reconnect then resubscribe workflows.
- Officially listed Node.js SDK in [Bitget API docs](https://bitgetlimited.github.io/apidoc/en/spot/#sdk-code-example).
- Browser support (via webpack bundle - see "Browser Usage" below).

## Installation

`npm install --save bitget-api`

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/bitget-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Follow our announcement channel for real-time updates on [X/Twitter](https://x.com/sieblyio)

<!-- template_related_projects -->

## Related projects

Check out my related JavaScript/TypeScript/Node.js projects:

- Try my REST API & WebSocket SDKs:
  - [Bybit-api Node.js SDK](https://www.npmjs.com/package/bybit-api)
  - [Okx-api Node.js SDK](https://www.npmjs.com/package/okx-api)
  - [Binance Node.js SDK](https://www.npmjs.com/package/binance)
  - [Gateio-api Node.js SDK](https://www.npmjs.com/package/gateio-api)
  - [Bitget-api Node.js SDK](https://www.npmjs.com/package/bitget-api)
  - [Kucoin-api Node.js SDK](https://www.npmjs.com/package/kucoin-api)
  - [Coinbase-api Node.js SDK](https://www.npmjs.com/package/coinbase-api)
  - [Bitmart-api Node.js SDK](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [OrderBooks Node.js](https://www.npmjs.com/package/orderbooks)
  - [Crypto Exchange Account State Cache](https://www.npmjs.com/package/accountstate)
- Check out my examples:
  - [awesome-crypto-examples Node.js](https://github.com/tiagosiebler/awesome-crypto-examples)
  <!-- template_related_projects_end -->

## Documentation

Most methods pass values as-is into HTTP requests. These can be populated using parameters specified by Bitget's API documentation, or check the type definition in each class within this repository (see table below for convenient links to each class).

- [Bitget API Documentation](https://www.bitget.com/api-doc/common/intro).
- [REST Endpoint Function List](./docs/endpointFunctionList.md)

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
| Class | Description |
|:------------------------------------: |:---------------------------------------------------------------------------------------------: |
| [RestClientV2](src/rest-client-v2.ts) | [V2 REST APIs](https://www.bitget.com/api-doc/common/intro) |
| [WebsocketClientV2](src/websocket-client-v2.ts) | Universal client for all Bitget's V2 Websockets |
| [~~SpotClient~~ (deprecated, use RestClientV2)](src/spot-client.ts) | [~~Spot APIs~~](https://bitgetlimited.github.io/apidoc/en/spot/#introduction) |
| [~~FuturesClient~~ (deprecated, use RestClientV2)](src/futures-client.ts) | [~~Futures APIs~~](https://bitgetlimited.github.io/apidoc/en/mix/#introduction) |
| [~~BrokerClient~~ (deprecated, use RestClientV2)](src/broker-client.ts) | [~~Broker APIs~~](https://bitgetlimited.github.io/apidoc/en/broker/#introduction) |
| [~~WebsocketClient~~ (deprecated, use WebsocketClientV2)](src/websocket-client.ts) | ~~Universal client for all Bitget's V1 Websockets~~ |

Examples for using each client can be found in:

- the [examples](./examples) folder.
- the [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples) repository.

If you're missing an example, you're welcome to request one. Priority will be given to [github sponsors](https://github.com/sponsors/tiagosiebler).

### Usage

First, create API credentials on Bitget's website.

All REST endpoints should be included in the [RestClientV2](src/rest-client-v2.ts) class. If any endpoints are missing or need improved types, pull requests are very welcome. You can also open an issue on this repo to request an improvement. Priority will be given to [github sponsors](https://github.com/sponsors/tiagosiebler).

Not sure which function to call or which parameters to use? Click the class name in the table above to look at all the function names (they are in the same order as the official API docs), and check the API docs for a list of endpoints/parameters/responses.

If you found the method you're looking for in the API docs, you can also search for the endpoint in the [RestClientV2](src/rest-client-v2.ts) class.

```javascript
const { RestClientV2 } = require('bitget-api');

const API_KEY = 'xxx';
const API_SECRET = 'yyy';
const API_PASS = 'zzz';

const client = new RestClientV2(
  {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
  },
  // requestLibraryOptions
);

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

#### WebSockets

For more examples, including how to use websockets with Bitget, check the [examples](./examples/) and [test](./test/) folders.

---

## Logging

### Customise logging

Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClientV2, DefaultLogger } = require('bitget-api');

// Disable all logging on the silly level (less console logs)
const customLogger = {
  ...DefaultLogger,
  silly: () => {},
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

---

<!-- template_contributions -->

### Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->

<!---
old ones:
  - BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
  - BTC(SegWit): `bc1ql64wr9z3khp2gy7dqlmqw7cp6h0lcusz0zjtls`
  - ETH(ERC20): `0xe0bbbc805e0e83341fadc210d6202f4022e50992`
  - USDT(TRC20): `TA18VUywcNEM9ahh3TTWF3sFpt9rkLnnQa
-->
<!-- template_contributions_end -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

<!-- template_star_history -->

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/bybit-api,tiagosiebler/okx-api,tiagosiebler/binance,tiagosiebler/bitget-api,tiagosiebler/bitmart-api,tiagosiebler/gateio-api,tiagosiebler/kucoin-api,tiagosiebler/coinbase-api,tiagosiebler/orderbooks,tiagosiebler/accountstate,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/bybit-api&tiagosiebler/okx-api&tiagosiebler/binance&tiagosiebler/bitget-api&tiagosiebler/bitmart-api&tiagosiebler/gateio-api&tiagosiebler/kucoin-api&tiagosiebler/coinbase-api&tiagosiebler/orderbooks&tiagosiebler/accountstate&tiagosiebler/awesome-crypto-examples&Date)

<!-- template_star_history_end -->
