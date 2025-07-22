import { GetHistoricTradesParams, Pagination } from './types/request/shared.js';
import {
  BatchCancelSpotOrderV2,
  CancelSpotOrderV2,
  CancelSpotPlanOrderParams,
  GetHistoricPlanOrdersParams,
  GetSpotPlanOrdersParams,
  ModifySpotPlanOrder,
  NewBatchSpotOrder,
  NewSpotOrder,
  NewSpotPlanOrder,
  NewSpotSubTransfer,
  NewSpotWithdraw,
  NewWalletTransfer,
  SpotCandleData,
  SpotKlineInterval,
} from './types/request/v1/spotV1.js';
import { APIResponse, VIPFeeRate } from './types/response/v1/shared.js';
import {
  CoinBalance,
  SpotMarketTrade,
  SpotOrderResult,
  SpotPlanOrder,
  SymbolRules,
} from './types/response/v1/spot.js';
import BaseRestClient from './util/BaseRestClient.js';
import { REST_CLIENT_TYPE_ENUM } from './util/requestUtils.js';

/**
 * REST API client for the V1 bitget Spot APIs. These are the previous generation of Bitget's APIs and should be considered deprecated.
 * These will be removed in a future release, once Bitget formally deprecates them.
 *
 * @deprecated use RestClientV2 instead
 */
