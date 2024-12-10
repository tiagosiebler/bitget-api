/**
 *
 *
 * Copy Trading | Future copy trading | Trader Api
 *
 *
 */

export type CopyTradingProductTypeV2 =
  | 'USDT-FUTURES'
  | 'COIN-FUTURES'
  | 'USDC-FUTURES';

export interface GetFuturesTraderCurrentOrdersRequestV2 {
  symbol?: string;
  productType: CopyTradingProductTypeV2;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idGreaterThan?: string;
  idLessThan?: string;
}

export interface GetFuturesTraderHistoryOrdersRequestV2 {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  order?: 'asc' | 'desc';
  symbol?: string;
  productType: CopyTradingProductTypeV2;
}

export interface ModifyFuturesTraderOrderTPSLRequestV2 {
  trackingNo: string;
  productType: CopyTradingProductTypeV2;
  stopSurplusPrice?: string;
  stopLossPrice?: string;
}

export interface GetFuturesTraderProfitShareDetailRequestV2 {
  coin?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface FuturesTraderSymbolSettingRequestV2 {
  symbol: string;
  productType: CopyTradingProductTypeV2;
  settingType: 'ADD' | 'DELETE' | 'UPDATE';
  stopSurplusRatio?: string;
  stopLossRatio?: string;
}

export interface GetFuturesTraderFollowersRequestV2 {
  pageNo?: string;
  pageSize?: string;
  startTime?: string;
  endTime?: string;
}

/**
 *
 *
 * Copy Trading | Future copy trading | Follower Api
 *
 *
 */

export interface GetFollowerFuturesCurrentTrackingOrdersRequestV2 {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  symbol?: string;
  productType: CopyTradingProductTypeV2;
  traderId?: string;
}

export interface GetFollowerFuturesHistoryTrackingOrdersRequestV2 {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  symbol?: string;
  productType: CopyTradingProductTypeV2;
  traderId?: string;
}

export interface UpdateFuturesFollowerTPSLRequestV2 {
  trackingNo: string;
  symbol?: string;
  productType: CopyTradingProductTypeV2;
  stopSurplusPrice?: string;
  stopLossPrice?: string;
}

export type AutoCopyOption = 'on' | 'off';
export type FollowMode = 'basic' | 'advanced';
export type LeverageType = 'position' | 'specify' | 'trader';
export type TraceType = 'percent' | 'amount' | 'count';

export interface FollowerCopyTradeSettingRequestV2 {
  symbol: string;
  productType: CopyTradingProductTypeV2;
  marginType: 'trader' | 'specify';
  marginCoin?: string;
  leverType: LeverageType;
  longLeverage?: string;
  shortLeverage?: string;
  traceType: TraceType;
  traceValue: string;
  maxHoldSize?: string;
  stopSurplusRatio?: string;
  stopLossRatio?: string;
}

export interface UpdateFuturesFollowerSettingsRequestV2 {
  traderId: string;
  autoCopy?: AutoCopyOption;
  mode?: FollowMode;
  settings: FollowerCopyTradeSettingRequestV2[];
}
export interface CloseFuturesFollowerPositionsRequestV2 {
  productType: CopyTradingProductTypeV2;
  trackingNo?: string;
  symbol?: string;
  marginCoin?: string;
  marginMode?: 'isolated' | 'cross';
  holdSide?: 'long' | 'short';
}

export interface GetFuturesFollowerTradersRequestV2 {
  startTime?: string;
  endTime?: string;
  pageNo?: string;
  pageSize?: string;
}

/**
 *
 *
 * Copy Trading | Spot copy trading | Trader api
 *
 *
 */

export interface GetSpotTraderHistoryProfitRequestV2 {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  coin?: string;
}

export interface GetSpotTraderHistoryOrdersRequestV2 {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  symbol?: string;
}

export interface GetSpotTraderCurrentOrdersRequestV2 {
  symbol?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface GetSpotTraderFollowersRequestV2 {
  pageNo?: string;
  pageSize?: string;
  startTime?: string;
  endTime?: string;
}

/**
 *
 *
 * Copy Trading | Spot copy trading | Follower api
 *
 *
 */

export interface SpotFollowerCopyTradeSettingV2 {
  symbol: string;
  traceType: 'percent' | 'amount' | 'count';
  maxHoldSize: string;
  traceValue: string;
  stopLossRatio?: string;
  stopSurplusRatio?: string;
}

export interface GetSpotFollowerHistoryOrdersRequestV2 {
  symbol?: string;
  traderId?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface GetSpotFollowerOpenOrdersRequestV2 {
  symbol?: string;
  traderId?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}
