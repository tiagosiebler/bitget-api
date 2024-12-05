import {
  APIResponse,
  MarginType,
  FuturesAccountBillRequestV2,
  FuturesCandlesRequestV2,
  SpotCandlesRequestV2,
  SpotAccountBill,
  SpotHistoricCandlesRequestV2,
  SpotHistoricTradesRequest,
  SpotOrderRequest,
  SpotCancelandSubmitOrderRequest,
  SpotCancelOrderRequest,
  SpotBatchOrderRequest,
  SpotBatchCancelOrderRequest,
  GetSpotOrderInfoRequest,
  GetSpotOpenOrdersRequest,
  GetSpotHistoryOrdersRequest,
  GetSpotFillsRequest,
  SpotPlanOrderRequest,
  SpotModifyPlanOrderRequest,
  GetSpotCurrentPlanOrdersRequest,
  GetSpotHistoryPlanOrdersRequest,
  GetSpotAccountBillsRequest,
  SpotTransferRequest,
  SpotAccountType,
  SpotSubAccountTransferRequest,
  SpotWithdrawalRequest,
  SpotMainSubTransferRecordRequest,
  GetSpotTransferRecordRequest,
  GetSpotSubAccountDepositRecordRequest,
  GetSpotWithdrawalRecordRequest,
  GetSpotDepositRecordRequest,
  FuturesMergeDepthRequestV2,
  FuturesProductTypeV2,
  FuturesRecentTradesRequestV2,
  FuturesHistoricTradesRequestV2,
  FuturesSingleAccountRequestV2,
  FuturesInterestHistoryRequestV2,
  FuturesOpenCountRequestV2,
  FuturesSetAutoMarginRequestV2,
  FuturesSetLeverageRequestV2,
  FuturesSetPositionMarginRequestV2,
  FuturesSetMarginModeRequestV2,
  FuturesHistoricalPositionsRequestV2,
  FuturesPlaceOrderRequestV2,
  FuturesReversalOrderRequestV2,
  FuturesBatchOrderRequestV2,
  FuturesModifyOrderRequestV2,
  FuturesCancelOrderRequestV2,
  FuturesBatchCancelOrderRequestV2,
  FuturesFlashClosePositionsRequestV2,
  FuturesGetOrderRequestV2,
  FuturesGetOrderFillsRequestV2,
  FuturesGetHistoricalFillsRequestV2,
  FuturesGetOpenOrdersRequestV2,
  FuturesGetHistoryOrdersRequestV2,
  FuturesCancelAllOrdersRequestV2,
  FuturesTPSLOrderRequestV2,
  FuturesPlanOrderRequestV2,
  FuturesModifyTPSLOrderRequestV2,
  FuturesModifyPlanOrderRequestV2,
  FuturesGetPlanOrdersRequestV2,
  FuturesCancelPlanOrderRequestV2,
  FuturesGetHistoryPlanOrdersRequestV2,
} from './types';
import {
  ConvertQuoteRequest,
  ConvertRequest,
  CreateVirtualSubApiKeyRequest,
  CreateVirtualSubRequest,
  GetAnnouncementsRequest,
  GetConvertHistoryRequest,
  GetFuturesTransactionsRequest,
  GetMarginTransactionsRequest,
  GetMerchantAdvertisementsRequest,
  GetMerchantP2POrdersRequest,
  GetP2PMerchantsRequest,
  GetP2PTransactionsRequest,
  GetSpotTransactionsRequest,
  GetTradeRateRequest,
  ModifyVirtualSubRequest,
  ModifyVirtualSubApiKeyRequest,
  GetConvertBGBHistoryRequest,
} from './types/request/v2/common';
import { REST_CLIENT_TYPE_ENUM, assertMarginType } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for all V2 endpoints
 */