export class SpotClient extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.spot;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.data);
  }

  /**
   *
   * Public
   *
   */
  /** Get Server Time */
  getServerTime(): Promise<APIResponse<string>> {
    return this.get('/api/spot/v1/public/time');
  }

  /** Get Coin List : Get all coins information on the platform */
  getCoins(): Promise<APIResponse<any[]>> {
    return this.get('/api/spot/v1/public/currencies');
  }

  /** Get Symbols : Get basic configuration information of all trading pairs (including rules) */
  getSymbols(): Promise<APIResponse<SymbolRules[]>> {
    return this.get('/api/spot/v1/public/products');
  }

  /** Get Single Symbol : Get basic configuration information for one symbol */
  getSymbol(symbol: string): Promise<APIResponse<any>> {
    return this.get('/api/spot/v1/public/product', { symbol });
  }

  /**
   *
   * Market
   *
   */

  /** Get Single Ticker */
  getTicker(symbol: string): Promise<APIResponse<any>> {
    return this.get('/api/spot/v1/market/ticker', { symbol });
  }

  /** Get All Tickers */
  getAllTickers(): Promise<APIResponse<any>> {
    return this.get('/api/spot/v1/market/tickers');
  }

  /** Get most recent trades (up to 500, 100 by default) */
  getRecentTrades(
    symbol: string,
    limit?: string,
  ): Promise<APIResponse<SpotMarketTrade[]>> {
    return this.get('/api/spot/v1/market/fills', { symbol, limit });
  }

  /** Get historic trades, up to 30 days at a time. Same-parameter responses are cached for 10 minutes. */
  getHistoricTrades(
    params: GetHistoricTradesParams,
  ): Promise<APIResponse<SpotMarketTrade[]>> {
    return this.get('/api/spot/v1/market/fills-history', params);
  }

  /**
   * @deprecated use getRecentTrades() instead. This method will be removed soon.
   */
  getMarketTrades(
    symbol: string,
    limit?: string,
  ): Promise<APIResponse<SpotMarketTrade[]>> {
    return this.get('/api/spot/v1/market/fills', { symbol, limit });
  }

  /** Get Candle Data */
  getCandles(
    symbol: string,
    period: SpotKlineInterval,
    pagination?: Pagination,
  ): Promise<APIResponse<SpotCandleData[]>> {
    return this.get('/api/spot/v1/market/candles', {
      symbol,
      period,
      ...pagination,
    });
  }

  /** Get Depth */
  getDepth(
    symbol: string,
    type: 'step0' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5',
    limit?: string,
  ): Promise<APIResponse<any>> {
    return this.get('/api/spot/v1/market/depth', { symbol, type, limit });
  }

  /** Get VIP fee rates */
  getVIPFeeRates(): Promise<APIResponse<VIPFeeRate[]>> {
    return this.get('/api/spot/v1/market/spot-vip-level');
  }

  /**
   *
   * Wallet Endpoints
   *
   */

  /** Initiate wallet transfer */
  transfer(params: NewWalletTransfer): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/transfer', params);
  }

  /** Initiate wallet transfer (v2 endpoint) */
  transferV2(params: NewWalletTransfer): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/transfer-v2', params);
  }

  /**
   * Transfer main-sub, sub-sub or sub-main
   */
  subTransfer(params: NewSpotSubTransfer): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/subTransfer', params);
  }

  /** Get Coin Address */
  getDepositAddress(coin: string, chain?: string): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/wallet/deposit-address', {
      coin,
      chain,
    });
  }

  /** Withdraw Coins On Chain */
  withdraw(params: NewSpotWithdraw): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/withdrawal', params);
  }

  /** Withdraw Coins On Chain (v2 endpoint) */
  withdrawV2(params: NewSpotWithdraw): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/withdrawal-v2', params);
  }

  /** Inner Withdraw : Internal withdrawal means that both users are on the Bitget platform */
  innerWithdraw(
    coin: string,
    toUid: string,
    amount: string,
    clientOid?: string,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/withdrawal-inner', {
      coin,
      toUid,
      amount,
      clientOid,
    });
  }

  /** Inner Withdraw (v2 endpoint) : Internal withdrawal means that both users are on the Bitget platform */
  innerWithdrawV2(
    coin: string,
    toUid: string,
    amount: string,
    clientOid?: string,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/withdrawal-inner-v2', {
      coin,
      toUid,
      amount,
      clientOid,
    });
  }

  /** Get Withdraw List */
  getWithdrawals(
    coin: string,
    startTime: string,
    endTime: string,
    pageSize?: string,
    pageNo?: string,
    clientOid?: string,
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/wallet/withdrawal-list', {
      coin,
      startTime,
      endTime,
      pageSize,
      pageNo,
      clientOid,
    });
  }

  /** Get Deposit List */
  getDeposits(
    coin: string,
    startTime: string,
    endTime: string,
    pageSize?: string,
    pageNo?: string,
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/wallet/deposit-list', {
      coin,
      startTime,
      endTime,
      pageSize,
      pageNo,
    });
  }

  /**
   *
   * Account Endpoints
   *
   */

  /** Get ApiKey Info */
  getApiKeyInfo(): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/account/getInfo');
  }

  /** Get Account : get account assets */
  getBalance(coin?: string): Promise<APIResponse<CoinBalance[]>> {
    return this.getPrivate('/api/spot/v1/account/assets', { coin });
  }

  /** Get sub Account Spot Asset */
  getSubAccountSpotAssets(): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/account/sub-account-spot-assets');
  }

  /** Get Bills : get transaction detail flow */
  getTransactionHistory(params?: {
    coinId?: number;
    groupType?: string;
    bizType?: string;
    after?: string;
    before?: string;
    limit?: number;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/account/bills', params);
  }

  /** Get Transfer List */
  getTransferHistory(params?: {
    coinId?: number;
    fromType?: string;
    after?: string;
    before?: string;
    limit?: number;
    clientOid?: string;
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/account/transferRecords', params);
  }

  /**
   *
   * Trade Endpoints
   *
   */

  /** Place order */
  submitOrder(params: NewSpotOrder): Promise<APIResponse<SpotOrderResult>> {
    return this.postPrivate('/api/spot/v1/trade/orders', params);
  }

  /** Place orders in batches, up to 50 at a time */
  batchSubmitOrder(
    symbol: string,
    orderList: NewBatchSpotOrder[],
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/batch-orders', {
      symbol,
      orderList,
    });
  }

  /** Cancel order */
  cancelOrder(symbol: string, orderId: string): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/cancel-order', {
      symbol,
      orderId,
    });
  }

  /** Cancel order (v2 endpoint - supports orderId or clientOid) */
  cancelOrderV2(params?: CancelSpotOrderV2): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/cancel-order-v2', params);
  }

  /**
   * Cancel all spot orders for a symbol
   */
  cancelSymbolOrders(symbol: string): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/cancel-symbol-order', {
      symbol,
    });
  }

  /** Cancel order in batch (per symbol) */
  batchCancelOrder(
    symbol: string,
    orderIds: string[],
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/cancel-batch-orders', {
      symbol,
      orderIds,
    });
  }

  /** Cancel order in batch (per symbol). V2 endpoint, supports orderIds or clientOids. */
  batchCancelOrderV2(
    params: BatchCancelSpotOrderV2,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(
      '/api/spot/v1/trade/cancel-batch-orders-v2',
      params,
    );
  }

  /** Get order details */
  getOrder(
    symbol: string,
    orderId: string,
    clientOrderId?: string,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/orderInfo', {
      symbol,
      orderId,
      clientOrderId,
    });
  }

  /** Get order list (open orders) */
  getOpenOrders(symbol?: string): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/open-orders', { symbol });
  }

  /** Get order history for a symbol */
  getOrderHistory(
    symbol: string,
    pagination?: Pagination,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/history', {
      symbol,
      ...pagination,
    });
  }

  /** Get transaction details / history (fills) for an order */
  getOrderFills(
    symbol: string,
    orderId: string,
    pagination?: Pagination,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/fills', {
      symbol,
      orderId,
      ...pagination,
    });
  }

  /** Place plan order */
  submitPlanOrder(
    params: NewSpotPlanOrder,
  ): Promise<APIResponse<SpotOrderResult>> {
    return this.postPrivate('/api/spot/v1/plan/placePlan', params);
  }

  /** Modify plan order */
  modifyPlanOrder(
    params: ModifySpotPlanOrder,
  ): Promise<APIResponse<SpotOrderResult>> {
    return this.postPrivate('/api/spot/v1/plan/modifyPlan', params);
  }

  /** Cancel plan order */
  cancelPlanOrder(
    params: CancelSpotPlanOrderParams,
  ): Promise<APIResponse<string>> {
    return this.postPrivate('/api/spot/v1/plan/cancelPlan', params);
  }

  /** Get current plan orders */
  getCurrentPlanOrders(params: GetSpotPlanOrdersParams): Promise<
    APIResponse<{
      nextFlag: boolean;
      endId: number;
      orderList: SpotPlanOrder[];
    }>
  > {
    return this.postPrivate('/api/spot/v1/plan/currentPlan', params);
  }

  /** Get history plan orders */
  getHistoricPlanOrders(params: GetHistoricPlanOrdersParams): Promise<
    APIResponse<{
      nextFlag: boolean;
      endId: number;
      orderList: SpotPlanOrder[];
    }>
  > {
    return this.postPrivate('/api/spot/v1/plan/historyPlan', params);
  }
}
