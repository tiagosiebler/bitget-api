import { FuturesPlanTypeV2, FuturesProductTypeV2 } from '../shared.js';
import { FuturesKlineInterval } from '../v1/futuresV1.js';

export type FuturesKlineTypeV2 = 'MARKET' | 'MARK' | 'INDEX';

export interface FuturesAccountBillRequestV2 {
  productType: FuturesProductTypeV2;
  symbol?: string;
  coin?: string;
  businessType?: string;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

/**
 *
 * * Futures | Market
 *
 */

export interface FuturesMergeDepthRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  precision?: 'scale0' | 'scale1' | 'scale2' | 'scale3';
  limit?: '1' | '5' | '15' | '50' | 'max';
}

export interface FuturesRecentTradesRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  limit?: string;
}

export interface FuturesHistoricTradesRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  limit?: string;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
}

export interface FuturesCandlesRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  granularity: FuturesKlineInterval;
  startTime?: string;
  endTime?: string;
  kLineType?: FuturesKlineTypeV2;
  limit?: string;
}

/**
 *
 * * Futures | Account
 *
 */

export interface FuturesSingleAccountRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
}

export interface FuturesInterestHistoryRequestV2 {
  productType: 'USDT-FUTURES' | 'SUSDT-FUTURES';
  coin?: string;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface FuturesOpenCountRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
  openAmount: string;
  openPrice: string;
  leverage?: string;
}

export interface FuturesSetAutoMarginRequestV2 {
  symbol: string;
  autoMargin: 'on' | 'off';
  marginCoin: string;
  amount: string;
  holdSide?: 'long' | 'short';
}

export interface FuturesSetLeverageRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
  leverage: string;
  holdSide?: 'long' | 'short';
}

export interface FuturesSetPositionMarginRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
  holdSide: 'long' | 'short';
  amount: string;
}

export interface FuturesSetMarginModeRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
  marginMode: 'isolated' | 'crossed';
}

/**
 *
 * * Futures | Position
 *
 */

export interface FuturesHistoricalPositionsRequestV2 {
  symbol?: string;
  productType?: FuturesProductTypeV2;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

/**
 *
 * * Futures | Trade
 *
 */

export interface FuturesPlaceOrderRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginMode: 'isolated' | 'crossed';
  marginCoin: string;
  size: string;
  price?: string;
  side: 'buy' | 'sell';
  tradeSide?: 'open' | 'close';
  orderType: 'limit' | 'market';
  force?: 'ioc' | 'fok' | 'gtc' | 'post_only';
  clientOid?: string;
  reduceOnly?: 'YES' | 'NO';
  presetStopSurplusPrice?: string;
  presetStopLossPrice?: string;
  stpMode?: 'none' | 'cancel_taker' | 'cancel_maker' | 'cancel_both';
}

export interface FuturesReversalOrderRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
  size: string;
  side?: 'buy' | 'sell';
  tradeSide?: 'open' | 'close';
  clientOid?: string;
}

interface FuturesBatchOrderItem {
  size: string;
  price?: string;
  side: 'buy' | 'sell';
  tradeSide?: 'open' | 'close';
  orderType: 'limit' | 'market';
  force?: 'ioc' | 'fok' | 'gtc' | 'post_only';
  clientOid?: string;
  reduceOnly?: 'YES' | 'NO';
  presetStopSurplusPrice?: string;
  presetStopLossPrice?: string;
  stpMode?: 'none' | 'cancel_taker' | 'cancel_maker' | 'cancel_both';
}

export interface FuturesBatchOrderRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin: string;
  marginMode: 'isolated' | 'crossed';
  orderList: FuturesBatchOrderItem[];
}

export interface FuturesModifyOrderRequestV2 {
  orderId?: string;
  clientOid?: string;
  symbol: string;
  productType: FuturesProductTypeV2;
  newClientOid: string;
  newSize?: string;
  newPrice?: string;
  newPresetStopSurplusPrice?: string;
  newPresetStopLossPrice?: string;
}

export interface FuturesCancelOrderRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  marginCoin?: string;
  orderId?: string;
  clientOid?: string;
}

interface FuturesBatchCancelOrderItem {
  orderId?: string;
  clientOid?: string;
}

export interface FuturesBatchCancelOrderRequestV2 {
  orderIdList?: FuturesBatchCancelOrderItem[];
  symbol?: string;
  productType: FuturesProductTypeV2;
  marginCoin?: string;
}

export interface FuturesFlashClosePositionsRequestV2 {
  symbol?: string;
  productType: FuturesProductTypeV2;
  holdSide?: 'long' | 'short';
}

export interface FuturesGetOrderRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  orderId?: string;
  clientOid?: string;
}

