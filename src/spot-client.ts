import {
  NewBatchSpotOrder,
  NewSpotOrder,
  NewWalletTransfer,
  Pagination,
  APIResponse,
  KlineInterval,
  CoinBalance,
  SymbolRules,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client
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

  /** Get Market Trades */
  getMarketTrades(symbol: string, limit?: string): Promise<APIResponse<any>> {
    return this.get('/api/spot/v1/market/fills', { symbol, limit });
  }

  /** Get Candle Data */
  getCandles(
    symbol: string,
    period: KlineInterval,
    pagination?: Pagination
  ): Promise<APIResponse<any>> {
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
    limit?: string
  ): Promise<APIResponse<any>> {
    return this.get('/api/spot/v1/market/depth', { symbol, type, limit });
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

  /** Get Coin Address */
  getDepositAddress(coin: string, chain?: string): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/wallet/deposit-address', {
      coin,
      chain,
    });
  }

  /** Withdraw Coins On Chain*/
  withdraw(params: {
    coin: string;
    address: string;
    chain: string;
    tag?: string;
    amount: string;
    remark?: string;
    clientOid?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/withdrawal', params);
  }

  /** Inner Withdraw : Internal withdrawal means that both users are on the Bitget platform */
  innerWithdraw(
    coin: string,
    toUid: string,
    amount: string,
    clientOid?: string
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/wallet/withdrawal-inner', {
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
    pageNo?: string
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/wallet/withdrawal-list', {
      coin,
      startTime,
      endTime,
      pageSize,
      pageNo,
    });
  }

  /** Get Deposit List */
  getDeposits(
    coin: string,
    startTime: string,
    endTime: string,
    pageSize?: string,
    pageNo?: string
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
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/api/spot/v1/account/transferRecords', params);
  }

  /**
   *
   * Trade Endpoints
   *
   */

  /** Place order */
  submitOrder(params: NewSpotOrder): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/orders', params);
  }

  /** Place orders in batches, up to 50 at a time */
  batchSubmitOrder(
    symbol: string,
    orderList: NewBatchSpotOrder[]
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

  /** Cancel order in batch (per symbol) */
  batchCancelOrder(
    symbol: string,
    orderIds: string[]
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/cancel-batch-orders', {
      symbol,
      orderIds,
    });
  }

  /** Get order details */
  getOrder(
    symbol: string,
    orderId: string,
    clientOrderId?: string
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
    pagination?: Pagination
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
    pagination?: Pagination
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/spot/v1/trade/fills', {
      symbol,
      orderId,
      ...pagination,
    });
  }
}
