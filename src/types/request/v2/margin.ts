/**
 *
 * * Margin | Cross/Isolated | Order Record
 *
 */

export interface GetBorrowHistoryRequest {
  loanId?: string;
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetRepayHistoryRequest {
  repayId?: string;
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetInterestHistoryRequest {
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetLiquidationHistoryRequest {
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetFinancialHistoryRequest {
  marginType?: string;
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

/**
 *
 * * Margin | Cross/Isolated | Account
 *
 */

/**
 *
 * * Margin | Cross/Isolated | Trade
 *
 */

export type MarginOrderType = 'limit' | 'market';

export type MarginLoanType =
  | 'normal'
  | 'autoLoan'
  | 'autoRepay'
  | 'autoLoanAndRepay';

export type MarginTimeInForce = 'gtc' | 'post_only' | 'fok' | 'ioc';

export type MarginOrderSide = 'buy' | 'sell';

export type MarginSTPMode =
  | 'none'
  | 'cancel_taker'
  | 'cancel_maker'
  | 'cancel_both';

export interface MarginPlaceOrderRequest {
  symbol: string;
  orderType: MarginOrderType;
  price?: string;
  loanType: MarginLoanType;
  force: MarginTimeInForce;
  baseSize?: string;
  quoteSize?: string;
  clientOid?: string;
  side: MarginOrderSide;
  stpMode?: MarginSTPMode;
}

export interface MarginBatchOrderEntry {
  orderType: MarginOrderType;
  price?: string;
  loanType: MarginLoanType;
  force: MarginTimeInForce;
  baseSize?: string;
  quoteSize?: string;
  clientOid?: string;
  side: MarginOrderSide;
  stpMode?: MarginSTPMode;
}

export interface MarginBatchOrdersRequest {
  symbol: string;
  orderList: MarginBatchOrderEntry[];
}

export interface GetMarginCurrentOrdersRequest {
  symbol: string;
  orderId?: string;
  clientOid?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetHistoryOrdersRequest {
  symbol: string;
  orderId?: string;
  enterPointSource?: string;
  clientOid?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetMarginOrderFillsRequest {
  symbol: string;
  orderId?: string;
  idLessThan?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
}

export interface GetMarginLiquidationOrdersRequest {
  type?: 'swap' | 'place_order';
  symbol?: string;
  fromCoin?: string;
  toCoin?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}
