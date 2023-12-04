import {
  APIResponse,
  MarginType,
  FuturesAccountBillRequestV2,
  FuturesCandlesRequestV2,
  SpotCandlesRequestV2,
} from './types';
import { REST_CLIENT_TYPE_ENUM, assertMarginType } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for all V2 endpoints
 */
export class RestClientV2 extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v2;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.data);
  }

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

  getAnnouncements(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/public/annoucements`);
  }

  /**
   *
   * * Common | Public
   *
   */

  getServerTime(): Promise<APIResponse<any>> {
    return this.get(`/api/v2/public/time`);
  }

  getTradeRate(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/common/trade-rate`, params);
  }

  /**
   *
   * * Common | Tax
   *
   */

  getSpotTransactionRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/spot-record`, params);
  }

  getFuturesTransactionRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/future-record`, params);
  }

  getMarginTransactionRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/margin-record`, params);
  }

  getP2PTransactionRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/tax/p2p-record`, params);
  }

  /**
   *
   * * Common | P2P
   *
   */

  getP2PMerchantList(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/merchantList`, params);
  }

  getP2PMerchantInfo(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/merchantInfo`);
  }

  getP2PMerchantOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/orderList`, params);
  }

  getP2PMerchantAdvertisementList(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/p2p/advList`, params);
  }

  /**
   *
   * * Common | Virtual Subaccount
   *
   */

  createVirtualSubaccount(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/user/create-virtual-subaccount`, params);
  }

  modifyVirtualSubaccount(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/user/modify-virtual-subaccount`, params);
  }

  batchCreateVirtualSubaccountAndAPIKey(
    params: object,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/user/batch-create-subaccount-and-apikey',
      params,
    );
  }

  getVirtualSubaccounts(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/user/virtual-subaccount-list`, params);
  }

  createVirtualSubaccountAPIKey(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/user/create-virtual-subaccount-apikey',
      params,
    );
  }

  modifyVirtualSubaccountAPIKey(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/v2/user/modify-virtual-subaccount-apikey',
      params,
    );
  }

  getVirtualSubaccountAPIKeys(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(
      '/api/v2/user/virtual-subaccount-apikey-list',
      params,
    );
  }

  /**
   *
   * * Common | Convert
   *
   */

  getConvertCoins(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/currencies`);
  }

  getConvertQuotedPrice(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/quoted-price`, params);
  }

  convert(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/convert/trade`, params);
  }

  getConvertHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/convert/convert-record`, params);
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

  getSpotCoinInfo(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/public/coins`, params);
  }

  getSpotSymbolInfo(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/public/symbols`, params);
  }

  getSpotVIPFeeRate(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/vip-fee-rate`);
  }

  getSpotTicker(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/tickers`, params);
  }

  getSpotMergeDepth(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/merge-depth`, params);
  }

  getSpotOrderBookDepth(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/orderbook`, params);
  }

  getSpotCandles(params: SpotCandlesRequestV2): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/candles`, params);
  }

  getSpotHistoricCandles(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/history-candles`, params);
  }

  getSpotRecentTrades(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/fills`, params);
  }

  getSpotHistoricTrades(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/market/fills-history`, params);
  }

  /**
   *
   * * Spot | Trade
   *
   */

  spotSubmitOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/place-order`, params);
  }

  spotCancelOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-order`, params);
  }

  spotBatchSubmitOrders(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/batch-orders`, params);
  }

  spotBatchCancelOrders(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/batch-cancel-order`, params);
  }

  spotCancelSymbolOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-symbol-order`, params);
  }

  getSpotOrder(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/orderInfo`, params);
  }

  getSpotOpenOrders(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/unfilled-orders`, params);
  }

  getSpotHistoricOrders(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/history-orders`, params);
  }

  getSpotFills(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/fills`, params);
  }

  /**
   *
   * * Spot | Trigger Orders
   *
   */

  spotSubmitPlanOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/place-plan-order`, params);
  }

  spotModifyPlanOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/modify-plan-order`, params);
  }

  spotCancelPlanOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/trade/cancel-plan-order`, params);
  }

  getSpotCurrentPlanOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/current-plan-order`, params);
  }

  getSpotHistoricPlanOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/trade/history-plan-order`, params);
  }

  spotCancelPlanOrders(params?: object): Promise<APIResponse<any>> {
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

  getSpotAccountAssets(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/assets`, params);
  }

  getSpotSubAccountAssets(): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/subaccount-assets`);
  }

  getSpotAccountBills(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/bills`, params);
  }

  spotTransfer(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/transfer`, params);
  }

  spotSubTransfer(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/subaccount-transfer`, params);
  }

  getSpotTransferHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/transferRecords`, params);
  }

  spotWithdraw(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/spot/wallet/withdrawal`, params);
  }

  getSpotDepositAddress(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/deposit-address`, params);
  }

  getSpotDepositHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/deposit-records`, params);
  }

  getSpotWithdrawalHistory(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/withdrawal-records`, params);
  }

  getSpotMainSubTransferRecord(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/account/sub-main-trans-record`,params);
  }

  getSubAccountDepositRecords(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/spot/wallet/subaccount-deposit-records`,params);
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

  getFuturesTicker(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/ticker`, params);
  }

  getFuturesAllTickers(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/tickers`, params);
  }

  getFuturesMergeDepth(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/merge-depth`, params);
  }

  getFuturesCandles(
    params: FuturesCandlesRequestV2,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/candles`, params);
  }

  getFuturesHistoricCandles(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-candles`, params);
  }

  getFuturesHistoricIndexPriceCandles(
    params: object,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-index-candles`, params);
  }

  getFuturesHistoricMarkPriceCandles(
    params: object,
  ): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-mark-candles`, params);
  }

  getFuturesRecentTrades(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/fills`, params);
  }

  getFuturesHistoricTrades(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/fills-history`, params);
  }

  getFuturesOpenInterest(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/open-interest`, params);
  }

  getFuturesNextFundingTime(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/funding-time`, params);
  }

  getFuturesSymbolPrice(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/symbol-price`, params);
  }

  getFuturesHistoricFundingRates(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/history-fund-rate`, params);
  }

  getFuturesCurrentFundingRate(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/current-fund-rate`, params);
  }

  getFuturesContractConfig(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/contracts`, params);
  }

  /**
   *
   * * Futures | Account
   *
   */

  getFuturesAccountAsset(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/account`, params);
  }

  getFuturesAccountAssets(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/accounts`, params);
  }

  getFuturesSubAccountAssets(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/sub-account-assets`, params);
  }

  getFuturesOpenCount(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/account/open-count`, params);
  }

  setFuturesLeverage(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-leverage`, params);
  }

  setFuturesPositionMargin(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-margin`, params);
  }

  setFuturesMarginMode(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/account/set-margin-mode`, params);
  }

  setFuturesPositionMode(params: object): Promise<APIResponse<any>> {
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

  getFuturesPositionTier(params: object): Promise<APIResponse<any>> {
    return this.get(`/api/v2/mix/market/query-position-lever`, params);
  }

  getFuturesPosition(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/position/single-position`, params);
  }

  getFuturesPositions(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/position/all-position`, params);
  }

  getFuturesHistoricPositions(params?: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/position/history-position`, params);
  }

  /**
   *
   * * Futures | Trade
   *
   */

  futuresSubmitOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/place-order`, params);
  }

  futuresCancelOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/cancel-order`, params);
  }

  futuresSubmitReversal(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/click-backhand`, params);
  }

  futuresBatchSubmitOrders(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/batch-place-order`, params);
  }

  futuresModifyOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/modify-order`, params);
  }

  futuresBatchCancelOrders(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/batch-cancel-orders`, params);
  }

  futuresFlashClosePositions(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/close-positions`, params);
  }

  getFuturesOrder(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/detail`, params);
  }

  getFuturesFills(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/fills`, params);
  }

  getFuturesHistoricOrderFills(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/fill-history`, params);
  }

  getFuturesOpenOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-pending`, params);
  }

  getFuturesHistoricOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-history`, params);
  }

  /**
   *
   * * Futures | Trigger Orders
   *
   */

  futuresSubmitTPSLOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/place-tpsl-order`, params);
  }

  futuresSubmitPlanOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/place-plan-order`, params);
  }

  futuresModifyTPSLPOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/modify-tpsl-order`, params);
  }

  futuresModifyPlanOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/modify-plan-order`, params);
  }

  futuresCancelPlanOrder(params: object): Promise<APIResponse<any>> {
    return this.postPrivate(`/api/v2/mix/order/cancel-plan-order`, params);
  }

  getFuturesPlanOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-plan-pending`, params);
  }

  getFuturesHistoricPlanOrders(params: object): Promise<APIResponse<any>> {
    return this.getPrivate(`/api/v2/mix/order/orders-plan-history`, params);
  }

  /**
   *
   *
   * Broker
   *
   *
   */

  // TODO: not yet implemented

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

  /**
   *
   *
   * Copy Trading
   *
   *
   */

  // TODO: not yet implemented

  /**
   *
   *
   * Earn
   *
   *
   */

  // TODO: not yet implemented
}
