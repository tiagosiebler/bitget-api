
# Endpoint maps

[![connector logo](https://github.com/tiagosiebler/bitget-api/blob/master/docs/images/logo1.png?raw=true)][1]

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [rest-client-v2](#rest-client-v2ts)


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
| `fetchServerTime()` |  | GET | `/api/v2/public/annoucements` |
| `getAnnouncements()` |  | GET | `/api/v2/public/annoucements` |
| `getServerTime()` |  | GET | `/api/v2/public/time` |
| `getTradeRate()` | :closed_lock_with_key:  | GET | `/api/v2/common/trade-rate` |
| `getSpotTransactionRecords()` | :closed_lock_with_key:  | GET | `/api/v2/tax/spot-record` |
| `getFuturesTransactionRecords()` | :closed_lock_with_key:  | GET | `/api/v2/tax/future-record` |
| `getMarginTransactionRecords()` | :closed_lock_with_key:  | GET | `/api/v2/tax/margin-record` |
| `getP2PTransactionRecords()` | :closed_lock_with_key:  | GET | `/api/v2/tax/p2p-record` |
| `getP2PMerchantList()` | :closed_lock_with_key:  | GET | `/api/v2/p2p/merchantList` |
| `getP2PMerchantInfo()` | :closed_lock_with_key:  | GET | `/api/v2/p2p/merchantInfo` |
| `getP2PMerchantOrders()` | :closed_lock_with_key:  | GET | `/api/v2/p2p/orderList` |
| `getP2PMerchantAdvertisementList()` | :closed_lock_with_key:  | GET | `/api/v2/p2p/advList` |
| `getSpotWhaleNetFlowData()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/whale-net-flow` |
| `getFuturesActiveTakerBuySellVolumeData()` |  | GET | `/api/v2/mix/market/taker-buy-sell` |
| `getFuturesActiveLongShortPositionData()` |  | GET | `/api/v2/mix/market/position-long-short` |
| `getFuturesLongShortRatio()` |  | GET | `/api/v2/mix/market/long-short-ratio` |
| `getMarginLoanGrowthRate()` |  | GET | `/api/v2/mix/market/loan-growth` |
| `getIsolatedMarginBorrowingRatio()` |  | GET | `/api/v2/mix/market/isolated-borrow-rate` |
| `getFuturesActiveBuySellVolumeData()` |  | GET | `/api/v2/mix/market/long-short` |
| `getSpotFundFlow()` |  | GET | `/api/v2/spot/market/fund-flow` |
| `getTradeDataSupportSymbols()` |  | GET | `/api/v2/spot/market/support-symbols` |
| `getSpotFundNetFlowData()` |  | GET | `/api/v2/spot/market/fund-net-flow` |
| `getFuturesActiveLongShortAccountData()` |  | GET | `/api/v2/mix/market/account-long-short` |
| `createVirtualSubaccount()` | :closed_lock_with_key:  | POST | `/api/v2/user/create-virtual-subaccount` |
| `modifyVirtualSubaccount()` | :closed_lock_with_key:  | POST | `/api/v2/user/modify-virtual-subaccount` |
| `batchCreateVirtualSubaccountAndAPIKey()` | :closed_lock_with_key:  | POST | `/api/v2/user/batch-create-subaccount-and-apikey` |
| `getVirtualSubaccounts()` | :closed_lock_with_key:  | GET | `/api/v2/user/virtual-subaccount-list` |
| `createVirtualSubaccountAPIKey()` | :closed_lock_with_key:  | POST | `/api/v2/user/create-virtual-subaccount-apikey` |
| `modifyVirtualSubaccountAPIKey()` | :closed_lock_with_key:  | POST | `/api/v2/user/modify-virtual-subaccount-apikey` |
| `getVirtualSubaccountAPIKeys()` | :closed_lock_with_key:  | GET | `/api/v2/user/virtual-subaccount-apikey-list` |
| `getFundingAssets()` | :closed_lock_with_key:  | GET | `/api/v2/account/funding-assets` |
| `getBotAccount()` | :closed_lock_with_key:  | GET | `/api/v2/account/bot-assets` |
| `getBalances()` | :closed_lock_with_key:  | GET | `/api/v2/account/all-account-balance` |
| `getConvertCoins()` | :closed_lock_with_key:  | GET | `/api/v2/convert/currencies` |
| `getConvertQuotedPrice()` | :closed_lock_with_key:  | GET | `/api/v2/convert/quoted-price` |
| `convert()` | :closed_lock_with_key:  | POST | `/api/v2/convert/trade` |
| `getConvertHistory()` | :closed_lock_with_key:  | GET | `/api/v2/convert/convert-record` |
| `getConvertBGBCoins()` | :closed_lock_with_key:  | GET | `/api/v2/convert/bgb-convert-coin-list` |
| `convertBGB()` | :closed_lock_with_key:  | POST | `/api/v2/convert/bgb-convert` |
| `getConvertBGBHistory()` | :closed_lock_with_key:  | GET | `/api/v2/convert/bgb-convert-records` |
| `getSpotCoinInfo()` | :closed_lock_with_key:  | GET | `/api/v2/spot/public/coins` |
| `getSpotSymbolInfo()` | :closed_lock_with_key:  | GET | `/api/v2/spot/public/symbols` |
| `getSpotVIPFeeRate()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/vip-fee-rate` |
| `getSpotTicker()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/tickers` |
| `getSpotMergeDepth()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/merge-depth` |
| `getSpotOrderBookDepth()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/orderbook` |
| `getSpotCandles()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/candles` |
| `getSpotHistoricCandles()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/history-candles` |
| `getSpotRecentTrades()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/fills` |
| `getSpotHistoricTrades()` | :closed_lock_with_key:  | GET | `/api/v2/spot/market/fills-history` |
| `spotSubmitOrder()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/place-order` |
| `spotCancelOrder()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-order` |
| `spotBatchSubmitOrders()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-orders` |
| `spotBatchCancelOrders()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-cancel-order` |
| `spotCancelSymbolOrder()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-symbol-order` |
| `getSpotOrder()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/orderInfo` |
| `getSpotOpenOrders()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/unfilled-orders` |
| `getSpotHistoricOrders()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/history-orders` |
| `getSpotFills()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/fills` |
| `spotSubmitPlanOrder()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/place-plan-order` |
| `spotModifyPlanOrder()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/modify-plan-order` |
| `spotCancelPlanOrder()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/cancel-plan-order` |
| `getSpotCurrentPlanOrders()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/current-plan-order` |
| `getSpotPlanSubOrder()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/plan-sub-order` |
| `getSpotHistoricPlanOrders()` | :closed_lock_with_key:  | GET | `/api/v2/spot/trade/history-plan-order` |
| `spotCancelPlanOrders()` | :closed_lock_with_key:  | POST | `/api/v2/spot/trade/batch-cancel-plan-order` |
| `getSpotAccount()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/info` |
| `getSpotAccountAssets()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/assets` |
| `getSpotSubAccountAssets()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/subaccount-assets` |
| `spotModifyDepositAccount()` | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/modify-deposit-account` |
| `getSpotAccountBills()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/bills` |
| `spotTransfer()` | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/transfer` |
| `getSpotTransferableCoins()` | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/transfer-coin-info` |
| `spotSubTransfer()` | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/subaccount-transfer` |
| `getSpotTransferHistory()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/transferRecords` |
| `spotSwitchBGBDeduct()` | :closed_lock_with_key:  | POST | `/api/v2/spot/account/switch-deduct` |
| `spotWithdraw()` | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/withdrawal` |
| `getSpotDepositAddress()` | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/deposit-address` |
| `getSpotSubDepositAddress()` | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/subaccount-deposit-address` |
| `getSpotDepositHistory()` | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/deposit-records` |
| `getSpotBGBDeductInfo()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/deduct-info` |
| `spotCancelWithdrawal()` | :closed_lock_with_key:  | POST | `/api/v2/spot/wallet/cancel-withdrawal` |
| `getSpotWithdrawalHistory()` | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/withdrawal-records` |
| `getSpotMainSubTransferRecord()` | :closed_lock_with_key:  | GET | `/api/v2/spot/account/sub-main-trans-record` |
| `getSubAccountDepositRecords()` | :closed_lock_with_key:  | GET | `/api/v2/spot/wallet/subaccount-deposit-records` |
| `getFuturesVIPFeeRate()` |  | GET | `/api/v2/mix/market/vip-fee-rate` |
| `getFuturesTicker()` |  | GET | `/api/v2/mix/market/ticker` |
| `getFuturesAllTickers()` |  | GET | `/api/v2/mix/market/tickers` |
| `getFuturesMergeDepth()` |  | GET | `/api/v2/mix/market/merge-depth` |
| `getFuturesCandles()` |  | GET | `/api/v2/mix/market/candles` |
| `getFuturesHistoricCandles()` |  | GET | `/api/v2/mix/market/history-candles` |
| `getFuturesHistoricIndexPriceCandles()` |  | GET | `/api/v2/mix/market/history-index-candles` |
| `getFuturesHistoricMarkPriceCandles()` |  | GET | `/api/v2/mix/market/history-mark-candles` |
| `getFuturesRecentTrades()` |  | GET | `/api/v2/mix/market/fills` |
| `getFuturesHistoricTrades()` |  | GET | `/api/v2/mix/market/fills-history` |
| `getFuturesOpenInterest()` |  | GET | `/api/v2/mix/market/open-interest` |
| `getFuturesNextFundingTime()` |  | GET | `/api/v2/mix/market/funding-time` |
| `getFuturesSymbolPrice()` |  | GET | `/api/v2/mix/market/symbol-price` |
| `getFuturesHistoricFundingRates()` |  | GET | `/api/v2/mix/market/history-fund-rate` |
| `getFuturesCurrentFundingRate()` |  | GET | `/api/v2/mix/market/current-fund-rate` |
| `getFuturesContractConfig()` |  | GET | `/api/v2/mix/market/contracts` |
| `getFuturesAccountAsset()` | :closed_lock_with_key:  | GET | `/api/v2/mix/account/account` |
| `getFuturesAccountAssets()` | :closed_lock_with_key:  | GET | `/api/v2/mix/account/accounts` |
| `getFuturesSubAccountAssets()` | :closed_lock_with_key:  | GET | `/api/v2/mix/account/sub-account-assets` |
| `getFuturesOpenCount()` | :closed_lock_with_key:  | GET | `/api/v2/mix/account/open-count` |
| `setFuturesLeverage()` | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-leverage` |
| `setFuturesPositionAutoMargin()` | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-auto-margin` |
| `setFuturesPositionMargin()` | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-margin` |
| `setFuturesMarginMode()` | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-margin-mode` |
| `setFuturesPositionMode()` | :closed_lock_with_key:  | POST | `/api/v2/mix/account/set-position-mode` |
| `getFuturesAccountBills()` | :closed_lock_with_key:  | GET | `/api/v2/mix/account/bill` |
| `getFuturesPositionTier()` |  | GET | `/api/v2/mix/market/query-position-lever` |
| `getFuturesPosition()` | :closed_lock_with_key:  | GET | `/api/v2/mix/position/single-position` |
| `getFuturesPositions()` | :closed_lock_with_key:  | GET | `/api/v2/mix/position/all-position` |
| `getFuturesHistoricPositions()` | :closed_lock_with_key:  | GET | `/api/v2/mix/position/history-position` |
| `futuresSubmitOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/place-order` |
| `futuresCancelOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/cancel-order` |
| `futuresSubmitReversal()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/click-backhand` |
| `futuresBatchSubmitOrders()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/batch-place-order` |
| `futuresModifyOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/modify-order` |
| `futuresBatchCancelOrders()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/batch-cancel-orders` |
| `futuresFlashClosePositions()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/close-positions` |
| `getFuturesOrder()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/detail` |
| `getFuturesFills()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/fills` |
| `getFuturesHistoricOrderFills()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/fill-history` |
| `getFuturesOpenOrders()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-pending` |
| `getFuturesHistoricOrders()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-history` |
| `futuresCancelAllOrders()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/cancel-all-orders` |
| `futuresSubmitPlanSubOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/plan-sub-order` |
| `futuresSubmitTPSLOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/place-tpsl-order` |
| `futuresSubmitPlanOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/place-plan-order` |
| `futuresModifyTPSLPOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/modify-tpsl-order` |
| `futuresModifyPlanOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/modify-plan-order` |
| `futuresCancelPlanOrder()` | :closed_lock_with_key:  | POST | `/api/v2/mix/order/cancel-plan-order` |
| `getFuturesPlanOrders()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-plan-pending` |
| `getFuturesHistoricPlanOrders()` | :closed_lock_with_key:  | GET | `/api/v2/mix/order/orders-plan-history` |
| `modifySubaccountEmail()` | :closed_lock_with_key:  | POST | `/api/v2/broker/account/modify-subaccount-email` |
| `getBrokerInfo()` | :closed_lock_with_key:  | GET | `/api/v2/broker/account/info` |
| `createSubaccount()` | :closed_lock_with_key:  | POST | `/api/v2/broker/account/create-subaccount` |
| `getSubaccounts()` | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-list` |
| `modifySubaccount()` | :closed_lock_with_key:  | POST | `/api/v2/broker/account/modify-subaccount` |
| `getSubaccountEmail()` | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-email` |
| `getSubaccountSpotAssets()` | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-spot-assets` |
| `getSubaccountFuturesAssets()` | :closed_lock_with_key:  | GET | `/api/v2/broker/account/subaccount-future-assets` |
| `createSubaccountDepositAddress()` | :closed_lock_with_key:  | POST | `/api/v2/broker/account/subaccount-address` |
| `subaccountWithdrawal()` | :closed_lock_with_key:  | POST | `/api/v2/broker/account/subaccount-withdrawal` |
| `subaccountSetAutoTransfer()` | :closed_lock_with_key:  | POST | `/api/v2/broker/account/set-subaccount-autotransfer` |
| `subaccountDepositRecords()` | :closed_lock_with_key:  | POST | `/api/v2/broker/subaccount-deposit` |
| `subaccountWithdrawalRecords()` | :closed_lock_with_key:  | POST | `/api/v2/broker/subaccount-withdrawal` |
| `createSubaccountApiKey()` | :closed_lock_with_key:  | POST | `/api/v2/broker/manage/create-subaccount-apikey` |
| `getSubaccountApiKey()` | :closed_lock_with_key:  | GET | `/api/v2/broker/manage/subaccount-apikey-list` |
| `modifySubaccountApiKey()` | :closed_lock_with_key:  | POST | `/api/v2/broker/manage/modify-subaccount-apikey` |
| `getMarginCurrencies()` |  | GET | `/api/v2/margin/currencies` |
| `getMarginBorrowHistory()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/borrow-history` |
| `getMarginRepayHistory()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/repay-history` |
| `getMarginInterestHistory()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/interest-history` |
| `getMarginLiquidationHistory()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/liquidation-history` |
| `getMarginFinancialHistory()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/financial-records` |
| `getMarginAccountAssets()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/assets` |
| `marginBorrow()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/account/borrow` |
| `marginRepay()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/account/repay` |
| `getMarginRiskRate()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/risk-rate` |
| `getMarginMaxBorrowable()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/max-borrowable-amount` |
| `getMarginMaxTransferable()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/max-transfer-out-amount` |
| `getMarginInterestRateAndMaxBorrowable()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/interest-rate-and-limit` |
| `getMarginTierConfiguration()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/tier-data` |
| `marginFlashRepay()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/account/flash-repay` |
| `getMarginFlashRepayResult()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/account/query-flash-repay-status` |
| `marginSubmitOrder()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/place-order` |
| `marginBatchSubmitOrders()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/batch-place-order` |
| `marginCancelOrder()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/cancel-order` |
| `marginBatchCancelOrders()` | :closed_lock_with_key:  | POST | `/api/v2/margin/${marginType}/batch-cancel-order` |
| `getMarginOpenOrders()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/open-orders` |
| `getMarginHistoricOrders()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/history-orders` |
| `getMarginHistoricOrderFills()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/fills` |
| `getMarginLiquidationOrders()` | :closed_lock_with_key:  | GET | `/api/v2/margin/${marginType}/liquidation-order` |
| `getFuturesTraderCurrentOrder()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/order-current-track` |
| `getFuturesTraderHistoryOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/order-history-track` |
| `modifyFuturesTraderOrderTPSL()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/order-modify-tpsl` |
| `getFuturesTraderOrder()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/order-total-detail` |
| `getFuturesTraderProfitHistory()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profit-history-summarys` |
| `getFuturesTraderProfitShareHistory()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profit-history-details` |
| `closeFuturesTraderOrder()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/order-close-positions` |
| `getFuturesTraderProfitShare()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profit-details` |
| `getFuturesTraderProfitShareGroup()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/profits-group-coin-date` |
| `getFuturesTraderSymbolSettings()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/config-query-symbols` |
| `updateFuturesTraderSymbolSettings()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/config-setting-symbols` |
| `updateFuturesTraderGlobalSettings()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/config-settings-base` |
| `getFuturesTraderFollowers()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-trader/config-query-followers` |
| `removeFuturesTraderFollower()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-trader/config-remove-follower` |
| `getFuturesFollowerCurrentOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-current-orders` |
| `getFuturesFollowerHistoryOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-history-orders` |
| `updateFuturesFollowerTPSL()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/setting-tpsl` |
| `updateFuturesFollowerSettings()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/settings` |
| `getFuturesFollowerSettings()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-settings` |
| `closeFuturesFollowerPositions()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/close-positions` |
| `getFuturesFollowerTraders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-traders` |
| `getFuturesFollowerFollowLimit()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-follower/query-quantity-limit` |
| `unfollowFuturesTrader()` | :closed_lock_with_key:  | POST | `/api/v2/copy/mix-follower/cancel-trader` |
| `getBrokerTraders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-broker/query-traders` |
| `getBrokerTradersHistoricalOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-broker/query-history-traces` |
| `getBrokerTradersPendingOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/mix-broker/query-current-traces` |
| `getSpotTraderProfit()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/profit-summarys` |
| `getSpotTraderHistoryProfit()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/profit-history-details` |
| `getSpotTraderUnrealizedProfit()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/profit-details` |
| `getSpotTraderOrder()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/order-total-detail` |
| `modifySpotTraderOrderTPSL()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/order-modify-tpsl` |
| `getSpotTraderHistoryOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/order-history-track` |
| `getSpotTraderCurrentOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/order-current-track` |
| `sellSpotTrader()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/order-close-tracking` |
| `getSpotTraderSymbolSettings()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/config-setting-symbols` |
| `removeSpotTraderFollowers()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-trader/config-remove-follower` |
| `getSpotTraderConfiguration()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/config-query-settings` |
| `getSpotTraderFollowers()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-trader/config-query-followers` |
| `cancelSpotFollowerOrder()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/stop-order` |
| `updateSpotFollowerSettings()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/settings` |
| `updateSpotFollowerTPSL()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/setting-tpsl` |
| `getSpotFollowerTraders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-traders` |
| `getSpotFollowerCurrentTraderSymbols()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-trader-symbols` |
| `getSpotFollowerSettings()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-settings` |
| `getSpotFollowerHistoryOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-history-orders` |
| `getSpotFollowerOpenOrders()` | :closed_lock_with_key:  | GET | `/api/v2/copy/spot-follower/query-current-orders` |
| `sellSpotFollower()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/order-close-tracking` |
| `unfollowSpotTrader()` | :closed_lock_with_key:  | POST | `/api/v2/copy/spot-follower/cancel-trader` |
| `getEarnSavingsProducts()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/product` |
| `getEarnSavingsAccount()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/account` |
| `getEarnSavingsAssets()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/assets` |
| `getEarnSavingsRecords()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/records` |
| `getEarnSavingsSubscription()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/subscribe-info` |
| `earnSubscribeSavings()` | :closed_lock_with_key:  | POST | `/api/v2/earn/savings/subscribe` |
| `getEarnSavingsSubscriptionResult()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/subscribe-result` |
| `getEarnSavingsRedemptionResult()` | :closed_lock_with_key:  | GET | `/api/v2/earn/savings/redeem-result` |
| `getEarnAccount()` | :closed_lock_with_key:  | GET | `/api/v2/earn/account/assets` |
| `getSharkfinProducts()` | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/product` |
| `getSharkfinAccount()` | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/account` |
| `getSharkfinAssets()` | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/assets` |
| `getSharkfinRecords()` | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/records` |
| `getSharkfinSubscription()` | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/subscribe-info` |
| `subscribeSharkfin()` | :closed_lock_with_key:  | POST | `/api/v2/earn/sharkfin/subscribe` |
| `getSharkfinSubscriptionResult()` | :closed_lock_with_key:  | GET | `/api/v2/earn/sharkfin/subscribe-result` |
| `getLoanCurrencies()` |  | GET | `/api/v2/earn/loan/public/coinInfos` |
| `getLoanEstInterestAndBorrowable()` |  | GET | `/api/v2/earn/loan/public/hour-interest` |
| `borrowLoan()` | :closed_lock_with_key:  | POST | `/api/v2/earn/loan/borrow` |
| `getOngoingLoanOrders()` | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/ongoing-orders` |
| `repayLoan()` | :closed_lock_with_key:  | POST | `/api/v2/earn/loan/repay` |
| `getRepayHistory()` | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/repay-history` |
| `updateLoanPledgeRate()` | :closed_lock_with_key:  | POST | `/api/v2/earn/loan/revise-pledge` |
| `getLoanPledgeRateHistory()` | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/revise-history` |
| `getLoanHistory()` | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/borrow-history` |
| `getLoanDebts()` | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/debts` |
| `getLoanLiquidationRecords()` | :closed_lock_with_key:  | GET | `/api/v2/earn/loan/reduces` |