<!-- siebly:metadata
siebly:
  version: 1
  hero:
    headline: Bitget API JavaScript Tutorial for Node.js and TypeScript
    badges:
      - Bitget API
      - V3/UTA
      - Spot
      - Futures
      - WebSocket API
      - Classic
    summary: Build Bitget integrations without writing your own request signing, UTA routing, WebSocket authentication, reconnect loops, resubscribe logic, or WebSocket API response matching.
    codeFilename: first-bitget-api-call.ts
    codeStatus: public REST API
    startSectionId: start-building-first-rest-api-calls
  software:
    description: Node.js and JavaScript SDK for Bitget V3/UTA REST API, public and private WebSockets, demo trading, WebSocket API command workflows, proxy support, and V2/Classic fallback flows.
    topics:
      - Bitget V3 REST API
      - Bitget UTA workflows
      - Public WebSockets
      - Private WebSockets
      - WebSocket API
      - Demo trading
      - V2 Classic REST API
      - REST API and WebSocket proxies
  machineCatalog:
    label: Bitget API JavaScript Tutorial
    topics:
      - V3/UTA REST API
      - UTA product routing values
      - demo trading
      - public WebSockets
      - private WebSockets
      - WebSocket API commands
      - V2 Classic API fallbacks
      - HTTP and SOCKS proxies
      - production reconnect handling
  sdkPagePromo:
    descriptionBeforePackage: 'A practical JavaScript guide to using '
    descriptionAfterPackage: ' across Bitget V3/UTA REST, public and private streams, demo trading, WebSocket API commands, proxies, and V2/Classic fallback flows.'
    highlights:
      - V3/UTA REST API and proxy examples
      - Public and private WebSocket streams
      - Demo trading and WebSocket API commands
      - Clear V2/Classic boundaries
    exampleHref: '/examples/Bitget/V3 - UTA/WS-API/ws-api-client-trade'
    exampleLabel: WebSocket API example
    architectureClientSummary: RestClientV3, WebsocketClientV3, WebsocketAPIClient
    architectureApiTitle: Bitget APIs
    architectureApiSummary: V3/UTA REST, streams, WebSocket API, Classic fallbacks
  surfaceMap:
    heading: One Bitget SDK, current and Classic API surfaces
    summary: Bitget integrations often need both current UTA flows and a clear boundary for Classic endpoints. Use the SDK surface that matches the account, endpoint family, and stream topic shape.
    appLabel: Bot, dashboard, worker, tool
    appSummary: Any Node.js or JavaScript-compatible service that needs Bitget market data, account state, order management, or reconciliation.
    apiLabel: Bitget APIs
    apiItems:
      - V3/UTA REST API calls
      - Public market streams
      - Private account streams
      - WebSocket API order commands
      - V2/Classic fallback workflows
    packageNodes:
      - label: RestClientV3
        summary: Current V3/UTA REST API
      - label: WebsocketClientV3
        summary: V3 public and private streams
      - label: WebsocketAPIClient
        summary: Awaitable order commands
      - label: RestClientV2
        summary: Classic REST fallback
      - label: WebsocketClientV2
        summary: Classic stream fallback
  routing:
    id: product-values
    eyebrow: Product values
    heading: Bitget casing changes by surface
    summary: Keep product routing values close to the client and method that use them. V3 REST, WebSocket streams, WebSocket API commands, and Classic APIs do not all use the same casing.
    rows:
      - eyebrow: V3 REST
        code: "category: 'SPOT'"
        summary: REST category values are upper-case and include SPOT, MARGIN, USDT-FUTURES, USDC-FUTURES, and COIN-FUTURES.
      - eyebrow: V3 public WebSocket
        code: "instType: 'spot'"
        summary: Public stream instType values are lower-case, such as spot and usdt-futures.
      - eyebrow: V3 private WebSocket
        code: "instType: 'UTA'"
        summary: Private account, position, fill, and order topics use UTA as the account stream instType.
      - eyebrow: V3 WebSocket API
        code: "category: 'spot'"
        summary: WebSocket API command categories are lower-case and have their own order option casing.
  coverage:
    heading: What to get right in a Bitget integration
    summary: Start with a working public request, then build through credentials, UTA product values, private streams, demo trading, WebSocket API commands, proxy configuration, Classic boundaries, reconnect recovery, and production rollout checks.
    cards:
      - heading: V3/UTA REST API
        summary: Install the package, create RestClientV3, make public reads, add private credentials, configure the REST API network path, and test demo order flows.
      - heading: Public and private streams
        summary: Use WebsocketClientV3 with the right WS_KEY_MAP entry and optional proxy agent, then handle reconnect and resubscribe behavior.
      - heading: WebSocket API commands
        summary: Use WebsocketAPIClient for promise-wrapped place, batch place, cancel, and batch cancel commands.
      - heading: V2/Classic boundaries
        summary: Keep Classic REST and WebSocket usage separate from UTA assumptions, categories, and topic casing.
  snippets:
    heading: First REST API calls, streams, demo trading, and WebSocket API commands
    summary: Run one focused example first, then add the surrounding account-state and recovery workflow once the client, credentials, and product values are correct.
    labels:
      public-rest: Public REST
      private-rest: Private REST
      public-websocket: Public stream
      private-websocket: Private stream
      demo-order: Demo order
      ws-api: WebSocket API
  workflows:
    heading: REST API, WebSocket stream, and WebSocket API workflows
    summary: A REST API response, stream update, and WebSocket API acknowledgement each carry different operational meaning. These flows show where routing, subscription state, reconnect recovery, and command acknowledgement fit.
    diagrams:
      - heading: V3 REST request path
        summary: Keep category and symbol explicit, then let the SDK handle timestamp, signature, routing, and response parsing.
        steps:
          - label: choose(category)
            owner: app
          - label: build typed request
            owner: app
          - label: call RestClientV3
            owner: sdk
          - label: sign and route
            owner: sdk
          - label: receive Bitget response
            owner: exchange
          - label: check code and state
            owner: app
      - heading: Private stream recovery
        summary: After reconnect, automatic resubscribe is only transport recovery. Reconcile account state before sensitive actions resume.
        steps:
          - label: on(reconnect)
            owner: event
          - label: pause private writes
            owner: app
          - label: automatic reconnect
            owner: sdk
          - label: automatic resubscribe
            owner: sdk
          - label: REST backfill
            owner: app
          - label: resume from known state
            owner: app
      - heading: WebSocket API order command
        summary: Use the WebSocket API for awaitable commands, then confirm final state through streams or REST.
        steps:
          - label: connectWSAPI()
            owner: app
          - label: authenticate
            owner: sdk
          - label: submitNewOrder()
            owner: app
          - label: match response id
            owner: sdk
          - label: receive ack
            owner: exchange
          - label: confirm order state
            owner: app
  production:
    heading: Before a Bitget integration trades unattended
    summary: "The important work starts after the first request succeeds: credentials, account mode, product values, reconnect behavior, final order state, and Classic boundaries all need to be predictable and observable."
    items:
      - Use separate live and demo trading keys, and never put private keys in frontend code.
      - Make category, instType, symbol, account mode, and product family explicit in request builders.
      - Set clientOid on every order before sending so retries and restarts can reconcile state.
      - After private WebSocket reconnects, backfill balances, positions, open orders, history, and recent fills through REST.
      - Check Bitget code values, per-item batch codes, and final order status before treating a command as complete.
      - Keep the host clock synced for private signed requests and avoid widening recvWindow unless needed.
      - Use V2/Classic clients only in isolated workflows that still depend on Classic API semantics.
      - Monitor proxy reachability, latency, and egress IP when a proxy is enabled.
  journeys:
    eyebrow: Choose your path
    heading: Jump to the Bitget workflow you are building
    actionLabel: Open section
    cards:
      - heading: Start with V3 REST
        summary: Use RestClientV3 for UTA market data, account reads, balances, positions, orders, and fills.
        href: "#v3-rest-api"
      - heading: Stream account state
        summary: Subscribe to V3 private account, position, fill, and order topics with instType set to UTA.
        href: "#v3-websocket-streams"
      - heading: Test demo orders
        summary: "Use separate demo keys and demoTrading: true before small live order tests."
        href: "#start-building-first-rest-api-calls"
      - heading: Keep Classic isolated
        summary: Use V2 clients only for workflows that still depend on Classic endpoints and topic shapes.
        href: "#v2classic-apis"
  article:
    heading: Build around Bitget UTA flows first
    summary: "This tutorial focuses on the Bitget API pieces developers usually need first: V3 REST API calls, UTA public and private streams, WebSocket API commands, demo trading, proxies, V2/Classic boundaries, reconnects, and rollout checks."
  related:
    cards:
      - heading: Bitget SDK page
        summary: Return to install snippets, direct examples, endpoint maps, and package links.
        href: /sdk/bitget/javascript
      - heading: WebSocket API example
        summary: Open the runnable Bitget WebSocket API client example referenced in the tutorial.
        href: /examples/Bitget/V3%20-%20UTA/WS-API/ws-api-client-trade
      - heading: Private stream example
        summary: Review private account, position, fill, and order topic subscriptions.
        href: /examples/Bitget/V3%20-%20UTA/Websocket/ws-private
      - heading: Source repository
        summary: Browse SDK source, releases, issues, and endpoint coverage from GitHub.
        href: https://github.com/tiagosiebler/bitget-api
