/**
 *
 * * Margin | Cross/Isolated | Order Record
 *
 */

export interface GetBorrowHistoryRequestV2 {
  loanId?: string;
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetRepayHistoryRequestV2 {
  repayId?: string;
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetInterestHistoryRequestV2 {
  coin?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetLiquidationHistoryRequestV2 {
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetFinancialHistoryRequestV2 {
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

export interface MarginPlaceOrderRequestV2 {
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

export interface MarginBatchOrdersRequestV2 {
  symbol: string;
  orderList: MarginBatchOrderEntry[];
}

export interface GetMarginCurrentOrdersRequestV2 {
  symbol: string;
  orderId?: string;
  clientOid?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetHistoryOrdersRequestV2 {
  symbol: string;
  orderId?: string;
  enterPointSource?: string;
  clientOid?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetMarginOrderFillsRequestV2 {
  symbol: string;
  orderId?: string;
  idLessThan?: string;
  startTime: string;
  endTime?: string;
  limit?: string;
}

export interface GetMarginLiquidationOrdersRequestV2 {
  type?: 'swap' | 'place_order';
  symbol?: string;
  fromCoin?: string;
  toCoin?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}
