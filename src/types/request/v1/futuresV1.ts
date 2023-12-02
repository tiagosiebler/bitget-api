import { OrderTimeInForce } from '../shared';

export type FuturesProductType =
  | 'umcbl'
  | 'dmcbl'
  | 'cmcbl'
  | 'sumcbl'
  | 'sdmcbl'
  | 'scmcbl';

export type FuturesKlineInterval =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1H'
  | '2H'
  | '4H'
  | '6H'
  | '12H'
  | '1D'
  | '3D'
  | '1W'
  | '1M'
  | '6Hutc'
  | '12Hutc'
  | '1Dutc'
  | '3Dutc'
  | '1Wutc'
  | '1Mutc';

export type FuturesHoldSide = 'long' | 'short';

export type FuturesMarginMode = 'fixed' | 'crossed';

export type FuturesHoldMode = 'double_hold' | 'single_hold';

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
  | 'close_short'
  | 'buy_single'
  | 'sell_single';

export interface NewFuturesOrder {
  symbol: string;
  marginCoin: string;
  size: string;
  price?: string;
  side: FuturesOrderSide;
  orderType: FuturesOrderType;
  timeInForceValue?: OrderTimeInForce;
  clientOid?: string;
  reduceOnly?: boolean;
  reverse?: boolean;
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

export interface ModifyFuturesOrder {
  symbol: string;
  orderId?: string;
  clientOid?: string;
  newClientOid?: string;
  size?: string;
  price?: string;
  presetTakeProfitPrice?: string;
  presetStopLossPrice?: string;
}

export interface FuturesHistoricPositions {
  startTime: string;
  endTime: string;
  productType?: FuturesProductType;
  symbol?: string;
  pageSize?: number;
  lastEndId?: string;
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
  reduceOnly?: string;
}

export interface ModifyFuturesPlanOrder {
  orderId: string;
  marginCoin: string;
  symbol: string;
  executePrice?: string;
  triggerPrice: string;
  triggerType: 'fill_price' | 'market_price';
  orderType: FuturesOrderType;
}

export interface ModifyFuturesPlanOrderTPSL {
  orderId?: string;
  clientOid?: string;
  marginCoin: string;
  symbol: string;
  presetTakeProfitPrice?: string;
  presetStopLossPrice?: string;
}

export type FuturesPlanType =
  | 'profit_plan'
  | 'loss_plan'
  | 'normal_plan'
  | 'pos_profit'
  | 'pos_loss'
  | 'moving_plan'
  | 'track_plan';

export interface NewFuturesPlanStopOrder {
  symbol: string;
  marginCoin: string;
  planType: FuturesPlanType;
  triggerPrice: string;
  triggerType?: 'fill_price' | 'market_price';
  holdSide: FuturesHoldSide;
  size?: string;
  rangeRate?: string;
  clientOid?: string;
}

export interface NewFuturesPlanTrailingStopOrder {
  symbol: string;
  marginCoin: string;
  triggerPrice: string;
  triggerType?: 'fill_price' | 'market_price';
  size?: string;
  side: FuturesOrderSide;
  rangeRate?: string;
  clientOid?: string;
}

export interface NewFuturesPlanPositionTPSL {
  symbol: string;
  marginCoin: string;
  planType: FuturesPlanType;
  triggerPrice: string;
  triggerType?: 'fill_price' | 'market_price';
  holdSide: FuturesHoldSide;
  clientOid?: string;
}

export interface ModifyFuturesPlanStopOrder {
  orderId?: string;
  clientOid?: string;
  marginCoin: string;
  symbol: string;
  triggerPrice?: string;
  planType: FuturesPlanType;
}

export interface CancelFuturesPlanTPSL {
  orderId?: string;
  clientOid?: string;
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

/**
 * @typedef  {string[6]} FuturesCandleData
 * @property {Array[0]} Timestamp in milliseconds
 * @property {Array[1]} Opening price
 * @property {Array[2]} Highest price
 * @property {Array[3]} Lowest price
 * @property {Array[4]} Closing price - Value of the latest candle stick might change
 * @property {Array[5]} Base currency trading volume
 * @property {Array[6]} Quote currency trading volume
 */
export type FuturesCandleData = string[6];