export interface FuturesGetOrderFillsRequestV2 {
  orderId?: string;
  symbol?: string;
  productType: FuturesProductTypeV2;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface FuturesGetHistoricalFillsRequestV2 {
  orderId?: string;
  symbol?: string;
  productType: FuturesProductTypeV2;
  startTime?: string;
  endTime?: string;
  idLessThan?: string;
  limit?: string;
}

export interface FuturesGetOpenOrdersRequestV2 {
  orderId?: string;
  clientOid?: string;
  symbol?: string;
  productType: FuturesProductTypeV2;
  status?: 'live' | 'partially_filled';
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export type FuturesOrderSourceV2 =
  | 'normal'
  | 'market'
  | 'profit_market'
  | 'loss_market'
  | 'Trader_delegate'
  | 'trader_profit'
  | 'trader_loss'
  | 'reverse'
  | 'trader_reverse'
  | 'profit_limit'
  | 'loss_limit'
  | 'liquidation'
  | 'delivery_close_long'
  | 'delivery_close_short'
  | 'pos_profit_limit'
  | 'pos_profit_market'
  | 'pos_loss_limit'
  | 'pos_loss_market';

export interface FuturesGetHistoryOrdersRequestV2 {
  orderId?: string;
  clientOid?: string;
  symbol?: string;
  productType: FuturesProductTypeV2;
  idLessThan?: string;
  orderSource?: FuturesOrderSourceV2;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface FuturesCancelAllOrdersRequestV2 {
  symbol?: string;
  productType: FuturesProductTypeV2;
  marginCoin?: string;
  requestTime?: string;
  receiveWindow?: string;
}

/**
 *
 * * Futures | Trigger Orders
 *
 */

export type FuturesTriggerTypeV2 = 'fill_price' | 'mark_price';

export type FuturesStpModeV2 =
  | 'none'
  | 'cancel_taker'
  | 'cancel_maker'
  | 'cancel_both';

export interface FuturesTPSLOrderRequestV2 {
  marginCoin: string;
  productType: FuturesProductTypeV2;
  symbol: string;
  planType: FuturesPlanTypeV2;
  triggerPrice: string;
  triggerType?: FuturesTriggerTypeV2;
  executePrice?: string;
  holdSide: 'long' | 'short' | 'buy' | 'sell';
  size: string;
  rangeRate?: string;
  clientOid?: string;
  stpMode?: FuturesStpModeV2;
}

export type FuturesTriggerPriceTypeV2 =
  | 'fill_price'
  | 'mark_price'
  | 'index_price';

export interface FuturesPlanOrderRequestV2 {
  planType: 'normal_plan' | 'track_plan';
  symbol: string;
  productType: FuturesProductTypeV2;
  marginMode: 'isolated' | 'crossed';
  marginCoin: string;
  size: string;
  price?: string;
  callbackRatio?: string;
  triggerPrice: string;
  triggerType: 'mark_price' | 'fill_price';
  side: 'buy' | 'sell';
  tradeSide?: 'open' | 'close';
  orderType: 'limit' | 'market';
  clientOid?: string;
  reduceOnly?: 'YES' | 'NO';
  stopSurplusTriggerPrice?: string;
  stopSurplusExecutePrice?: string;
  stopSurplusTriggerType?: FuturesTriggerPriceTypeV2;
  stopLossTriggerPrice?: string;
  stopLossExecutePrice?: string;
  stopLossTriggerType?: FuturesTriggerPriceTypeV2;
  stpMode?: FuturesStpModeV2;
}

export interface FuturesModifyTPSLOrderRequestV2 {
  orderId?: string;
  clientOid?: string;
  marginCoin: string;
  productType: FuturesProductTypeV2;
  symbol: string;
  triggerPrice: string;
  triggerType?: 'fill_price' | 'mark_price';
  executePrice?: string;
  size: string;
  rangeRate?: string;
}

export interface FuturesModifyPlanOrderRequestV2 {
  planType: 'normal_plan' | 'track_plan';
  orderId?: string;
  clientOid?: string;
  symbol: string;
  productType: FuturesProductTypeV2;
  newSize?: string;
  newPrice?: string;
  newCallbackRatio?: string;
  newTriggerPrice?: string;
  newTriggerType?: 'fill_price' | 'mark_price';
  newStopSurplusTriggerPrice?: string;
  newStopSurplusExecutePrice?: string;
  newStopSurplusTriggerType?: FuturesTriggerPriceTypeV2;
  newStopLossTriggerPrice?: string;
  newStopLossExecutePrice?: string;
  newStopLossTriggerType?: FuturesTriggerPriceTypeV2;
}

export interface FuturesGetPlanOrdersRequestV2 {
  orderId?: string;
  clientOid?: string;
  symbol?: string;
  planType: 'normal_plan' | 'track_plan' | 'profit_loss';
  productType: FuturesProductTypeV2;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

interface FuturesCancelPlanOrderItemV2 {
  orderId?: string;
  clientOid?: string;
}

export type FuturesPlanOrderTypeV2 =
  | 'normal_plan'
  | 'profit_plan'
  | 'loss_plan'
  | 'pos_profit'
  | 'pos_loss'
  | 'moving_plan';

export interface FuturesCancelPlanOrderRequestV2 {
  orderIdList?: FuturesCancelPlanOrderItemV2[];
  symbol?: string;
  productType: FuturesProductTypeV2;
  marginCoin?: string;
  planType?: FuturesPlanOrderTypeV2;
}

export type FuturesPlanStatusV2 = 'executed' | 'fail_trigger' | 'cancelled';

export interface FuturesGetHistoryPlanOrdersRequestV2 {
  orderId?: string;
  clientOid?: string;
  planType: 'normal_plan' | 'track_plan' | 'profit_loss';
  planStatus?: FuturesPlanStatusV2;
  symbol?: string;
  productType: FuturesProductTypeV2;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

/**
 *
 * * Futures | Union Margin
 *
 */

export interface GetUnionTransferLimitsRequestV2 {
  coin: string;
}

export interface UnionConvertRequestV2 {
  coin: string;
  amount: string;
}