export class RestClientV2 extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v2;
  }

  /**
   *
   * Custom SDK functions
   *
   */

  /**
   * This method is used to get the latency and time sync between the client and the server.
   * This is not official API endpoint and is only used for internal testing purposes.
   * Use this method to check the latency and time sync between the client and the server.
   * Final values might vary slightly, but it should be within few ms difference.
   * If you have any suggestions or improvements to this measurement, please create an issue or pull request on GitHub.
   */
  async fetchLatencySummary(): Promise<any> {
    const clientTimeReqStart = Date.now();
    const serverTime = await this.getServerTime();
    const clientTimeReqEnd = Date.now();
    console.log('serverTime', serverTime);

    const serverTimeMs = Number(serverTime.data.serverTime);
    const roundTripTime = clientTimeReqEnd - clientTimeReqStart;
    const estimatedOneWayLatency = Math.floor(roundTripTime / 2);

    // Adjust server time by adding estimated one-way latency
    const adjustedServerTime = serverTimeMs + estimatedOneWayLatency;

    // Calculate time difference between adjusted server time and local time
    const timeDifference = adjustedServerTime - clientTimeReqEnd;

    const result = {
      localTime: clientTimeReqEnd,
      serverTime: serverTimeMs,
      roundTripTime,
      estimatedOneWayLatency,
      adjustedServerTime,
      timeDifference,
    };

    console.log('Time synchronization results:');
    console.log(result);

    console.log(
      `Your approximate latency to exchange server: 
      One way: ${estimatedOneWayLatency}ms.
      Round trip: ${roundTripTime}ms.
      `,
    );

    if (timeDifference > 500) {
      console.warn(
        `WARNING! Time difference between server and client clock is greater than 500ms. It is currently ${timeDifference}ms.
        Consider adjusting your system clock to avoid unwanted clock sync errors!
        Visit https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow for more information`,
      );
    } else {
      console.log(
        `Time difference between server and client clock is within acceptable range of 500ms. It is currently ${timeDifference}ms.`,
      );
    }

    return result;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.data);
  }

  /**
   *
   * Bitget misc functions
   *
   */

  /**
   *
   *
   * Common
   *
   *
   */

  /**
   *
   * * Common | Notice
   *
   */

  getAnnouncements(
    params?: GetAnnouncementsRequest,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/public/annoucements`, params);
  }

  /**
   *
   * * Common | Public
   *
   */

  getServerTime(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/public/time`);
  }

  getTradeRate(params: GetTradeRateRequest): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/common/trade-rate`, params);
  }

  /**
   *
   * * Common | Tax
   *
   */

  getSpotTransactionRecords(
    params: GetSpotTransactionsRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/spot-record`, params);
  }

  getFuturesTransactionRecords(
    params: GetFuturesTransactionsRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/future-record`, params);
  }

  getMarginTransactionRecords(
    params: GetMarginTransactionsRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/margin-record`, params);
  }

  getP2PTransactionRecords(
    params: GetP2PTransactionsRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/p2p-record`, params);
  }

  /**
   *
   * * Common | P2P
   *
   */

  getP2PMerchantList(
    params?: GetP2PMerchantsRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/merchantList`, params);
  }

  getP2PMerchantInfo(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/merchantInfo`);
  }

  getP2PMerchantOrders(
    params: GetMerchantP2POrdersRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/orderList`, params);
  }

  getP2PMerchantAdvertisementList(
    params: GetMerchantAdvertisementsRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/advList`, params);
  }

  /**
   *
   * * Common | Trading insights
   *
   */

  getSpotWhaleNetFlowData(params: {
    symbol: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/whale-net-flow`, params);
  }

  getFuturesActiveTakerBuySellVolumeData(params: {
    symbol: string;
    period?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/taker-buy-sell`, params);
  }

  getFuturesActiveLongShortPositionData(params: {
    symbol: string;
    period?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/position-long-short`, params);
  }

  getFuturesLongShortRatio(params: {
    symbol: string;
    period?: string;
    coin?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/long-short-ratio`, params);
  }

  getMarginLoanGrowthRate(params: {
    symbol: string;
    period?: string;
    coin?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/loan-growth`, params);
  }

  getIsolatedMarginBorrowingRatio(params: {
    symbol: string;
    period?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/isolated-borrow-rate`, params);
  }

  getFuturesActiveBuySellVolumeData(params: {
    symbol: string;
    period?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/long-short`, params);
  }

  getSpotFundFlow(params: {
    symbol: string;
    period?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/spot/market/fund-flow`, params);
  }

  getTradeDataSupportSymbols(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/spot/market/support-symbols`);
  }

  getSpotFundNetFlowData(params: {
    symbol: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/spot/market/fund-net-flow`, params);
  }

  getFuturesActiveLongShortAccountData(params: {
    symbol: string;
    period?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/account-long-short`, params);
  }

  /**
   *
   * * Common | Virtual Subaccount
   *
   */

  createVirtualSubaccount(params: {
    subAccountList: string[];
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/user/create-virtual-subaccount`, params);
  }

  modifyVirtualSubaccount(
    params: ModifyVirtualSubRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/user/modify-virtual-subaccount`, params);
  }

  batchCreateVirtualSubaccountAndAPIKey(
    params: CreateVirtualSubRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/user/batch-create-subaccount-and-apikey',
      params,
    );
  }

  getVirtualSubaccounts(params?: {
    limit?: string;
    idLessThan?: string;
    status?: 'normal' | 'freeze';
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/user/virtual-subaccount-list`, params);
  }

  createVirtualSubaccountAPIKey(
    params: CreateVirtualSubApiKeyRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/user/create-virtual-subaccount-apikey',
      params,
    );
  }

  modifyVirtualSubaccountAPIKey(
    params: ModifyVirtualSubApiKeyRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/user/modify-virtual-subaccount-apikey',
      params,
    );
  }

  getVirtualSubaccountAPIKeys(params: {
    subAccountUid: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(
      '/api/v2/user/virtual-subaccount-apikey-list',
      params,
    );
  }

  /**
   *
   * * Common | Assets
   *
   */
  getFundingAssets(params?: { coin?: string }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/account/funding-assets`, params);
  }

  getBotAccount(params?: { accountType?: string }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/account/bot-assets`, params);
  }

  /** Get assets overview */
  getBalances(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/account/all-account-balance`);
  }

  /**
   *
   * * Common | Convert
   *
   */

  getConvertCoins(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/currencies`);
  }

  getConvertQuotedPrice(
    params: ConvertQuoteRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/quoted-price`, params);
  }

  convert(params: ConvertRequest): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/convert/trade`, params);
  }

  getConvertHistory(
    params: GetConvertHistoryRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/convert-record`, params);
  }

  /**
   *
   * * Common | BGB Convert
   *
   */

  getConvertBGBCoins(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/bgb-convert-coin-list`);
  }

  convertBGB(params: { coinList: string }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/convert/bgb-convert`, params);
  }

  getConvertBGBHistory(
    params: GetConvertBGBHistoryRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/bgb-convert-records`, params);
  }

  /**
   *
   *
   * Spot
   *
   *
   */

  /**
   *
   * * Spot | Market
   *
   */

  getSpotCoinInfo(params?: { coin?: string }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/public/coins`, params);
  }

  getSpotSymbolInfo(params?: { symbol?: string }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/public/symbols`, params);
  }

  getSpotVIPFeeRate(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/vip-fee-rate`);
  }

  getSpotTicker(params?: { symbol?: string }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/tickers`, params);
  }

  getSpotMergeDepth(params: {
    symbol: string;
    precision?: string;
    limit?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/merge-depth`, params);
  }

  getSpotOrderBookDepth(params: {
    symbol: string;
    type?: string;
    limit?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/orderbook`, params);
  }

  getSpotCandles(params: SpotCandlesRequestV2): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/candles`, params);
  }

  getSpotHistoricCandles(
    params: SpotHistoricCandlesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/history-candles`, params);
  }

  getSpotRecentTrades(params: {
    symbol: string;
    limit?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/fills`, params);
  }

  getSpotHistoricTrades(
    params: SpotHistoricTradesRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/fills-history`, params);
  }

  /**
   *
   * * Spot | Trade
   *
   */

  spotSubmitOrder(params: SpotOrderRequest): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/place-order`, params);
  }

  spotCancelandSubmitOrder(
    params: SpotCancelandSubmitOrderRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-replace-order`, params);
  }

  spotBatchCancelandSubmitOrder(params: {
    orderList: SpotCancelandSubmitOrderRequest[];
  }): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/spot/trade/batch-cancel-replace-order`,
      params,
    );
  }

  spotCancelOrder(params: SpotCancelOrderRequest): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-order`, params);
  }

  spotBatchSubmitOrders(
    params: SpotBatchOrderRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/batch-orders`, params);
  }

  spotBatchCancelOrders(
    params: SpotBatchCancelOrderRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/batch-cancel-order`, params);
  }

  spotCancelSymbolOrder(params: { symbol: string }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-symbol-order`, params);
  }

  getSpotOrder(params?: GetSpotOrderInfoRequest): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/orderInfo`, params);
  }

  getSpotOpenOrders(
    params?: GetSpotOpenOrdersRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/unfilled-orders`, params);
  }

  getSpotHistoricOrders(
    params?: GetSpotHistoryOrdersRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/history-orders`, params);
  }

  getSpotFills(params: GetSpotFillsRequest): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/fills`, params);
  }

  /**
   *
   * * Spot | Trigger Orders
   *
   */

  spotSubmitPlanOrder(params: SpotPlanOrderRequest): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/place-plan-order`, params);
  }

  spotModifyPlanOrder(
    params: SpotModifyPlanOrderRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/modify-plan-order`, params);
  }

  spotCancelPlanOrder(params: {
    clientOid?: string;
    orderId?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-plan-order`, params);
  }

  getSpotCurrentPlanOrders(
    params: GetSpotCurrentPlanOrdersRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/current-plan-order`, params);
  }

  getSpotPlanSubOrder(params: {
    planOrderId: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/plan-sub-order`, params);
  }

  getSpotHistoricPlanOrders(
    params: GetSpotHistoryPlanOrdersRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/history-plan-order`, params);
  }

  spotCancelPlanOrders(params?: {
    symbolList?: string[];
  }): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/spot/trade/batch-cancel-plan-order',
      params,
    );
  }

  /**
   *
   * * Spot | Account
   *
   */

  getSpotAccount(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/info`);
  }

  getSpotAccountAssets(params?: {
    coin?: string;
    assetType?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/assets`, params);
  }

  getSpotSubAccountAssets(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/subaccount-assets`);
  }

  spotModifyDepositAccount(params: {
    accountType: string;
    coin: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/spot/wallet/modify-deposit-account`,
      params,
    );
  }

  getSpotAccountBills(
    params?: GetSpotAccountBillsRequest,
  ): Promise<APIResponse<SpotAccountBill[]>> {
    return this.getPrivate(`/api/v2/spot/account/bills`, params);
  }

  spotTransfer(params: SpotTransferRequest): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/transfer`, params);
  }

  getSpotTransferableCoins(params: {
    fromType: SpotAccountType;
    toType: SpotAccountType;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/transfer-coin-info`, params);
  }

  spotSubTransfer(
    params: SpotSubAccountTransferRequest,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/subaccount-transfer`, params);
  }

  spotWithdraw(params: SpotWithdrawalRequest): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/withdrawal`, params);
  }

  getSpotMainSubTransferRecord(
    params: SpotMainSubTransferRecordRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/spot/account/sub-main-trans-record`,
      params,
    );
  }

  getSpotTransferHistory(
    params: GetSpotTransferRecordRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/transferRecords`, params);
  }

  spotSwitchBGBDeduct(params: { deduct: boolean }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/account/switch-deduct`, params);
  }

  getSpotDepositAddress(params: {
    coin: string;
    chain?: string;
    size: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/deposit-address`, params);
  }

  getSpotSubDepositAddress(params: {
    subUid: string;
    coin: string;
    chain?: string;
    size: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/spot/wallet/subaccount-deposit-address`,
      params,
    );
  }
  getSpotBGBDeductInfo(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/deduct-info`);
  }

  spotCancelWithdrawal(params: { orderId: string }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/cancel-withdrawal`, params);
  }

  getSubAccountDepositRecords(
    params: GetSpotSubAccountDepositRecordRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/spot/wallet/subaccount-deposit-records`,
      params,
    );
  }

  getSpotDepositHistory(
    params: GetSpotDepositRecordRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/deposit-records`, params);
  }

  getSpotWithdrawalHistory(
    params: GetSpotWithdrawalRecordRequest,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/withdrawal-records`, params);
  }

  /**
   *
   *
   * Futures
   *
   *
   */

  /**
   *
   * * Futures | Market
   *
   */

  getFuturesVIPFeeRate(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/vip-fee-rate`);
  }

  getFuturesInterestRateHistory(params: {
    coin: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/union-interest-rate-history`, params);
  }

  getFuturesTicker(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/ticker`, params);
  }

  getFuturesInterestExchangeRate(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/exchange-rate`);
  }

  getFuturesDiscountRate(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/discount-rate`);
  }

  getFuturesAllTickers(params: {
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/tickers`, params);
  }

  getFuturesMergeDepth(
    params: FuturesMergeDepthRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/merge-depth`, params);
  }

  getFuturesCandles(
    params: FuturesCandlesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/candles`, params);
  }

  getFuturesHistoricCandles(
    params: FuturesCandlesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-candles`, params);
  }

  getFuturesHistoricIndexPriceCandles(
    params: FuturesCandlesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-index-candles`, params);
  }

  getFuturesHistoricMarkPriceCandles(
    params: FuturesCandlesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-mark-candles`, params);
  }

  getFuturesRecentTrades(
    params: FuturesRecentTradesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/fills`, params);
  }

  getFuturesHistoricTrades(
    params: FuturesHistoricTradesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/fills-history`, params);
  }

  getFuturesOpenInterest(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/open-interest`, params);
  }

  getFuturesNextFundingTime(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/funding-time`, params);
  }

  getFuturesSymbolPrice(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/symbol-price`, params);
  }

  getFuturesHistoricFundingRates(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
    pageSize?: string;
    pageNumber?: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-fund-rate`, params);
  }

  getFuturesCurrentFundingRate(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/current-fund-rate`, params);
  }

  getFuturesContractConfig(params: {
    symbol: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/contracts`, params);
  }

  /**
   *
   * * Futures | Account
   *
   */

  getFuturesAccountAsset(
    params: FuturesSingleAccountRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/account`, params);
  }

  getFuturesAccountAssets(params: {
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/accounts`, params);
  }

  getFuturesSubAccountAssets(params: {
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/sub-account-assets`, params);
  }

  getFuturesInterestHistory(
    params: FuturesInterestHistoryRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/interest-history`, params);
  }

  getFuturesOpenCount(
    params: FuturesOpenCountRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/open-count`, params);
  }

  setFuturesLeverage(
    params: FuturesSetLeverageRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-leverage`, params);
  }

  setFuturesPositionAutoMargin(
    params: FuturesSetAutoMarginRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-auto-margin`, params);
  }

  setFuturesPositionMargin(
    params: FuturesSetPositionMarginRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-margin`, params);
  }

  setFuturesAssetMode(params: {
    productType: 'USDT-FUTURES' | 'SUSDT-FUTURES';
    assetMode: 'single' | 'union';
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-asset-mode`, params);
  }

  setFuturesMarginMode(
    params: FuturesSetMarginModeRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-margin-mode`, params);
  }

  setFuturesPositionMode(params: {
    productType: FuturesProductTypeV2;
    posMode: 'one_way_mode' | 'hedge_mode';
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-position-mode`, params);
  }

  getFuturesAccountBills(
    params: FuturesAccountBillRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/bill`, params);
  }

  /**
   *
   * * Futures | Position
   *
   */

  getFuturesPositionTier(params: {
    productType: FuturesProductTypeV2;
    symbol: string;
  }): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/query-position-lever`, params);
  }

  getFuturesPosition(params: {
    productType: FuturesProductTypeV2;
    symbol: string;
    marginCoin: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/position/single-position`, params);
  }

  getFuturesPositions(params: {
    productType: FuturesProductTypeV2;
    marginCoin?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/position/all-position`, params);
  }

  getFuturesHistoricPositions(
    params?: FuturesHistoricalPositionsRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/position/history-position`, params);
  }

  /**
   *
   * * Futures | Trade
   *
   */

  futuresSubmitOrder(
    params: FuturesPlaceOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/place-order`, params);
  }

  futuresCancelOrder(
    params: FuturesCancelOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/cancel-order`, params);
  }

  futuresSubmitReversal(
    params: FuturesReversalOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/click-backhand`, params);
  }

  futuresBatchSubmitOrders(
    params: FuturesBatchOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/batch-place-order`, params);
  }

  futuresModifyOrder(
    params: FuturesModifyOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/modify-order`, params);
  }

  futuresBatchCancelOrders(
    params: FuturesBatchCancelOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/batch-cancel-orders`, params);
  }

  futuresFlashClosePositions(
    params: FuturesFlashClosePositionsRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/close-positions`, params);
  }

  getFuturesOrder(params: FuturesGetOrderRequestV2): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/detail`, params);
  }

  getFuturesFills(
    params: FuturesGetOrderFillsRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/fills`, params);
  }

  getFuturesHistoricOrderFills(
    params: FuturesGetHistoricalFillsRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/fill-history`, params);
  }

  getFuturesOpenOrders(
    params: FuturesGetOpenOrdersRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-pending`, params);
  }

  getFuturesHistoricOrders(
    params: FuturesGetHistoryOrdersRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-history`, params);
  }

  futuresCancelAllOrders(
    params: FuturesCancelAllOrdersRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/cancel-all-orders`, params);
  }

  /**
   *
   * * Futures | Trigger Orders
   *
   */

  futuresSubmitPlanSubOrder(params: {
    planType: 'normal_plan' | 'track_plan';
    planOrderId: string;
    productType: FuturesProductTypeV2;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/plan-sub-order`, params);
  }

  futuresSubmitTPSLOrder(
    params: FuturesTPSLOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/place-tpsl-order`, params);
  }

  futuresSubmitPlanOrder(
    params: FuturesPlanOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/place-plan-order`, params);
  }

  futuresModifyTPSLPOrder(
    params: FuturesModifyTPSLOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/modify-tpsl-order`, params);
  }

  futuresModifyPlanOrder(
    params: FuturesModifyPlanOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/modify-plan-order`, params);
  }

  futuresCancelPlanOrder(
    params: FuturesCancelPlanOrderRequestV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/cancel-plan-order`, params);
  }

  getFuturesPlanOrders(
    params: FuturesGetPlanOrdersRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-plan-pending`, params);
  }

  getFuturesHistoricPlanOrders(
    params: FuturesGetHistoryPlanOrdersRequestV2,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-plan-history`, params);
  }

  /**
   *
   *
   * Broker
   *
   *
   */

  /**
   *
   * * Broker | Subaccount
   *
   */

  modifySubaccountEmail(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/broker/account/modify-subaccount-email`,
      params,
    );
  }

  getBrokerInfo(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/broker/account/info`);
  }

  createSubaccount(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/broker/account/create-subaccount`, params);
  }

  getSubaccounts(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/broker/account/subaccount-list`, params);
  }

  modifySubaccount(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/broker/account/modify-subaccount`, params);
  }

  getSubaccountEmail(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/broker/account/subaccount-email`, params);
  }

  getSubaccountSpotAssets(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/broker/account/subaccount-spot-assets`,
      params,
    );
  }

  getSubaccountFuturesAssets(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/broker/account/subaccount-future-assets`,
      params,
    );
  }

  createSubaccountDepositAddress(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/broker/account/subaccount-address`,
      params,
    );
  }

  subaccountWithdrawal(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/broker/account/subaccount-withdrawal`,
      params,
    );
  }

  subaccountSetAutoTransfer(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/broker/account/set-subaccount-autotransfer`,
      params,
    );
  }

  subaccountDepositRecords(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/broker/subaccount-deposit`, params);
  }

  subaccountWithdrawalRecords(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/broker/subaccount-withdrawal`, params);
  }

  /**
   *
   * * Broker | Subaccount
   *
   */

  createSubaccountApiKey(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/broker/manage/create-subaccount-apikey`,
      params,
    );
  }

  getSubaccountApiKey(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/broker/manage/subaccount-apikey-list`,
      params,
    );
  }

  modifySubaccountApiKey(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/broker/manage/modify-subaccount-apikey`,
      params,
    );
  }

  /**
   *
   *
   * Margin
   *
   *
   */

  /**
   *
   * * Margin | Common
   *
   */

  getMarginCurrencies(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/margin/currencies`);
  }

  /**
   *
   * * Margin | Cross/Isolated | Order Record
   *
   */

  getMarginBorrowHistory(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/borrow-history`,
      params,
    );
  }

  getMarginRepayHistory(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/repay-history`,
      params,
    );
  }

  getMarginInterestHistory(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/interest-history`,
      params,
    );
  }

  getMarginLiquidationHistory(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/liquidation-history`,
      params,
    );
  }

  getMarginFinancialHistory(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/financial-records`,
      params,
    );
  }

  /**
   *
   * * Margin | Cross/Isolated | Account
   *
   */

  getMarginAccountAssets(
    marginType: MarginType,
    params?: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/account/assets`,
      params,
    );
  }

  marginBorrow(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(
      `/api/v2/margin/${marginType}/account/borrow`,
      params,
    );
  }

  marginRepay(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(
      `/api/v2/margin/${marginType}/account/repay`,
      params,
    );
  }

  getMarginRiskRate(marginType: MarginType): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(`/api/v2/margin/${marginType}/account/risk-rate`);
  }

  getMarginMaxBorrowable(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      '/api/v2/margin/${marginType}/account/max-borrowable-amount',
      params,
    );
  }

  getMarginMaxTransferable(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      '/api/v2/margin/${marginType}/account/max-transfer-out-amount',
      params,
    );
  }

  getMarginInterestRateAndMaxBorrowable(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      '/api/v2/margin/${marginType}/interest-rate-and-limit',
      params,
    );
  }

  getMarginTierConfiguration(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(`/api/v2/margin/${marginType}/tier-data`, params);
  }

  marginFlashRepay(
    marginType: MarginType,
    params?: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(
      '/api/v2/margin/${marginType}/account/flash-repay',
      params,
    );
  }

  getMarginFlashRepayResult(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      '/api/v2/margin/${marginType}/account/query-flash-repay-status',
      params,
    );
  }

  /**
   *
   * * Margin | Cross/Isolated | Trade
   *
   */

  marginSubmitOrder(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(`/api/v2/margin/${marginType}/place-order`, params);
  }

  marginBatchSubmitOrders(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(
      `/api/v2/margin/${marginType}/batch-place-order`,
      params,
    );
  }

  marginCancelOrder(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(
      `/api/v2/margin/${marginType}/cancel-order`,
      params,
    );
  }

  marginBatchCancelOrders(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.postPrivate(
      '/api/v2/margin/${marginType}/batch-cancel-order',
      params,
    );
  }

  getMarginOpenOrders(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(`/api/v2/margin/${marginType}/open-orders`, params);
  }

  getMarginHistoricOrders(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/history-orders`,
      params,
    );
  }

  getMarginHistoricOrderFills(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(`/api/v2/margin/${marginType}/fills`, params);
  }

  getMarginLiquidationOrders(
    marginType: MarginType,
    params: object,
  ): Promise<APIResponse<any>> {
    assertMarginType(marginType);
    return this.getPrivate(
      `/api/v2/margin/${marginType}/liquidation-order`,
      params,
    );
  }

  /**
   *
   *
   * Copy Trading
   *
   *
   */

  /**
   *
   *
   * Copy Trading | Future copy trading | Trader Api
   *
   *
   */

  getFuturesTraderCurrentOrder(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-trader/order-current-track`,
      params,
    );
  }

  getFuturesTraderHistoryOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-trader/order-history-track`,
      params,
    );
  }

  modifyFuturesTraderOrderTPSL(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/mix-trader/order-modify-tpsl`,
      params,
    );
  }

  getFuturesTraderOrder(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/mix-trader/order-total-detail`);
  }

  getFuturesTraderProfitHistory(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/mix-trader/profit-history-summarys`);
  }

  getFuturesTraderProfitShareHistory(
    params: object,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-trader/profit-history-details`,
      params,
    );
  }

  closeFuturesTraderOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/mix-trader/order-close-positions`,
      params,
    );
  }

  getFuturesTraderProfitShare(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/mix-trader/profit-details`, params);
  }

  getFuturesTraderProfitShareGroup(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-trader/profits-group-coin-date`,
      params,
    );
  }

  getFuturesTraderSymbolSettings(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-trader/config-query-symbols`,
      params,
    );
  }

  updateFuturesTraderSymbolSettings(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/mix-trader/config-setting-symbols`,
      params,
    );
  }

  updateFuturesTraderGlobalSettings(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/mix-trader/config-settings-base`,
      params,
    );
  }

  getFuturesTraderFollowers(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-trader/config-query-followers`,
      params,
    );
  }

  removeFuturesTraderFollower(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/mix-trader/config-remove-follower`,
      params,
    );
  }

  /**
   *
   *
   * Copy Trading | Future copy trading | Follower Api
   *
   *
   */

  getFuturesFollowerCurrentOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-follower/query-current-orders`,
      params,
    );
  }

  getFuturesFollowerHistoryOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-follower/query-history-orders`,
      params,
    );
  }

  updateFuturesFollowerTPSL(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/mix-follower/setting-tpsl`, params);
  }

  updateFuturesFollowerSettings(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/mix-follower/settings`, params);
  }

  getFuturesFollowerSettings(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/mix-follower/query-settings`, params);
  }

  closeFuturesFollowerPositions(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/mix-follower/close-positions`,
      params,
    );
  }

  getFuturesFollowerTraders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/mix-follower/query-traders`, params);
  }

  getFuturesFollowerFollowLimit(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-follower/query-quantity-limit`,
      params,
    );
  }

  unfollowFuturesTrader(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/mix-follower/cancel-trader`, params);
  }

  /**
   *
   *
   * Copy Trading | Future copy trading | Broker api
   *
   *
   */

  getBrokerTraders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/mix-broker/query-traders`, params);
  }

  getBrokerTradersHistoricalOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-broker/query-history-traces`,
      params,
    );
  }

  getBrokerTradersPendingOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/mix-broker/query-current-traces`,
      params,
    );
  }

  /**
   *
   *
   * Copy Trading | Spot copy trading | Trader api
   *
   *
   */

  getSpotTraderProfit(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/spot-trader/profit-summarys`);
  }

  getSpotTraderHistoryProfit(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-trader/profit-history-details`,
      params,
    );
  }

  getSpotTraderUnrealizedProfit(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/spot-trader/profit-details`, params);
  }

  getSpotTraderOrder(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/spot-trader/order-total-detail`);
  }

  modifySpotTraderOrderTPSL(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/spot-trader/order-modify-tpsl`,
      params,
    );
  }

  getSpotTraderHistoryOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-trader/order-history-track`,
      params,
    );
  }

  getSpotTraderCurrentOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-trader/order-current-track`,
      params,
    );
  }

  sellSpotTrader(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/spot-trader/order-close-tracking`,
      params,
    );
  }

  getSpotTraderSymbolSettings(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/spot-trader/config-setting-symbols`,
      params,
    );
  }

  removeSpotTraderFollowers(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/spot-trader/config-remove-follower`,
      params,
    );
  }

  getSpotTraderConfiguration(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/spot-trader/config-query-settings`);
  }

  getSpotTraderFollowers(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-trader/config-query-followers`,
      params,
    );
  }

  /**
   *
   *
   * Copy Trading | Spot copy trading | Trader api
   *
   *
   */

  cancelSpotFollowerOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/spot-follower/stop-order`, params);
  }

  updateSpotFollowerSettings(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/spot-follower/settings`, params);
  }

  updateSpotFollowerTPSL(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/spot-follower/setting-tpsl`, params);
  }

  getSpotFollowerTraders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/spot-follower/query-traders`, params);
  }

  getSpotFollowerCurrentTraderSymbols(
    params: object,
  ): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-follower/query-trader-symbols`,
      params,
    );
  }

  getSpotFollowerSettings(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/copy/spot-follower/query-settings`, params);
  }

  getSpotFollowerHistoryOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-follower/query-history-orders`,
      params,
    );
  }

  getSpotFollowerOpenOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      `/api/v2/copy/spot-follower/query-current-orders`,
      params,
    );
  }

  sellSpotFollower(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      `/api/v2/copy/spot-follower/order-close-tracking`,
      params,
    );
  }

  unfollowSpotTrader(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/copy/spot-follower/cancel-trader`, params);
  }

  /**
   *
   *
   * Earn | Savings
   *
   *
   */

  getEarnSavingsProducts(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/product`, params);
  }

  getEarnSavingsAccount(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/account`);
  }

  getEarnSavingsAssets(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/assets`, params);
  }

  getEarnSavingsRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/records`, params);
  }

  getEarnSavingsSubscription(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/subscribe-info`, params);
  }

  earnSubscribeSavings(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/earn/savings/subscribe`, params);
  }

  getEarnSavingsSubscriptionResult(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/subscribe-result`, params);
  }

  getEarnSavingsRedemptionResult(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/savings/redeem-result`, params);
  }

  /**
   *
   *
   * Earn | Earn Account
   *
   *
   */

  getEarnAccount(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/account/assets`, params);
  }

  /**
   *
   *
   * Earn | Shark Fin
   *
   *
   */

  getSharkfinProducts(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/sharkfin/product`, params);
  }

  getSharkfinAccount(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/sharkfin/account`);
  }

  getSharkfinAssets(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/sharkfin/assets`, params);
  }

  getSharkfinRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/sharkfin/records`, params);
  }

  getSharkfinSubscription(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/sharkfin/subscribe-info`, params);
  }

  subscribeSharkfin(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/earn/sharkfin/subscribe`, params);
  }

  getSharkfinSubscriptionResult(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/sharkfin/subscribe-result`, params);
  }

  /**
   *
   *
   * Earn | Loan
   *
   *
   */

  getLoanCurrencies(params?: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/earn/loan/public/coinInfos`, params);
  }

  getLoanEstInterestAndBorrowable(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/earn/loan/public/hour-interest`, params);
  }

  borrowLoan(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/earn/loan/borrow`, params);
  }

  getOngoingLoanOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/loan/ongoing-orders`, params);
  }

  repayLoan(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/earn/loan/repay`, params);
  }

  getRepayHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/loan/repay-history`, params);
  }

  updateLoanPledgeRate(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/earn/loan/revise-pledge`, params);
  }

  getLoanPledgeRateHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/loan/revise-history`, params);
  }

  getLoanHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/loan/borrow-history`, params);
  }

  getLoanDebts(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/loan/debts`, params);
  }

  getLoanLiquidationRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/earn/loan/reduces`, params);
  }
}
