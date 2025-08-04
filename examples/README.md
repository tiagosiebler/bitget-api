# Examples

These samples can be executed using `ts-node`:

```
ts-node ./examples/rest-spot-public.ts
```

Samples that require authentication can be edited directly but also support environmental variables. E.g. on mac/unix:

```
API_KEY_COM='yourkeyhere' API_SECRET_COM='yoursecrethere' API_PASS_COM='yourapipasshere' ts-node examples/rest-trade-futures.ts
```

They can also be converted to JavaScript by changing the imports to require & removing any type annotations.

## V3 / Unified Trading Account (UTA)

These newer examples are for Bitget's V3 APIs and WebSockets. They can be found in the examples/V3 folder.

Refer to the V3 / UTA API documentation for more information on the V3 APIs:
https://www.bitget.com/api-doc/uta/intro

These APIs require your account to be upgraded to the Unified Trading Account, if you plan on using the account-level REST APIs and WebSockets. Once upgraded, the V2 APIs are no longer available to you, unless you revert back to Classic Account mode.

### WebSocket API (WS API)

The V3/UTA API introduces order placement via a persisted WebSocket connection. This Bitget Node.js, JavaScript & TypeScript SDK supports Bitget's full V3 API offering, including the WebSocket API.

There are two approaches to placing orders via the Bitget WebSocket APIs

#### WebsocketAPIClient (recommended)

This integration looks & feels like a REST API client, but uses WebSockets, via the WebsocketClient's sendWSAPIRequest method. It returns promises and has end to end types.

This is the recommended approach to easily start sending orders via an automatically persisted WebSocket connection. A simple example is below, but for a more thorough example, check the example here: [./V3/ws-api-client-trade.ts](./V3/ws-api-client-trade.ts)

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

#### ws.sendWSAPIRequest(wsKey, command, category, operation)

This is the "raw" integration within the existing WebSocket client. It uses an automatically persisted & authenticated connection to send events through Bitget's WebSocket API. It automatically tracks and connects outgoing requests with incoming responses, and returns promises that resolve/reject when a matching response is received.

Refer to [V3/ws-api-trade-raw.ts](./V3/ws-api-trade-raw.ts) to see an example.

Note: The WebsocketClient is built around this. For a more user friendly experience, it is recommended to use the WebsocketClient for WS API requests. It uses this method but has the convenience of behaving similar to a REST API (while all communication automatically happens over a persisted WebSocket connection).

## V2

These examples are for Bitget's V2 APIs and WebSockets. They can be found in the examples/V2 folder.

Refer to the V2 API documentation for more information on the V2 APIs:
https://www.bitget.com/api-doc/common/intro
