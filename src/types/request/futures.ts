export type FuturesProductType =
  | 'umcbl'
  | 'dmcbl'
  | 'cmcbl'
  | 'sumcbl'
  | 'sdmcbl'
  | 'scmcbl';

export interface FuturesAccountBillRequest {
  symbol: string;
  marginCoin: string;
  startTime: string;
  endTime: string;
  pageSize?: number;
  lastEndId?: string;
  next?: boolean;
}

export interface FuturesBusinessBillRequest {
  productType: FuturesProductType;
  startTime: string;
  endTime: string;
  pageSize?: number;
  lastEndId?: string;
  next?: boolean;
}

export type FuturesOrderType = 'limit' | 'market';
export type FuturesOrderSide =
  | 'open_long'
  | 'open_short'
  | 'close_long'
  | 'close_short';

export interface NewFuturesOrder {
  symbol: string;
  marginCoin: string;
  size: string;
  price?: string;
  side: FuturesOrderSide;
  orderType: FuturesOrderType;
  timeInForceValue?: string;
  clientOid?: string;
  presetTakeProfitPrice?: string;
  presetStopLossPrice?: string;
}

export interface NewBatchFuturesOrder {
  size: string;
  price?: string;
  side: string;
  orderType: string;
  timeInForceValue?: string;
  clientOid?: string;
}

export interface FuturesPagination {
  startTime?: string;
  endTime?: string;
  lastEndId?: string;
}

export interface NewFuturesPlanOrder {
  symbol: string;
  marginCoin: string;
  size: string;
  executePrice?: string;
  triggerPrice: string;
  triggerType: 'fill_price' | 'market_price';
  side: FuturesOrderSide;
  orderType: FuturesOrderType;
  clientOid?: string;
  presetTakeProfitPrice?: string;
  presetStopLossPrice?: string;
}

export interface ModifyFuturesPlanOrder {
  orderId: string;
  marginCoin: string;
  symbol: string;
  executePrice?: string;
  triggerPrice: string;
  triggerType: string;
  orderType: FuturesOrderType;
}

export interface ModifyFuturesPlanOrderTPSL {
  orderId: string;
  marginCoin: string;
  symbol: string;
  presetTakeProfitPrice?: string;
  presetStopLossPrice?: string;
}

export type FuturesPlanType = 'profit_plan' | 'loss_plan';
export type FuturesHoldSide = 'long' | 'short';

export interface NewFuturesPlanStopOrder {
  symbol: string;
  marginCoin: string;
  planType: FuturesPlanType;
  triggerPrice: string;
  holdSide?: FuturesHoldSide;
  size?: string;
}

export interface NewFuturesPlanPositionTPSL {
  symbol: string;
  marginCoin: string;
  planType: FuturesPlanType;
  triggerPrice: string;
  holdSide: FuturesHoldSide;
}

export interface ModifyFuturesPlanStopOrder {
  orderId: string;
  marginCoin: string;
  symbol: string;
  triggerPrice?: string;
}

export interface CancelFuturesPlanTPSL {
  orderId: string;
  symbol: string;
  marginCoin: string;
  planType: FuturesPlanType;
}

export interface HistoricPlanOrderTPSLRequest {
  symbol: string;
  startTime: string;
  endTime: string;
  pageSize?: number;
  isPre?: boolean;
  isPlan?: string;
}
