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

These APIs require your account to be permanently upgraded to the Unified Trading Account, if you plan on using the account-level REST APIs and WebSockets.

## V2

These examples are for Bitget's V2 APIs and WebSockets. They can be found in the examples/V2 folder.

Refer to the V2 API documentation for more information on the V2 APIs:
https://www.bitget.com/api-doc/common/intro
