# Examples

These samples can be executed using `ts-node`:
```
ts-node ./examples/rest-spot-public.ts
```

Samples that require authentication can be edited directly but also support environmental variables. E.g. on mac/unix:
```
API_KEY_COM="yourkeyhere" API_SECRET_COM="yoursecrethere" API_PASS_COM="yourapipasshere" ts-node examples/rest-trade-futures.ts
```

They can also be converted to JavaScript by changing the imports to require & removing any type annotations.
