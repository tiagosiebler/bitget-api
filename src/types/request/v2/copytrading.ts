/**
 *
 *
 * Copy Trading | Future copy trading | Trader Api
 *
 *
 */

export type CopyTradingProductType =
  | 'USDT-FUTURES'
  | 'COIN-FUTURES'
  | 'USDC-FUTURES';

export interface GetFuturesTraderCurrentOrdersRequest {
  symbol?: string;
  productType: CopyTradingProductType;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idGreaterThan?: string;
  idLessThan?: string;
}

export interface GetFuturesTraderHistoryOrdersRequest {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  order?: 'asc' | 'desc';
  symbol?: string;
  productType: CopyTradingProductType;
}

export interface ModifyFuturesTraderOrderTPSLRequest {
  trackingNo: string;
  productType: CopyTradingProductType;
  stopSurplusPrice?: string;
  stopLossPrice?: string;
}

export interface GetFuturesTraderProfitShareDetailRequest {
  coin?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface FuturesTraderSymbolSettingReq {
  symbol: string;
  productType: CopyTradingProductType;
  settingType: 'ADD' | 'DELETE' | 'UPDATE';
  stopSurplusRatio?: string;
  stopLossRatio?: string;
}

export interface GetFuturesTraderFollowers {
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

export interface GetFollowerFuturesCurrentTrackingOrdersRequest {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  symbol?: string;
  productType: CopyTradingProductType;
  traderId?: string;
}

export interface GetFollowerFuturesHistoryTrackingOrdersRequest {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  symbol?: string;
  productType: CopyTradingProductType;
  traderId?: string;
}

export interface UpdateFuturesFollowerTPSLRequest {
  trackingNo: string;
  symbol?: string;
  productType: CopyTradingProductType;
  stopSurplusPrice?: string;
  stopLossPrice?: string;
}

export type AutoCopyOption = 'on' | 'off';
export type FollowMode = 'basic' | 'advanced';
export type MarginType = 'trader' | 'specify';
export type LeverageType = 'position' | 'specify' | 'trader';
export type TraceType = 'percent' | 'amount' | 'count';

export interface FollowerCopyTradeSetting {
  symbol: string;
  productType: CopyTradingProductType;
  marginType: MarginType;
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

export interface UpdateFuturesFollowerSettingsRequest {
  traderId: string;
  autoCopy?: AutoCopyOption;
  mode?: FollowMode;
  settings: FollowerCopyTradeSetting[];
}
export interface CloseFuturesFollowerPositionsRequest {
  productType: CopyTradingProductType;
  trackingNo?: string;
  symbol?: string;
  marginCoin?: string;
  marginMode?: 'isolated' | 'cross';
  holdSide?: 'long' | 'short';
}

export interface GetFuturesFollowerTradersRequest {
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

export interface getSpotTraderHistoryProfitReq {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  coin?: string;
}

export interface GetSpotTraderHistoryOrdersReq {
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  symbol?: string;
}

export interface GetSpotTraderCurrentOrdersReq {
  symbol?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface GetSpotTraderFollowersRequest {
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

export interface SpotFollowerCopyTradeSetting {
  symbol: string;
  traceType: 'percent' | 'amount' | 'count';
  maxHoldSize: string;
  traceValue: string;
  stopLossRatio?: string;
  stopSurplusRatio?: string;
}

export interface GetSpotFollowerHistoryOrdersRequest {
  symbol?: string;
  traderId?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface GetSpotFollowerOpenOrdersRequest {
  symbol?: string;
  traderId?: string;
  idLessThan?: string;
  idGreaterThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}
