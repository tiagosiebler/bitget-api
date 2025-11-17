
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/bitget-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/bitget-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/bitget-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [rest-client-v2](#rest-client-v2ts)
- [rest-client-v3](#rest-client-v3ts)
- [websocket-api-client](#websocket-api-clientts)


If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!

## How to use table

Table consists of 4 parts:

- Function name
- AUTH
- HTTP Method
- Endpoint

**Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

**AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

**HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

**Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name.


# rest-client-v2.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [rest-client-v2.ts](/src/rest-client-v2.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getAnnouncements()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L450) |  | GET | `/api/v2/public/annoucements` |
| [getServerTime()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L462) |  | GET | `/api/v2/public/time` |
| [getTradeRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L470) | :closed_lock_with_key:  | GET | `/api/v2/common/trade-rate` |
| [getSpotTransactionRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L485) | :closed_lock_with_key:  | GET | `/api/v2/tax/spot-record` |
| [getFuturesTransactionRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L491) | :closed_lock_with_key:  | GET | `/api/v2/tax/future-record` |
| [getMarginTransactionRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L497) | :closed_lock_with_key:  | GET | `/api/v2/tax/margin-record` |
| [getP2PTransactionRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L503) | :closed_lock_with_key:  | GET | `/api/v2/tax/p2p-record` |
| [getP2PMerchantList()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L515) | :closed_lock_with_key:  | GET | `/api/v2/p2p/merchantList` |
| [getP2PMerchantInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L524) | :closed_lock_with_key:  | GET | `/api/v2/p2p/merchantInfo` |
| [getP2PMerchantOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L528) | :closed_lock_with_key:  | GET | `/api/v2/p2p/orderList` |
| [getP2PMerchantAdvertisementList()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L537) | :closed_lock_with_key:  | GET | `/api/v2/p2p/advList` |
| [getSpotWhaleNetFlowData()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L554) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/whale-net-flow` |
| [getFuturesActiveTakerBuySellVolumeData()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L560) |  | GET | `/api/v2/mix/market/taker-buy-sell` |
| [getFuturesActiveLongShortPositionData()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L567) |  | GET | `/api/v2/mix/market/position-long-short` |
| [getFuturesLongShortRatio()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L574) |  | GET | `/api/v2/mix/market/long-short-ratio` |
| [getMarginLoanGrowthRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L582) |  | GET | `/api/v2/mix/market/loan-growth` |
| [getIsolatedMarginBorrowingRatio()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L590) |  | GET | `/api/v2/mix/market/isolated-borrow-rate` |
| [getFuturesActiveBuySellVolumeData()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L597) |  | GET | `/api/v2/mix/market/long-short` |
| [getSpotFundFlow()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L604) |  | GET | `/api/v2/spot/market/fund-flow` |
| [getTradeDataSupportSymbols()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L611) |  | GET | `/api/v2/spot/market/support-symbols` |
| [getSpotFundNetFlowData()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L620) |  | GET | `/api/v2/spot/market/fund-net-flow` |
| [getFuturesActiveLongShortAccountData()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L631) |  | GET | `/api/v2/mix/market/account-long-short` |
| [createVirtualSubaccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L644) | :closed_lock_with_key:  | POST | `/api/v2/user/create-virtual-subaccount` |
| [modifyVirtualSubaccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L650) | :closed_lock_with_key:  | POST | `/api/v2/user/modify-virtual-subaccount` |
| [batchCreateVirtualSubaccountAndAPIKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L658) | :closed_lock_with_key:  | POST | `/api/v2/user/batch-create-subaccount-and-apikey` |
| [getVirtualSubaccounts()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L667) | :closed_lock_with_key:  | GET | `/api/v2/user/virtual-subaccount-list` |
| [createVirtualSubaccountAPIKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L680) | :closed_lock_with_key:  | POST | `/api/v2/user/create-virtual-subaccount-apikey` |
| [modifyVirtualSubaccountAPIKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L689) | :closed_lock_with_key:  | POST | `/api/v2/user/modify-virtual-subaccount-apikey` |
| [getVirtualSubaccountAPIKeys()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L698) | :closed_lock_with_key:  | GET | `/api/v2/user/virtual-subaccount-apikey-list` |
| [getFundingAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L712) | :closed_lock_with_key:  | GET | `/api/v2/account/funding-assets` |
| [getBotAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L718) | :closed_lock_with_key:  | GET | `/api/v2/account/bot-assets` |
| [getBalances()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L725) | :closed_lock_with_key:  | GET | `/api/v2/account/all-account-balance` |
| [getConvertCoins()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L742) | :closed_lock_with_key:  | GET | `/api/v2/convert/currencies` |
| [getConvertQuotedPrice()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L746) | :closed_lock_with_key:  | GET | `/api/v2/convert/quoted-price` |
| [convert()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L752) | :closed_lock_with_key:  | POST | `/api/v2/convert/trade` |
| [getConvertHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L758) | :closed_lock_with_key:  | GET | `/api/v2/convert/convert-record` |
| [getConvertBGBCoins()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L773) | :closed_lock_with_key:  | GET | `/api/v2/convert/bgb-convert-coin-list` |
| [convertBGB()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L781) | :closed_lock_with_key:  | POST | `/api/v2/convert/bgb-convert` |
| [getConvertBGBHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L787) | :closed_lock_with_key:  | GET | `/api/v2/convert/bgb-convert-records` |
| [getSpotCoinInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L807) | :closed_lock_with_key:  | GET | `/api/v2/spot/public/coins` |
| [getSpotSymbolInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L813) | :closed_lock_with_key:  | GET | `/api/v2/spot/public/symbols` |
| [getSpotVIPFeeRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L819) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/vip-fee-rate` |
| [getSpotTicker()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L823) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/tickers` |
| [getSpotMergeDepth()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L829) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/merge-depth` |
| [getSpotOrderBookDepth()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L837) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/orderbook` |
| [getSpotCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L845) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/candles` |
| [getSpotHistoricCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L851) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/history-candles` |
| [getSpotRecentTrades()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L857) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/fills` |
| [getSpotHistoricTrades()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L864) | :closed_lock_with_key:  | GET | `/api/v2/spot/market/fills-history` |
| [spotSubmitOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L876) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/place-order` |
| [spotCancelandSubmitOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L885) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-replace-order` |
| [spotBatchCancelandSubmitOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L891) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-cancel-replace-order` |
| [spotCancelOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L900) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-order` |
| [spotBatchSubmitOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L909) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-orders` |
| [spotBatchCancelOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L915) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-cancel-order` |
| [spotCancelSymbolOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L921) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-symbol-order` |
| [getSpotOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L929) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/orderInfo` |
| [getSpotOpenOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L935) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/unfilled-orders` |
| [getSpotHistoricOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L941) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/history-orders` |
| [getSpotFills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L947) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/fills` |
| [spotSubmitPlanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L959) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/place-plan-order` |
| [spotModifyPlanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L968) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/modify-plan-order` |
| [spotCancelPlanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L977) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-plan-order` |
| [getSpotCurrentPlanOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L988) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/current-plan-order` |
| [getSpotPlanSubOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L998) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/plan-sub-order` |
| [getSpotHistoricPlanOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1004) | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/history-plan-order` |
| [spotCancelPlanOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1014) | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-cancel-plan-order` |
| [getSpotAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1029) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/info` |
| [getSpotAccountAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1033) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/assets` |
| [getSpotSubAccountAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1040) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/subaccount-assets` |
| [spotModifyDepositAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1044) | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/modify-deposit-account` |
| [getSpotAccountBills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1054) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/bills` |
| [spotTransfer()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1060) | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/transfer` |
| [getSpotTransferableCoins()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1069) | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/transfer-coin-info` |
| [spotSubTransfer()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1076) | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/subaccount-transfer` |
| [spotWithdraw()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1085) | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/withdrawal` |
| [getSpotMainSubTransferRecord()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1094) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/sub-main-trans-record` |
| [getSpotTransferHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1103) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/transferRecords` |
| [spotSwitchBGBDeduct()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1109) | :closed_lock_with_key:  | POST | `/api/v2/spot/account/switch-deduct` |
| [getSpotDepositAddress()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1115) | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/deposit-address` |
| [getSpotSubDepositAddress()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1123) | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/subaccount-deposit-address` |
| [getSpotBGBDeductInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1135) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/deduct-info` |
| [spotCancelWithdrawal()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1143) | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/cancel-withdrawal` |
| [getSubAccountDepositRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1149) | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/subaccount-deposit-records` |
| [getSpotWithdrawalHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1158) | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/withdrawal-records` |
| [getSpotDepositHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1164) | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/deposit-records` |
| [upgradeToUnifiedAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1179) | :closed_lock_with_key:  | POST | `/api/v2/spot/account/upgrade` |
| [getUnifiedAccountSwitchStatus()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1189) | :closed_lock_with_key:  | GET | `/api/v2/spot/account/upgrade-status` |
| [getFuturesVIPFeeRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1211) |  | GET | `/api/v2/mix/market/vip-fee-rate` |
| [getFuturesInterestRateHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1215) |  | GET | `/api/v2/mix/market/union-interest-rate-history` |
| [getFuturesInterestExchangeRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1224) |  | GET | `/api/v2/mix/market/exchange-rate` |
| [getFuturesDiscountRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1235) |  | GET | `/api/v2/mix/market/discount-rate` |
| [getFuturesMergeDepth()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1239) |  | GET | `/api/v2/mix/market/merge-depth` |
| [getFuturesTicker()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1245) |  | GET | `/api/v2/mix/market/ticker` |
| [getFuturesAllTickers()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1252) |  | GET | `/api/v2/mix/market/tickers` |
| [getFuturesRecentTrades()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1258) |  | GET | `/api/v2/mix/market/fills` |
| [getFuturesHistoricTrades()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1264) |  | GET | `/api/v2/mix/market/fills-history` |
| [getFuturesCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1270) |  | GET | `/api/v2/mix/market/candles` |
| [getFuturesHistoricCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1276) |  | GET | `/api/v2/mix/market/history-candles` |
| [getFuturesHistoricIndexPriceCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1282) |  | GET | `/api/v2/mix/market/history-index-candles` |
| [getFuturesHistoricMarkPriceCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1288) |  | GET | `/api/v2/mix/market/history-mark-candles` |
| [getFuturesOpenInterest()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1294) |  | GET | `/api/v2/mix/market/open-interest` |
| [getFuturesNextFundingTime()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1306) |  | GET | `/api/v2/mix/market/funding-time` |
| [getFuturesSymbolPrice()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1313) |  | GET | `/api/v2/mix/market/symbol-price` |
| [getFuturesHistoricFundingRates()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1320) |  | GET | `/api/v2/mix/market/history-fund-rate` |
| [getFuturesCurrentFundingRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1329) |  | GET | `/api/v2/mix/market/current-fund-rate` |
| [getFuturesContractConfig()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1347) |  | GET | `/api/v2/mix/market/contracts` |
| [getFuturesAccountAsset()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1360) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/account` |
| [getFuturesAccountAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1366) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/accounts` |
| [getFuturesSubAccountAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1372) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/sub-account-assets` |
| [getFuturesInterestHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1385) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/interest-history` |
| [getFuturesOpenCount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1391) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/open-count` |
| [setFuturesPositionAutoMargin()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1399) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-auto-margin` |
| [setFuturesLeverage()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1405) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-leverage` |
| [setFuturesPositionMargin()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1411) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-margin` |
| [setFuturesAssetMode()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1417) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-asset-mode` |
| [setFuturesMarginMode()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1424) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-margin-mode` |
| [setFuturesPositionMode()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1430) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-position-mode` |
| [getFuturesAccountBills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1441) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/bill` |
| [getUnionTransferLimits()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1456) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/transfer-limits` |
| [getUnionConfig()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1468) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/union-config` |
| [getSwitchUnionUsdt()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1478) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/switch-union-usdt` |
| [unionConvert()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1488) | :closed_lock_with_key:  | POST | `/api/v2/mix/account/union-convert` |
| [getFuturesMaxOpenableQuantity()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1500) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/max-open` |
| [getFuturesLiquidationPrice()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1512) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/liq-price` |
| [getFuturesIsolatedSymbols()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1524) | :closed_lock_with_key:  | GET | `/api/v2/mix/account/isolated-symbols` |
| [getFuturesPositionTier()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1536) |  | GET | `/api/v2/mix/market/query-position-lever` |
| [getFuturesPosition()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1543) | :closed_lock_with_key:  | GET | `/api/v2/mix/position/single-position` |
| [getFuturesPositions()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1551) | :closed_lock_with_key:  | GET | `/api/v2/mix/position/all-position` |
| [getFuturesHistoricPositions()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1558) | :closed_lock_with_key:  | GET | `/api/v2/mix/position/history-position` |
| [futuresSubmitOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1575) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/place-order` |
| [futuresSubmitReversal()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1584) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/click-backhand` |
| [futuresBatchSubmitOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1593) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/batch-place-order` |
| [futuresModifyOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1599) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/modify-order` |
| [futuresCancelOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1608) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/cancel-order` |
| [futuresBatchCancelOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1617) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/batch-cancel-orders` |
| [futuresFlashClosePositions()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1623) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/close-positions` |
| [getFuturesOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1629) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/detail` |
| [getFuturesFills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1635) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/fills` |
| [getFuturesHistoricOrderFills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1644) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/fill-history` |
| [getFuturesOpenOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1655) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-pending` |
| [getFuturesHistoricOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1664) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-history` |
| [futuresCancelAllOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1673) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/cancel-all-orders` |
| [getFuturesTriggerSubOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1685) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/plan-sub-order` |
| [futuresSubmitTPSLOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1693) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/place-tpsl-order` |
| [futuresSubmitPlanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1702) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/place-plan-order` |
| [futuresModifyTPSLPOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1711) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/modify-tpsl-order` |
| [futuresModifyPlanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1720) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/modify-plan-order` |
| [getFuturesPlanOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1729) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-plan-pending` |
| [futuresCancelPlanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1738) | :closed_lock_with_key:  | POST | `/api/v2/mix/order/cancel-plan-order` |
| [getFuturesHistoricPlanOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1744) | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-plan-history` |
| [modifySubaccountEmail()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1769) | :closed_lock_with_key:  | POST | `/api/v2/broker/account/modify-subaccount-email` |
| [getBrokerInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1779) | :closed_lock_with_key:  | GET | `/api/v2/broker/account/info` |
| [createSubaccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1789) | :closed_lock_with_key:  | POST | `/api/v2/broker/account/create-subaccount` |
| [getSubaccounts()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1796) | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-list` |
| [modifySubaccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1806) | :closed_lock_with_key:  | POST | `/api/v2/broker/account/modify-subaccount` |
| [getSubaccountEmail()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1812) | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-email` |
| [getSubaccountSpotAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1818) | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-spot-assets` |
| [getSubaccountFuturesAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1833) | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-future-assets` |
| [createSubaccountDepositAddress()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1847) | :closed_lock_with_key:  | POST | `/api/v2/broker/account/subaccount-address` |
| [subaccountWithdrawal()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1858) | :closed_lock_with_key:  | POST | `/api/v2/broker/account/subaccount-withdrawal` |
| [subaccountSetAutoTransfer()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1870) | :closed_lock_with_key:  | POST | `/api/v2/broker/account/set-subaccount-autotransfer` |
| [subaccountDepositRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1886) | :closed_lock_with_key:  | GET | `/api/v2/broker/subaccount-deposit` |
| [subaccountWithdrawalRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1897) | :closed_lock_with_key:  | GET | `/api/v2/broker/subaccount-withdrawal` |
| [createSubaccountApiKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1912) | :closed_lock_with_key:  | POST | `/api/v2/broker/manage/create-subaccount-apikey` |
| [getSubaccountApiKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1921) | :closed_lock_with_key:  | GET | `/api/v2/broker/manage/subaccount-apikey-list` |
| [modifySubaccountApiKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1930) | :closed_lock_with_key:  | POST | `/api/v2/broker/manage/modify-subaccount-apikey` |
| [getAllSubDepositWithdrawalRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1946) | :closed_lock_with_key:  | GET | `/api/v2/broker/all-sub-deposit-withdrawal` |
| [getBrokerSubaccounts()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1963) | :closed_lock_with_key:  | GET | `/api/v2/broker/subaccounts` |
| [getBrokerCommissions()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1975) | :closed_lock_with_key:  | GET | `/api/v2/broker/commissions` |
| [getBrokerTradeVolume()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L1987) | :closed_lock_with_key:  | GET | `/api/v2/broker/trade-volume` |
| [getBrokerTotalCommission()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2007) | :closed_lock_with_key:  | GET | `/api/v2/broker/total-commission` |
| [getBrokerOrderCommission()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2029) | :closed_lock_with_key:  | GET | `/api/v2/broker/order-commission` |
| [getBrokerRebateInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2042) | :closed_lock_with_key:  | GET | `/api/v2/broker/rebate-info` |
| [getMarginCurrencies()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2062) |  | GET | `/api/v2/margin/currencies` |
| [getMarginBorrowHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2072) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/borrow-history` |
| [getMarginRepayHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2089) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/repay-history` |
| [getMarginInterestHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2106) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/interest-history` |
| [getMarginLiquidationHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2123) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/liquidation-history` |
| [getMarginFinancialHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2140) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/financial-records` |
| [getMarginAccountAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2163) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/assets` |
| [marginBorrow()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2174) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/account/borrow` |
| [marginRepay()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2197) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/account/repay` |
| [getMarginRiskRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2222) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/risk-rate` |
| [getMarginMaxBorrowable()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2234) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/max-borrowable-amount` |
| [getMarginMaxTransferable()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2247) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/max-transfer-out-amount` |
| [getMarginInterestRateAndMaxBorrowable()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2262) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/interest-rate-and-limit` |
| [getMarginTierConfiguration()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2278) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/tier-data` |
| [marginFlashRepay()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2290) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/account/flash-repay` |
| [getMarginFlashRepayResult()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2308) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/query-flash-repay-status` |
| [marginSubmitOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2332) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/place-order` |
| [marginBatchSubmitOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2345) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/batch-place-order` |
| [marginCancelOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2356) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/cancel-order` |
| [marginBatchCancelOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2376) | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/batch-cancel-order` |
| [getMarginOpenOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2390) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/open-orders` |
| [getMarginHistoricOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2404) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/history-orders` |
| [getMarginHistoricOrderFills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2421) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/fills` |
| [getMarginLiquidationOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2435) | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/liquidation-order` |
| [getFuturesTraderCurrentOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2467) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/order-current-track` |
| [getFuturesTraderHistoryOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2476) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/order-history-track` |
| [modifyFuturesTraderOrderTPSL()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2485) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/order-modify-tpsl` |
| [getFuturesTraderOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2494) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/order-total-detail` |
| [getFuturesTraderProfitHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2500) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profit-history-summarys` |
| [getFuturesTraderProfitShareHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2506) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profit-history-details` |
| [closeFuturesTraderOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2515) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/order-close-positions` |
| [getFuturesTraderProfitShare()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2534) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profit-details` |
| [getFuturesTraderProfitShareGroup()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2550) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profits-group-coin-date` |
| [getFuturesTraderSymbolSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2568) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/config-query-symbols` |
| [updateFuturesTraderSymbolSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2577) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/config-setting-symbols` |
| [updateFuturesTraderGlobalSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2586) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/config-settings-base` |
| [getFuturesTraderFollowers()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2597) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/config-query-followers` |
| [removeFuturesTraderFollower()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2606) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/config-remove-follower` |
| [getFuturesFollowerCurrentOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2623) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-current-orders` |
| [getFuturesFollowerHistoryOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2632) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-history-orders` |
| [updateFuturesFollowerTPSL()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2641) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/setting-tpsl` |
| [updateFuturesFollowerSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2647) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/settings` |
| [getFuturesFollowerSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2653) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-settings` |
| [closeFuturesFollowerPositions()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2659) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/close-positions` |
| [getFuturesFollowerTraders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2672) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-traders` |
| [getFuturesFollowerFollowLimit()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2678) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-quantity-limit` |
| [unfollowFuturesTrader()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2696) | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/cancel-trader` |
| [getBrokerTraders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2710) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-broker/query-traders` |
| [getBrokerTradersHistoricalOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2714) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-broker/query-history-traces` |
| [getBrokerTradersPendingOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2721) | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-broker/query-current-traces` |
| [getSpotTraderProfit()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2736) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/profit-summarys` |
| [getSpotTraderHistoryProfit()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2740) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/profit-history-details` |
| [getSpotTraderUnrealizedProfit()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2749) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/profit-details` |
| [getSpotTraderOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2757) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/order-total-detail` |
| [modifySpotTraderOrderTPSL()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2761) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/order-modify-tpsl` |
| [getSpotTraderHistoryOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2772) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/order-history-track` |
| [getSpotTraderCurrentOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2781) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/order-current-track` |
| [sellSpotTrader()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2790) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/order-close-tracking` |
| [getSpotTraderSymbolSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2800) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/config-setting-symbols` |
| [removeSpotTraderFollowers()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2810) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/config-remove-follower` |
| [getSpotTraderConfiguration()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2819) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/config-query-settings` |
| [getSpotTraderFollowers()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2823) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/config-query-followers` |
| [cancelSpotFollowerOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2840) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/stop-order` |
| [updateSpotFollowerSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2846) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/settings` |
| [updateSpotFollowerTPSL()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2855) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/setting-tpsl` |
| [getSpotFollowerTraders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2863) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-traders` |
| [getSpotFollowerCurrentTraderSymbols()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2872) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-trader-symbols` |
| [getSpotFollowerSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2883) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-settings` |
| [getSpotFollowerHistoryOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2889) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-history-orders` |
| [getSpotFollowerOpenOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2898) | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-current-orders` |
| [sellSpotFollower()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2907) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/order-close-tracking` |
| [unfollowSpotTrader()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2917) | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/cancel-trader` |
| [getEarnSavingsProducts()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2931) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/product` |
| [getEarnSavingsAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2938) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/account` |
| [getEarnSavingsAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2942) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/assets` |
| [getEarnSavingsRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2948) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/records` |
| [getEarnSavingsSubscription()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2954) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/subscribe-info` |
| [earnSubscribeSavings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2961) | :closed_lock_with_key:  | POST | `/api/v2/earn/savings/subscribe` |
| [getEarnSavingsSubscriptionResult()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2974) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/subscribe-result` |
| [earnRedeemSavings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2986) | :closed_lock_with_key:  | POST | `/api/v2/earn/savings/redeem` |
| [getEarnSavingsRedemptionResult()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L2995) | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/redeem-result` |
| [getEarnAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3015) | :closed_lock_with_key:  | GET | `/api/v2/earn/account/assets` |
| [getSharkfinProducts()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3034) | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/product` |
| [getSharkfinAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3042) | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/account` |
| [getSharkfinAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3046) | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/assets` |
| [getSharkfinRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3052) | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/records` |
| [getSharkfinSubscription()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3058) | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/subscribe-info` |
| [subscribeSharkfin()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3064) | :closed_lock_with_key:  | POST | `/api/v2/earn/sharkfin/subscribe` |
| [getSharkfinSubscriptionResult()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3073) | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/subscribe-result` |
| [getLoanCurrencies()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3090) |  | GET | `/api/v2/earn/loan/public/coinInfos` |
| [getLoanEstInterestAndBorrowable()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3096) |  | GET | `/api/v2/earn/loan/public/hour-interest` |
| [borrowLoan()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3107) | :closed_lock_with_key:  | POST | `/api/v2/earn/loan/borrow` |
| [getOngoingLoanOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3115) | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/ongoing-orders` |
| [repayLoan()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3123) | :closed_lock_with_key:  | POST | `/api/v2/earn/loan/repay` |
| [getRepayHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3129) | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/repay-history` |
| [updateLoanPledgeRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3135) | :closed_lock_with_key:  | POST | `/api/v2/earn/loan/revise-pledge` |
| [getLoanPledgeRateHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3145) | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/revise-history` |
| [getLoanHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3151) | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/borrow-history` |
| [getLoanDebts()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3157) | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/debts` |
| [getLoanLiquidationRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v2.ts#L3161) | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/reduces` |

# rest-client-v3.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [rest-client-v3.ts](/src/rest-client-v3.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getServerTime()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L238) |  | GET | `/api/v3/public/time` |
| [getInstruments()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L255) |  | GET | `/api/v3/market/instruments` |
| [getTickers()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L264) |  | GET | `/api/v3/market/tickers` |
| [getOrderBook()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L271) |  | GET | `/api/v3/market/orderbook` |
| [getFills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L280) |  | GET | `/api/v3/market/fills` |
| [getProofOfReserves()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L289) |  | GET | `/api/v3/market/proof-of-reserves` |
| [getOpenInterest()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L296) |  | GET | `/api/v3/market/open-interest` |
| [getCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L305) |  | GET | `/api/v3/market/candles` |
| [getHistoryCandles()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L314) |  | GET | `/api/v3/market/history-candles` |
| [getCurrentFundingRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L323) |  | GET | `/api/v3/market/current-fund-rate` |
| [getHistoryFundingRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L332) |  | GET | `/api/v3/market/history-fund-rate` |
| [getRiskReserve()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L341) |  | GET | `/api/v3/market/risk-reserve` |
| [getDiscountRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L350) |  | GET | `/api/v3/market/discount-rate` |
| [getMarginLoans()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L357) |  | GET | `/api/v3/market/margin-loans` |
| [getPositionTier()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L366) |  | GET | `/api/v3/market/position-tier` |
| [getContractsOi()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L375) |  | GET | `/api/v3/market/oi-limit` |
| [getBalances()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L390) | :closed_lock_with_key:  | GET | `/api/v3/account/assets` |
| [getFundingAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L397) | :closed_lock_with_key:  | GET | `/api/v3/account/funding-assets` |
| [getAccountSettings()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L406) | :closed_lock_with_key:  | GET | `/api/v3/account/settings` |
| [setLeverage()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L413) | :closed_lock_with_key:  | POST | `/api/v3/account/set-leverage` |
| [setHoldMode()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L420) | :closed_lock_with_key:  | POST | `/api/v3/account/set-hold-mode` |
| [getFinancialRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L429) | :closed_lock_with_key:  | GET | `/api/v3/account/financial-records` |
| [getRepayableCoins()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L441) | :closed_lock_with_key:  | GET | `/api/v3/account/repayable-coins` |
| [getPaymentCoins()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L453) | :closed_lock_with_key:  | GET | `/api/v3/account/payment-coins` |
| [submitRepay()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L465) | :closed_lock_with_key:  | POST | `/api/v3/account/repay` |
| [getConvertRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L472) | :closed_lock_with_key:  | GET | `/api/v3/account/convert-records` |
| [setDepositAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L487) | :closed_lock_with_key:  | POST | `/api/v3/account/deposit-account` |
| [switchDeduct()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L496) | :closed_lock_with_key:  | POST | `/api/v3/account/switch-deduct` |
| [getDeductInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L503) | :closed_lock_with_key:  | GET | `/api/v3/account/deduct-info` |
| [getFeeRate()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L514) | :closed_lock_with_key:  | GET | `/api/v3/account/fee-rate` |
| [getMaxTransferable()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L530) | :closed_lock_with_key:  | GET | `/api/v3/account/max-transferable` |
| [downgradeAccountToClassic()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L545) | :closed_lock_with_key:  | POST | `/api/v3/account/switch` |
| [getUnifiedAccountSwitchStatus()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L553) | :closed_lock_with_key:  | GET | `/api/v3/account/switch-status` |
| [createSubAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L570) | :closed_lock_with_key:  | POST | `/api/v3/user/create-sub` |
| [freezeSubAccount()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L579) | :closed_lock_with_key:  | POST | `/api/v3/user/freeze-sub` |
| [getSubUnifiedAssets()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L588) | :closed_lock_with_key:  | GET | `/api/v3/account/sub-unified-assets` |
| [getSubAccountList()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L597) | :closed_lock_with_key:  | GET | `/api/v3/user/sub-list` |
| [createSubAccountApiKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L610) | :closed_lock_with_key:  | POST | `/api/v3/user/create-sub-api` |
| [updateSubAccountApiKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L619) | :closed_lock_with_key:  | POST | `/api/v3/user/update-sub-api` |
| [deleteSubAccountApiKey()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L628) | :closed_lock_with_key:  | POST | `/api/v3/user/delete-sub-api` |
| [getSubAccountApiKeys()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L637) | :closed_lock_with_key:  | GET | `/api/v3/user/sub-api-list` |
| [getTransferableCoins()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L656) | :closed_lock_with_key:  | GET | `/api/v3/account/transferable-coins` |
| [submitTransfer()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L665) | :closed_lock_with_key:  | POST | `/api/v3/account/transfer` |
| [subAccountTransfer()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L674) | :closed_lock_with_key:  | POST | `/api/v3/account/sub-transfer` |
| [getSubTransferRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L686) | :closed_lock_with_key:  | GET | `/api/v3/account/sub-transfer-record` |
| [getDepositAddress()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L704) | :closed_lock_with_key:  | GET | `/api/v3/account/deposit-address` |
| [getSubDepositAddress()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L713) | :closed_lock_with_key:  | GET | `/api/v3/account/sub-deposit-address` |
| [getDepositRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L722) | :closed_lock_with_key:  | GET | `/api/v3/account/deposit-records` |
| [getSubDepositRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L731) | :closed_lock_with_key:  | POST | `/api/v3/account/sub-deposit-records` |
| [submitWithdraw()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L746) | :closed_lock_with_key:  | POST | `/api/v3/account/withdraw` |
| [getWithdrawRecords()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L755) | :closed_lock_with_key:  | GET | `/api/v3/account/withdrawal-records` |
| [submitNewOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L770) | :closed_lock_with_key:  | POST | `/api/v3/trade/place-order` |
| [modifyOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L779) | :closed_lock_with_key:  | POST | `/api/v3/trade/modify-order` |
| [cancelOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L788) | :closed_lock_with_key:  | POST | `/api/v3/trade/cancel-order` |
| [placeBatchOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L797) | :closed_lock_with_key:  | POST | `/api/v3/trade/place-batch` |
| [batchModifyOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L806) | :closed_lock_with_key:  | POST | `/api/v3/trade/batch-modify-order` |
| [cancelBatchOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L815) | :closed_lock_with_key:  | POST | `/api/v3/trade/cancel-batch` |
| [cancelAllOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L824) | :closed_lock_with_key:  | POST | `/api/v3/trade/cancel-symbol-order` |
| [closeAllPositions()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L833) | :closed_lock_with_key:  | POST | `/api/v3/trade/close-positions` |
| [getOrderInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L842) | :closed_lock_with_key:  | GET | `/api/v3/trade/order-info` |
| [getUnfilledOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L851) | :closed_lock_with_key:  | GET | `/api/v3/trade/unfilled-orders` |
| [getHistoryOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L863) | :closed_lock_with_key:  | GET | `/api/v3/trade/history-orders` |
| [getTradeFills()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L875) | :closed_lock_with_key:  | GET | `/api/v3/trade/fills` |
| [getCurrentPosition()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L887) | :closed_lock_with_key:  | GET | `/api/v3/position/current-position` |
| [getPositionHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L898) | :closed_lock_with_key:  | GET | `/api/v3/position/history-position` |
| [getMaxOpenAvailable()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L910) | :closed_lock_with_key:  | POST | `/api/v3/account/max-open-available` |
| [getPositionAdlRank()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L919) | :closed_lock_with_key:  | GET | `/api/v3/position/adlRank` |
| [countdownCancelAll()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L926) | :closed_lock_with_key:  | POST | `/api/v3/trade/countdown-cancel-all` |
| [getLoanTransfered()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L941) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/transfered` |
| [getLoanSymbols()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L950) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/symbols` |
| [getLoanRiskUnit()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L959) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/risk-unit` |
| [getLoanRepaidHistory()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L970) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/repaid-history` |
| [getLoanProductInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L979) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/product-infos` |
| [getLoanOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L988) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/loan-order` |
| [getLoanLTVConvert()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L997) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/ltv-convert` |
| [getLoanMarginCoinInfo()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1006) | :closed_lock_with_key:  | GET | `/api/v3/ins-loan/ensure-coins-convert` |
| [bindLoanUid()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1018) | :closed_lock_with_key:  | POST | `/api/v3/ins-loan/bind-uid` |
| [submitStrategyOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1033) | :closed_lock_with_key:  | POST | `/api/v3/trade/place-strategy-order` |
| [modifyStrategyOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1042) | :closed_lock_with_key:  | POST | `/api/v3/trade/modify-strategy-order` |
| [cancelStrategyOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1051) | :closed_lock_with_key:  | POST | `/api/v3/trade/cancel-strategy-order` |
| [getUnfilledStrategyOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1060) | :closed_lock_with_key:  | GET | `/api/v3/trade/unfilled-strategy-orders` |
| [getHistoryStrategyOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/rest-client-v3.ts#L1069) | :closed_lock_with_key:  | GET | `/api/v3/trade/history-strategy-orders` |

# websocket-api-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [websocket-api-client.ts](/src/websocket-api-client.ts). 

This client provides WebSocket API endpoints which allow for faster interactions with the Bitget API via a WebSocket connection.

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [submitNewOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/websocket-api-client.ts#L79) |  | WS | `place-order` |
| [placeBatchOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/websocket-api-client.ts#L98) |  | WS | `batch-place` |
| [cancelOrder()](https://github.com/tiagosiebler/bitget-api/blob/master/src/websocket-api-client.ts#L122) |  | WS | `cancel-order` |
| [cancelBatchOrders()](https://github.com/tiagosiebler/bitget-api/blob/master/src/websocket-api-client.ts#L141) |  | WS | `batch-cancel` |