-->
# Bitget API JavaScript Tutorial for Node.js and TypeScript

<!-- siebly:website-omit:start -->
> [!TIP]
> This tutorial is available in a more readable format on our website: [Bitget JavaScript Tutorial](https://siebly.io/sdk/bitget/javascript/tutorial)
<!-- siebly:website-omit:end -->

This guide shows how to connect to Bitget with our [`bitget-api`](https://www.npmjs.com/package/bitget-api) package - the Bitget Node.js, JavaScript, and TypeScript SDK by Siebly.io. You'll cover REST, WebSocket streams, the WebSocket API, and HTTP, HTTPS, and SOCKS proxy configuration.

The SDK handles signing, routing, reconnects, and resubscribes so you don't have to. Below: install, public and private REST, live streams, demo trading, WebSocket API orders, V2/Classic where you still need it, and a few production notes.

**Key links**

- Bitget JavaScript SDK by Siebly: [`bitget-api`](https://www.npmjs.com/package/bitget-api)
- GitHub Repository: [`tiagosiebler/bitget-api`](https://github.com/tiagosiebler/bitget-api)
- SDK function-endpoint map: [Bitget JavaScript Endpoint Reference](./endpointFunctionList.md)
- SDK examples: [Bitget SDK examples](../examples)
- Bitget UTA docs: [Unified Trading Account](https://www.bitget.com/api-doc/uta/intro)
- Bitget UTA quick start: [Quick Start](https://www.bitget.com/api-doc/uta/guide)
- Bitget Classic REST quick start: [Classic REST API](https://www.bitget.com/api-doc/classic/quickStart/intro)
- Bitget Classic WebSocket quick start: [Classic WebSocket API](https://www.bitget.com/api-doc/classic/quickStart/websocket-intro)
- More Node.js, JavaScript & TypeScript SDKs for CryptoCurrency Exchange REST APIs & WebSockets: [Siebly JavaScript SDKs for Crypto APIs](https://siebly.io)

---

<!-- siebly:section id="why-use-the-sdk" -->
## Why use the SDK

Bitget has several API surfaces, and they don't all work the same way:

- V3/UTA REST APIs for current Unified Trading Account market data, account reads, transfers, positions, and order management.
- V3 public WebSocket streams for live market data.
- V3 private WebSocket streams for account, position, fill, and order updates.
- V3 WebSocket API commands for order placement and cancellation over a persistent WebSocket connection.
- V2/Classic REST and WebSocket APIs for accounts and workflows that have not moved to UTA.
- Demo trading endpoints and separate demo API keys for safer order testing.

That adds up - auth, routing, WebSocket lifecycle, topic tracking, reconnects, typed request shapes. The SDK handles those parts. You focus on the work: pull market data, check balances, place orders, subscribe to updates, reconcile after reconnects.

The main SDK surfaces are:

| Use case                       | SDK surface          | Common usage                                                                                             |
| ------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------- |
| Current REST API               | `RestClientV3`       | V3/UTA public market data, account reads, transfers, positions, orders, fills, and other endpoint groups |
| Current WebSocket streams      | `WebsocketClientV3`  | V3/UTA public market streams and private account streams                                                 |
| Current WebSocket API commands | `WebsocketAPIClient` | Promise-driven V3 order placement, batch placement, cancellation, and batch cancellation over WebSocket  |
| Classic REST API               | `RestClientV2`       | V2/Classic public, private, and trading workflows                                                        |
| Classic WebSocket streams      | `WebsocketClientV2`  | V2/Classic public and private stream topics                                                              |

For new UTA work, start with `RestClientV3`, `WebsocketClientV3`, and `WebsocketAPIClient`. Reach for `RestClientV2` and `WebsocketClientV2` only when the account or workflow is still on Bitget Classic.

---

<!-- siebly:section id="installation-api-keys" -->
## Installation & API Keys

Install the SDK with npm:

```bash
npm install bitget-api
```

Or use another npm-compatible package manager:

```bash
pnpm install bitget-api
yarn add bitget-api
```

Public market data does not require API keys. Private REST API calls, private WebSocket streams, and WebSocket API order commands require three Bitget API credentials:

| SDK option  | Bitget credential                              |
| ----------- | ---------------------------------------------- |
| `apiKey`    | API key                                        |
| `apiSecret` | API secret                                     |
| `apiPass`   | API passphrase set when the API key is created |

`apiPass` is the Bitget API passphrase, not the account login password.

Use separate credentials for live and demo trading. Demo trading API calls need demo API keys plus `demoTrading: true` in the SDK options.

Our private examples use environment variables for convenience - use whatever secret store fits your setup.

When creating API keys, grant the minimum permissions you need. Dashboards usually only need read access. Trading needs read/write on orders. Withdrawal isn't required for anything here. Whitelist IPs if your server has fixed outbound addresses.

---

<!-- siebly:section id="bitget-concepts-in-this-guide" -->
## Bitget concepts in this guide

Bitget has a few naming differences across their API:

| Surface                         | Product values shown in this guide                               |
| ------------------------------- | ---------------------------------------------------------------- |
| V3 REST `category`              | `SPOT`, `MARGIN`, `USDT-FUTURES`, `USDC-FUTURES`, `COIN-FUTURES` |
| V3 public WebSocket `instType`  | `spot`, `usdt-futures`, `usdc-futures`, `coin-futures`           |
| V3 private WebSocket `instType` | `UTA`                                                            |
| V3 WebSocket API category       | `spot`, `usdt-futures`, `usdc-futures`, `coin-futures`           |
| V2 WebSocket `instType`         | `SPOT`, `USDT-FUTURES`, `USDC-FUTURES`, `COIN-FUTURES`           |

REST, WebSocket streams, and the WebSocket API are separate integration flows:

| Flow                      | SDK surface                                                                          | Best for                                                                      | What the SDK handles                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| REST API                  | `RestClientV3` or `RestClientV2`                                                     | Request/response reads, writes, order reconciliation, broad endpoint coverage | Base URLs, timestamps, auth headers, signatures, response parsing                    |
| Public WebSocket streams  | `WebsocketClientV3.subscribe` or `WebsocketClientV2.subscribeTopic`                  | Live market data such as tickers and order books                              | Connection routing, subscribe requests, heartbeats, reconnects, resubscribe          |
| Private WebSocket streams | `WebsocketClientV3.subscribe` or `WebsocketClientV2.subscribeTopic` with credentials | Live account, order, fill, balance, and position updates                      | Authentication, private endpoint routing, reconnects, resubscribe                    |
| WebSocket API commands    | `WebsocketAPIClient`                                                                 | Awaitable order commands over a persistent V3 WebSocket connection            | Connection setup, authentication, request IDs, promise resolution, response matching |

Order option casing can differ by surface. V3 REST order requests use `reduceOnly: 'yes' | 'no'`. V3 WebSocket API and V2 futures request types use `reduceOnly: 'YES' | 'NO'`. When unsure, check the type definitions for the client you're using.

---

<!-- siebly:section id="start-building-first-rest-api-calls" -->
## Start building: first REST API calls

Want the quickest path to something working? Start here.

### 1. First public REST API request

Public REST calls work without credentials.

<!-- siebly:snippet id="public-rest" -->
```typescript
import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3();

async function main() {
  const serverTime = await client.getServerTime();
  const instruments = await client.getInstruments({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  const tickers = await client.getTickers({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  const orderBook = await client.getOrderBook({
    category: 'SPOT',
    symbol: 'BTCUSDT',
    limit: '5',
  });
  const candles = await client.getCandles({
    category: 'SPOT',
    symbol: 'BTCUSDT',
    interval: '1m',
    limit: '5',
  });

  console.log({
    serverTime: serverTime.data.serverTime,
    instrument: instruments.data[0]?.symbol,
    ticker: tickers.data[0],
    bestBid: orderBook.data.b[0],
    bestAsk: orderBook.data.a[0],
    candles: candles.data,
  });
}

main().catch(console.error);
```

If that prints data, public REST is working.

See also: [V3 public REST examples](../examples/V3%20-%20UTA/Rest)

### 2. First private REST API request

Private REST uses the same `RestClientV3` with credentials - the SDK signs requests for you.

<!-- siebly:snippet id="private-rest" -->
```typescript
import { RestClientV3 } from 'bitget-api';

function readBitgetCredentials() {
  const apiKey = process.env.BITGET_API_KEY;
  const apiSecret = process.env.BITGET_API_SECRET;
  const apiPass = process.env.BITGET_API_PASS;

  if (!apiKey || !apiSecret || !apiPass) {
    throw new Error(
      'Set BITGET_API_KEY, BITGET_API_SECRET, and BITGET_API_PASS before running private examples.',
    );
  }

  return { apiKey, apiSecret, apiPass };
}

const client = new RestClientV3(readBitgetCredentials());

async function main() {
  const balances = await client.getBalances();
  const settings = await client.getAccountSettings();

  console.log({
    assetMode: settings.data.assetMode,
    holdMode: settings.data.holdMode,
    usdtEquity: balances.data.usdtEquity,
    assets: balances.data.assets.slice(0, 5),
  });
}

main().catch(console.error);
```

If you get balances back, auth is set up correctly.

See also: [V3 private REST examples](../examples/V3%20-%20UTA/Rest)

### 3. First public WebSocket stream

`WebsocketClientV3` handles V3/UTA streams. Public ones don't need credentials.

<!-- siebly:snippet id="public-websocket" -->
```typescript
import { WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';

const ws = new WebsocketClientV3({});

ws.on('open', (data) => {
  console.log('connected', data.wsKey);
});

ws.on('response', (data) => {
  console.log('response', JSON.stringify(data));
});

ws.on('update', (data) => {
  console.log('market update', JSON.stringify(data));
});

ws.on('reconnect', ({ wsKey }) => {
  console.log('reconnecting', wsKey);
});

ws.on('reconnected', (data) => {
  console.log('reconnected', data?.wsKey);
});

ws.on('exception', console.error);

ws.subscribe(
  [
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
    {
      topic: 'books',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
  ],
  WS_KEY_MAP.v3Public,
);
```

The SDK keeps the connection up, reconnects on drops, and resubscribes automatically.

See also: [V3 public WebSocket example](../examples/V3%20-%20UTA/Websocket/ws-public.ts)

### 4. First private account WebSocket stream

Private streams are where trading systems usually watch account and order changes instead of polling constantly.

<!-- siebly:snippet id="private-websocket" -->
```typescript
import { WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';

function readBitgetCredentials() {
  const apiKey = process.env.BITGET_API_KEY;
  const apiSecret = process.env.BITGET_API_SECRET;
  const apiPass = process.env.BITGET_API_PASS;

  if (!apiKey || !apiSecret || !apiPass) {
    throw new Error(
      'Set BITGET_API_KEY, BITGET_API_SECRET, and BITGET_API_PASS before running private WebSocket examples.',
    );
  }

  return { apiKey, apiSecret, apiPass };
}

const ws = new WebsocketClientV3(readBitgetCredentials());

ws.on('authenticated', (data) => {
  console.log('authenticated', data.wsKey);
});

ws.on('update', (data) => {
  console.log('account update', JSON.stringify(data));
});

ws.on('response', (data) => {
  console.log('response', JSON.stringify(data));
});

ws.on('reconnect', ({ wsKey }) => {
  console.log('reconnecting', wsKey);
});

ws.on('reconnected', (data) => {
  console.log('reconnected', data?.wsKey);
  // After reconnect, use REST to reconcile balances, positions, open orders, or recent fills.
});

ws.on('exception', console.error);

ws.subscribe(
  [
    { topic: 'account', payload: { instType: 'UTA' } },
    { topic: 'position', payload: { instType: 'UTA' } },
    { topic: 'fill', payload: { instType: 'UTA' } },
    { topic: 'order', payload: { instType: 'UTA' } },
  ],
  WS_KEY_MAP.v3Private,
);
```

For V3 private account streams, use `instType: 'UTA'`.

See also: [V3 private WebSocket example](../examples/V3%20-%20UTA/Websocket/ws-private.ts)

### 5. First REST API order in demo trading

Test with demo keys before going live. Demo uses separate Bitget API keys.

The snippet below sets `demoTrading: true` - leave it on while testing. A successful response means Bitget accepted the order, not that it filled.

<!-- siebly:snippet id="demo-order" -->
```typescript
import { RestClientV3 } from 'bitget-api';

function readBitgetCredentials() {
  const apiKey = process.env.BITGET_API_KEY;
  const apiSecret = process.env.BITGET_API_SECRET;
  const apiPass = process.env.BITGET_API_PASS;

  if (!apiKey || !apiSecret || !apiPass) {
    throw new Error(
      'Set BITGET_API_KEY, BITGET_API_SECRET, and BITGET_API_PASS with demo API credentials before placing demo orders.',
    );
  }

  return { apiKey, apiSecret, apiPass };
}

const credentials = readBitgetCredentials();

const client = new RestClientV3({
  apiKey: credentials.apiKey,
  apiSecret: credentials.apiSecret,
  apiPass: credentials.apiPass,
  demoTrading: true,
});

async function main() {
  const ticker = await client.getTickers({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });

  const lastPrice = ticker.data[0]?.lastPrice;

  if (!lastPrice) {
    throw new Error('No BTCUSDT ticker price returned.');
  }

  const orderRequest = {
    category: 'SPOT',
    symbol: 'BTCUSDT',
    side: 'buy',
    orderType: 'limit',
    price: lastPrice,
    qty: '0.001',
    timeInForce: 'gtc',
    clientOid: `demo-rest-${Date.now()}`,
  } as const;

  const result = await client.submitNewOrder(orderRequest);

  console.log(result);
}

main().catch(console.error);
```

Check order status via private streams or REST: `getOrderInfo`, `getUnfilledOrders`, `getHistoryOrders`, or `getTradeFills`.

See also: [V3 spot trading example](../examples/V3%20-%20UTA/Rest/rest-trade-UTA-spot.ts)

### 6. First WebSocket API order command

The WebSocket API sends order commands over a persistent connection and waits for a response. `WebsocketAPIClient` wraps that in promises - write orders like normal `async` calls.

This example uses `demoTrading: true` with demo API keys.

<!-- siebly:snippet id="ws-api" -->
```typescript
import { WebsocketAPIClient } from 'bitget-api';

function readBitgetCredentials() {
  const apiKey = process.env.BITGET_API_KEY;
  const apiSecret = process.env.BITGET_API_SECRET;
  const apiPass = process.env.BITGET_API_PASS;

  if (!apiKey || !apiSecret || !apiPass) {
    throw new Error(
      'Set BITGET_API_KEY, BITGET_API_SECRET, and BITGET_API_PASS with demo API credentials before placing demo orders.',
    );
  }

  return { apiKey, apiSecret, apiPass };
}

const credentials = readBitgetCredentials();

const wsApi = new WebsocketAPIClient({
  apiKey: credentials.apiKey,
  apiSecret: credentials.apiSecret,
  apiPass: credentials.apiPass,
  demoTrading: true,
});

const ws = wsApi.getWSClient();

ws.on('open', (data) => console.log('ws open', data.wsKey));
ws.on('authenticated', (data) => console.log('authenticated', data.wsKey));
ws.on('exception', console.error);

async function main() {
  await ws.connectWSAPI();

  const clientOid = `demo-wsapi-${Date.now()}`;

  const placed = await wsApi.submitNewOrder('spot', {
    symbol: 'BTCUSDT',
    side: 'buy',
    orderType: 'limit',
    price: '10000',
    qty: '0.001',
    timeInForce: 'gtc',
    clientOid,
  });

  console.log('placed', placed);

  const cancelled = await wsApi.cancelOrder('spot', {
    clientOid,
  });

  console.log('cancelled', cancelled);
}

main().catch(console.error);
```

`connectWSAPI()` is optional - call it before your first command if you want the connection warm and ready.

See also: [V3 WebSocket API client example](../examples/V3%20-%20UTA/WS-API/ws-api-client-trade.ts)

---

<!-- siebly:section id="v3-rest-api" -->
## V3 REST API

`RestClientV3` is the client for current Bitget UTA REST endpoints.

### Create public and private clients

Public client:

```typescript
import { RestClientV3 } from 'bitget-api';

const publicClient = new RestClientV3();
```

Private client:

```typescript
import { RestClientV3 } from 'bitget-api';

const privateClient = new RestClientV3({
  apiKey: process.env.BITGET_API_KEY!,
  apiSecret: process.env.BITGET_API_SECRET!,
  apiPass: process.env.BITGET_API_PASS!,
});
```

Demo trading client:

```typescript
import { RestClientV3 } from 'bitget-api';

const demoClient = new RestClientV3({
  apiKey: process.env.BITGET_API_KEY!,
  apiSecret: process.env.BITGET_API_SECRET!,
  apiPass: process.env.BITGET_API_PASS!,
  demoTrading: true,
});
```

### Common public market data calls

```typescript
import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3();

async function main() {
  const instruments = await client.getInstruments({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });

  const tickers = await client.getTickers({
    category: 'USDT-FUTURES',
    symbol: 'BTCUSDT',
  });

  const orderBook = await client.getOrderBook({
    category: 'SPOT',
    symbol: 'BTCUSDT',
    limit: '20',
  });

  const candles = await client.getCandles({
    category: 'SPOT',
    symbol: 'BTCUSDT',
    interval: '1m',
    limit: '20',
  });

  const openInterest = await client.getOpenInterest({
    category: 'USDT-FUTURES',
    symbol: 'BTCUSDT',
  });

  const fundingRate = await client.getCurrentFundingRate({
    symbol: 'BTCUSDT',
  });

  console.log({
    instrument: instruments.data[0],
    ticker: tickers.data[0],
    orderBook,
    candles: candles.data.length,
    openInterest,
    fundingRate,
  });
}

main().catch(console.error);
```

### Common private account calls

```typescript
import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3({
  apiKey: process.env.BITGET_API_KEY!,
  apiSecret: process.env.BITGET_API_SECRET!,
  apiPass: process.env.BITGET_API_PASS!,
});

async function main() {
  const settings = await client.getAccountSettings();
  const balances = await client.getBalances();
  const positions = await client.getCurrentPosition({
    category: 'USDT-FUTURES',
    symbol: 'BTCUSDT',
  });
  const openOrders = await client.getUnfilledOrders({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  const recentFills = await client.getTradeFills({
    limit: '20',
  });

  console.log({
    settings: settings.data,
    balanceCount: balances.data.assets.length,
    positions: positions.data.list,
    openOrders: openOrders.data.list,
    recentFills: recentFills.data.list,
  });
}

main().catch(console.error);
```

### Common trading calls

```typescript
import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3({
  apiKey: process.env.BITGET_API_KEY!,
  apiSecret: process.env.BITGET_API_SECRET!,
  apiPass: process.env.BITGET_API_PASS!,
  demoTrading: true,
});

async function main() {
  const clientOid = `rest-${Date.now()}`;

  const placed = await client.submitNewOrder({
    category: 'SPOT',
    symbol: 'BTCUSDT',
    side: 'buy',
    orderType: 'limit',
    price: '10000',
    qty: '0.001',
    timeInForce: 'gtc',
    clientOid,
  });

  const orderInfo = await client.getOrderInfo({
    clientOid,
  });

  const cancelled = await client.cancelOrder({
    clientOid,
  });

  console.log({ placed, orderInfo, cancelled });
}

main().catch(console.error);
```

For futures close-only orders, V3 REST uses lower-case `reduceOnly` values:

```typescript
await client.submitNewOrder({
  category: 'USDT-FUTURES',
  symbol: 'BTCUSDT',
  side: 'sell',
  orderType: 'limit',
  price: '100000',
  qty: '0.001',
  timeInForce: 'gtc',
  posSide: 'long',
  reduceOnly: 'yes',
});
```

---

<!-- siebly:section id="v3-websocket-streams" -->
## V3 WebSocket streams

For live market or account updates, use `WebsocketClientV3`.

### Common events

```typescript
import { WebsocketClientV3 } from 'bitget-api';

const ws = new WebsocketClientV3({});

ws.on('open', (data) => console.log('open', data.wsKey));
ws.on('response', (data) => console.log('response', JSON.stringify(data)));
ws.on('update', (data) => console.log('update', JSON.stringify(data)));
ws.on('reconnect', (data) => console.log('reconnect', data.wsKey));
ws.on('reconnected', (data) => console.log('reconnected', data?.wsKey));
ws.on('authenticated', (data) => console.log('authenticated', data.wsKey));
ws.on('exception', console.error);
```

`response` events are subscribe/control acks. `update` events carry stream data.

### Public topics

```typescript
import { WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';

const ws = new WebsocketClientV3({});

ws.on('update', (data) => {
  console.log('public update', JSON.stringify(data));
});

ws.subscribe(
  [
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
    {
      topic: 'books',
      payload: {
        instType: 'usdt-futures',
        symbol: 'BTCUSDT',
      },
    },
  ],
  WS_KEY_MAP.v3Public,
);
```

V3 public `instType` values are lower-case: `spot`, `usdt-futures`, `usdc-futures`, and `coin-futures`.

### Private topics

```typescript
import { WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';

const ws = new WebsocketClientV3({
  apiKey: process.env.BITGET_API_KEY!,
  apiSecret: process.env.BITGET_API_SECRET!,
  apiPass: process.env.BITGET_API_PASS!,
});

ws.on('update', (data) => {
  console.log('private update', JSON.stringify(data));
});

ws.subscribe(
  [
    { topic: 'account', payload: { instType: 'UTA' } },
    { topic: 'position', payload: { instType: 'UTA' } },
    { topic: 'fill', payload: { instType: 'UTA' } },
    { topic: 'order', payload: { instType: 'UTA' } },
  ],
  WS_KEY_MAP.v3Private,
);
```

V3 private account topics use `instType: 'UTA'`.

### Unsubscribe

```typescript
ws.unsubscribe(
  {
    topic: 'ticker',
    payload: {
      instType: 'spot',
      symbol: 'BTCUSDT',
    },
  },
  WS_KEY_MAP.v3Public,
);
```

The SDK remembers subscriptions per connection and resubscribes after reconnects.

---

<!-- siebly:section id="v3-websocket-api" -->
## V3 WebSocket API

`WebsocketAPIClient` sends V3 order commands over WebSocket and returns a promise for each response.

```typescript
import { WebsocketAPIClient } from 'bitget-api';

const wsApi = new WebsocketAPIClient({
  apiKey: process.env.BITGET_API_KEY!,
  apiSecret: process.env.BITGET_API_SECRET!,
  apiPass: process.env.BITGET_API_PASS!,
  demoTrading: true,
});

async function main() {
  await wsApi.getWSClient().connectWSAPI();

  const clientOid = `wsapi-${Date.now()}`;

  const placed = await wsApi.submitNewOrder('spot', {
    symbol: 'BTCUSDT',
    side: 'buy',
    orderType: 'limit',
    price: '10000',
    qty: '0.001',
    timeInForce: 'gtc',
    clientOid,
  });

  const cancelled = await wsApi.cancelOrder('spot', {
    clientOid,
  });

  console.log({ placed, cancelled });
}

main().catch(console.error);
```

The helper methods are:

| Method                                   | WebSocket API operation |
| ---------------------------------------- | ----------------------- |
| `submitNewOrder(category, orderRequest)` | `place-order`           |
| `placeBatchOrders(category, orders)`     | `batch-place`           |
| `cancelOrder(category, cancelRequest)`   | `cancel-order`          |
| `cancelBatchOrders(category, cancels)`   | `batch-cancel`          |

For batch operations, check each item in the returned `args` array - one batch can mix accepted and rejected orders.

For futures close-only orders over the WebSocket API, use upper-case `reduceOnly` values:

```typescript
await wsApi.submitNewOrder('usdt-futures', {
  symbol: 'BTCUSDT',
  side: 'sell',
  orderType: 'limit',
  price: '100000',
  qty: '0.001',
  timeInForce: 'gtc',
  posSide: 'long',
  reduceOnly: 'YES',
});
```

---

<!-- siebly:section id="v2classic-apis" -->
## V2/Classic APIs

Reach for V2/Classic clients only when the account or workflow still uses Classic APIs. Don't mix V2 and V3 assumptions - category names, topics, request fields, and account modes all differ.

### Classic public REST

```typescript
import { RestClientV2 } from 'bitget-api';

const client = new RestClientV2();

async function main() {
  const spotCandles = await client.getSpotCandles({
    symbol: 'BTCUSDT',
    granularity: '1min',
    limit: '100',
  });

  const futuresCandles = await client.getFuturesCandles({
    symbol: 'BTCUSDT',
    productType: 'USDT-FUTURES',
    granularity: '1m',
    limit: '100',
  });

  console.log({
    spotCandles: spotCandles.data.length,
    futuresCandles: futuresCandles.data.length,
  });
}

main().catch(console.error);
```

See also: [V2 public REST examples](../examples/V2%20-%20Classic/Rest)

### Classic WebSocket streams

```typescript
import { WebsocketClientV2 } from 'bitget-api';

const ws = new WebsocketClientV2({});

ws.on('update', (data) => {
  console.log('classic update', JSON.stringify(data));
});

ws.on('response', (data) => {
  console.log('classic response', JSON.stringify(data));
});

ws.on('exception', console.error);

ws.subscribeTopic('SPOT', 'ticker', 'BTCUSDT');
```

V2 WebSocket `instType` values are upper-case, such as `SPOT`, `USDT-FUTURES`, `USDC-FUTURES`, and `COIN-FUTURES`.

See also: [V2 WebSocket examples](../examples/V2%20-%20Classic/Websocket)

---

<!-- siebly:section id="proxies" -->
## Proxies for REST API and WebSocket

Use a proxy when a deployment needs a fixed egress IP, must cross an approved corporate network, or has a controlled network failover path. A proxy does not select V3/UTA, V2/Classic, demo trading, a product category, or a WebSocket `instType`.

The broader [Using proxy with Siebly SDKs](https://siebly.io/blog/using-proxy-with-siebly-sdks) article covers the shared constructor pattern. The examples below use the current `bitget-api` V3 clients, and the same networking positions apply to the V2 clients.

Proxy agents are a Node.js networking feature. Browser applications cannot select a raw socket agent.

### HTTP or HTTPS proxy

Install the agent:

```bash
npm install bitget-api https-proxy-agent
```

Set `BITGET_PROXY_URL` to the full proxy URL, including URL-encoded credentials when required.

This public check sends one V3 REST API call and one V3 ticker subscription through the same proxy:

<!-- siebly:snippet id="http-proxy" -->

```typescript
import { HttpsProxyAgent } from 'https-proxy-agent';
import { RestClientV3, WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';

const proxyUrl = process.env.BITGET_PROXY_URL;

if (!proxyUrl) {
  throw new Error('Set BITGET_PROXY_URL before running this example.');
}

const proxyAgent = new HttpsProxyAgent(proxyUrl);

const rest = new RestClientV3(
  {},
  {
    httpsAgent: proxyAgent,
    proxy: false,
  },
);

const ws = new WebsocketClientV3({
  wsOptions: {
    agent: proxyAgent,
  },
});

ws.on('open', ({ wsKey }) => {
  console.log('WebSocket connected through proxy:', wsKey);
});
ws.on('update', (event) => {
  console.log('stream update', event);
});
ws.on('exception', console.error);

async function main() {
  const serverTime = await rest.getServerTime();
  console.log('REST API connected through proxy:', serverTime);

  ws.subscribe(
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
    WS_KEY_MAP.v3Public,
  );
}

process.once('SIGINT', () => {
  ws.closeAll();
});

main().catch(console.error);
```

REST API networking options belong in the second constructor argument for both `RestClientV3` and `RestClientV2`:

- `httpsAgent` sends the HTTPS request through the agent.
- `proxy: false` prevents Axios from applying another proxy configuration on top of that agent.

WebSocket networking options belong in `wsOptions.agent` for `WebsocketClientV3`, `WebsocketClientV2`, and `WebsocketAPIClient`. Bitget authenticates private streams and WebSocket API commands over the socket. The WebSocket clients do not fetch a separate authentication token through REST API.

### Private streams and WebSocket API through a proxy

This example authenticates a V3 private stream and a V3 WebSocket API connection without placing an order:

<!-- siebly:snippet id="private-proxy" -->

```typescript
import {
  WebsocketAPIClient,
  WebsocketClientV3,
  WS_KEY_MAP,
} from 'bitget-api';
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl = process.env.BITGET_PROXY_URL;

if (!proxyUrl) {
  throw new Error('Set BITGET_PROXY_URL before running this example.');
}

const apiKey = process.env.BITGET_API_KEY;
const apiSecret = process.env.BITGET_API_SECRET;
const apiPass = process.env.BITGET_API_PASS;

if (!apiKey || !apiSecret || !apiPass) {
  throw new Error(
    'Set BITGET_API_KEY, BITGET_API_SECRET, and BITGET_API_PASS before running this example.',
  );
}

const proxyAgent = new HttpsProxyAgent(proxyUrl);
const credentials = { apiKey, apiSecret, apiPass };

const streams = new WebsocketClientV3({
  ...credentials,
  wsOptions: {
    agent: proxyAgent,
  },
});

const wsApi = new WebsocketAPIClient({
  ...credentials,
  attachEventListeners: false,
  wsOptions: {
    agent: proxyAgent,
  },
});
const wsApiConnection = wsApi.getWSClient();

streams.on('authenticated', ({ wsKey }) => {
  console.log('Private stream authenticated:', wsKey);
});
streams.on('exception', console.error);
wsApiConnection.on('authenticated', ({ wsKey }) => {
  console.log('WebSocket API authenticated:', wsKey);
});
wsApiConnection.on('exception', console.error);

async function main() {
  streams.subscribe(
    [
      { topic: 'account', payload: { instType: 'UTA' } },
      { topic: 'order', payload: { instType: 'UTA' } },
    ],
    WS_KEY_MAP.v3Private,
  );

  await wsApiConnection.connectWSAPI();
  console.log('Private connections are ready');
}

process.once('SIGINT', () => {
  streams.closeAll();
  wsApiConnection.closeAll();
});

main().catch(console.error);
```

Add `demoTrading: true` to both clients when testing with Bitget demo keys. The proxy setting does not choose demo trading or convert V2/Classic request shapes into V3/UTA request shapes.

### SOCKS5 proxy

Install the SOCKS agent:

```bash
npm install bitget-api socks-proxy-agent
```

Use `SocksProxyAgent` in the same REST API and WebSocket positions:

<!-- siebly:snippet id="socks-proxy" -->

```typescript
import { RestClientV3, WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';
import { SocksProxyAgent } from 'socks-proxy-agent';

const proxyUrl = process.env.BITGET_SOCKS_PROXY_URL;

if (!proxyUrl) {
  throw new Error('Set BITGET_SOCKS_PROXY_URL before running this example.');
}

const proxyAgent = new SocksProxyAgent(proxyUrl);

const rest = new RestClientV3(
  {},
  {
    httpsAgent: proxyAgent,
    proxy: false,
  },
);

const ws = new WebsocketClientV3({
  wsOptions: {
    agent: proxyAgent,
  },
});

async function main() {
  const serverTime = await rest.getServerTime();
  console.log('REST API connected through SOCKS5:', serverTime);

  ws.subscribe(
    {
      topic: 'ticker',
      payload: {
        instType: 'spot',
        symbol: 'BTCUSDT',
      },
    },
    WS_KEY_MAP.v3Public,
  );
}

process.once('SIGINT', () => {
  ws.closeAll();
});

main().catch(console.error);
```

### Proxy checks

- Keep proxy URLs and credentials in environment variables or a secret manager.
- URL-encode usernames and passwords when constructing a proxy URL from separate values.
- Make sure the proxy egress IP matches the Bitget API key's IP whitelist.
- Test a public REST API call and public WebSocket subscription before private authentication.
- Keep V3/UTA, V2/Classic, demo trading, category, and `instType` decisions separate from proxy configuration.
- Measure request, connection, and reconnect latency through the proxy.
- Treat repeated HTTP 407 responses, TLS errors, and WebSocket reconnect loops as network failures.
- Keep the host clock synchronized. Change `recvWindow` only after measuring timestamp failures and proxy latency.
- The SDK does not rotate proxy endpoints. Handle endpoint selection outside the client when rotation is required.

---

<!-- siebly:section id="production-notes" -->
## Production notes

### 1. Roll out in layers

Public REST first, then private read-only REST, then public streams, private streams, demo trading, and finally small live tests. None of the examples here need withdrawal permissions.

### 2. Use client-generated order IDs

Set `clientOid` on every order and store it before you send. You'll need it to match state after retries, reconnects, or restarts.

### 3. Reconcile after reconnects

Reconnects happen. After a private stream comes back, hit REST for balances, positions, open orders, history, and recent fills before trusting local state.

### 4. Check exchange acceptance

A resolved promise means the SDK got a response - not that the trade worked. Check Bitget's `code`, per-item batch `code` values, and order status. Accepted ≠ filled.

### 5. Keep clocks healthy

Private requests are timestamp-sensitive. Keep the host clock synced. Only touch `recvWindow` if you know you have clock skew.

### 6. Keep credentials scoped

Separate live and demo keys. Read-only keys for dashboards. Trading permissions only where you actually submit orders. Never put private keys in frontend code.

### 7. Log carefully

`BITGETTRACE=true` is handy for local debugging - it logs raw requests and responses. Don't turn it on where logs might leak account data.

---

<!-- siebly:section id="faq" -->
## FAQ

### Do I need API keys for public market data?

No. Public REST market data and public WebSocket streams can be used without API keys.

### What is the Bitget API passphrase?

The API passphrase is the passphrase set when creating the Bitget API key. In the SDK constructor it is passed as `apiPass`.

### Which client should I use for a new project?

Start with `RestClientV3`, `WebsocketClientV3`, and `WebsocketAPIClient` for current V3/UTA workflows.

### When should I use V2/Classic clients?

Use `RestClientV2` and `WebsocketClientV2` when the account or endpoint is still on Bitget Classic. Do not mix V2 and V3 request assumptions in the same snippet.

### Why do category names have different casing?

Bitget isn't consistent. V3 REST uses upper-case categories. V3 public WebSocket uses lower-case `instType`. Private account streams use `UTA`. V2 WebSocket uses upper-case `instType`.

### What is the difference between WebSocket streams and the WebSocket API?

Streams push updates - market data, account changes, fills. The WebSocket API is for sending commands (place/cancel orders) and getting a direct response. Watch state on streams; send orders on the WebSocket API.

### Can I use this SDK from plain JavaScript?

Yes. The SDK works in JavaScript and TypeScript. TypeScript users also get request and response types from the package.

### Does the SDK support RSA keys?

Yes. Pass your RSA private key as `apiSecret`; the SDK auto-detects RSA vs HMAC signing. See the [GitHub repository](https://github.com/tiagosiebler/bitget-api).

### What should I do after a WebSocket reconnect?

Normal - let the SDK reconnect and resubscribe. Then reconcile balances, orders, and fills over REST before acting on cached state.

### Where can I find more examples?

More in the repo:

- [V3/UTA examples](../examples/V3%20-%20UTA)
- [V2/Classic examples](../examples/V2%20-%20Classic)
- [Auth examples](../examples/Auth)
- [Bitget JavaScript Endpoint Reference](./endpointFunctionList.md)

---

<!-- siebly:section id="next-steps" -->
## Next steps

- [Bitget JavaScript SDK page](https://siebly.io/sdk/bitget/javascript)
- [`bitget-api` on npm](https://www.npmjs.com/package/bitget-api)
- [GitHub repo](https://github.com/tiagosiebler/bitget-api)
- [Endpoint reference](./endpointFunctionList.md)
- Bitget docs: [UTA](https://www.bitget.com/api-doc/uta/intro) · [Classic](https://www.bitget.com/api-doc/classic/quickStart/intro)
- [More exchange SDKs on Siebly.io](https://siebly.io)
