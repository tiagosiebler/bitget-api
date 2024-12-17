/**
 *
 *
 * Copy Trading | Future copy trading | Trader Api
 *
 *
 */

export interface CTFuturesTraderCurrentOrderV2 {
  trackingNo: string;
  openOrderId: string;
  symbol: string;
  posSide: string;
  openLeverage: string;
  openPriceAvg: string;
  openTime: string;
  openSize: string;
  presetStopSurplusPrice: string;
  presetStopLossPrice: string;
  openFee: string;
  followCount: string;
}

export interface CTFuturesTraderCurrentOrdersV2 {
  trackingList: CTFuturesTraderCurrentOrderV2[];
  endId: string;
}

export interface CTFuturesTraderHistoryOrderV2 {
  trackingNo: string;
  symbol: string;
  openOrderId: string;
  closeOrderId: string;
  productType: string;
  posSide: string;
  openLeverage: string;
  openPriceAvg: string;
  openTime: string;
  openSize: string;
  closeSize: string;
  closeTime: string;
  closePriceAvg: string;
  stopType: string;
  achievedPL: string;
  openFee: string;
  closeFee: string;
  cTime: string;
}

export interface CTFuturesTraderHistoryOrderV2 {
  trackingList: CTFuturesTraderHistoryOrderV2[];
  endId: string;
}

export interface CTRateCTimeV2 {
  rate: string;
  ctime: string;
}

export interface CTAmountCTimeV2 {
  amount: string;
  ctime: string;
}

export interface CTFuturesTraderTotalOrderSummaryV2 {
  roi: string;
  tradingOrderNum: string;
  totalFollowerNum: string;
  currentFollowerNum: string;
  totalpl: string;
  gainNum: string;
  lossNum: string;
  winRate: string;
  tradingPairsAvailableList: string[];
  lastWeekRoiList: CTRateCTimeV2[];
  lastWeekProfitList: CTAmountCTimeV2[];
  lastMonthRoiList: CTRateCTimeV2[];
  lastMonthProfitList: CTAmountCTimeV2[];
  totalEquity: string;
}

export interface CTFuturesTraderProfitHistoryItemV2 {
  coin: string;
  profitCount: string;
  lastProfitTime: string;
}

export interface CTFuturesTraderHistoryProfitSummaryV2 {
  profitSummary: {
    yesterdayProfit: string;
    sumProfit: string;
    waitProfit: string;
    yesterdayTime: string;
  };
  profitHistoryList: CTFuturesTraderProfitHistoryItemV2[];
}

export interface CTFuturesTraderProfitShare {
  profitId: string;
  coin: string;
  profit: string;
  nickName: string;
  profitTime: string;
}

export interface CTFuturesTraderProfitShareHistoryV2 {
  profitList: CTFuturesTraderProfitShare[];
  endId: string;
}

export interface CTFuturesTraderSymbolSettingsV2 {
  symbol: string;
  openTrader: string;
  minOpenCount: string;
  maxLeverage: string;
  stopSurplusRatio: string;
  stopLossRatio: string;
}

export interface CTFuturesTraderMyFollowersV2 {
  accountEquity: string;
  isRemove: string;
  followerHeadPic: string;
  followerName: string;
  followerUid: string;
  followerTime: string;
}

/**
 *
 *
 * Copy Trading | Future copy trading | Follower Api
 *
 *
 */

export interface CTFuturesFollowerCurrentOrdersV2 {
  trackingNo: string;
  traderName: string;
  openOrderId: string;
  closeOrderId: string;
  traderId: string;
  symbol: string;
  posSide: string;
  openLeverage: string;
  openAvgPrice: string;
  openTime: string;
  openSize: string;
  closeAvgPrice: string;
  closeSize: string;
  openMarginSz: string;
  closeTime: string;
}

export interface CTFuturesFollowerHistoryOrderV2 {
  trackingNo: string;
  posSide: string;
  openLeverage: string;
  openSize: string;
  closeSize: string;
  openPriceAvg: string;
  closePriceAvg: string;
  achievedPL: string;
  openFee: string;
  closeFee: string;
  symbol: string;
  profitRate: string;
  netProfit: string;
  openOrderId: string;
  closeOrderId: string;
  openTime: string;
  closeTime: string;
  traderId: string;
  productType: string;
}

export interface CTFuturesFollowerHistoryOrdersV2 {
  trackingList: CTFuturesFollowerHistoryOrderV2[];
  endId: string;
}

export interface CTFuturesFollowerSettingV2 {
  symbol: string;
  productType: string;
  marginType: string;
  marginCoin: string;
  leverType: string;
  longLeverage: string;
  shortLeverage: string;
  traceType: string;
}

export interface CTFuturesFollowerSettingsV2 {
  followerEnable: string;
  detailList: CTFuturesFollowerSettingV2[];
}

export interface CTFuturesFollowerMyTradersV2 {
  certificationType: string;
  traderId: string;
  traderName: string;
  maxFollowLimit: string;
  followCount: string;
  traceTotalMarginAmount: string;
  traceTotalNetProfit: string;
  traceTotalProfit: string;
  currentTradingPairs: string[];
  followerTime: string;
  bgbMaxFollowLimit: string;
  bgbFollowCount: string;
}

/**
 *
 *
 * Copy Trading | Spot copy trading | Trader api
 *
 *
 */

export interface CTSpotTraderProfitSummaryV2 {
  profitSummarys: {
    yesterdayProfit: string;
    yesterdayTime: string;
    sumProfit: string;
    waitProfit: string;
  };
  profitHistoryList: {
    coin: string;
    profitCount: string;
    lastProfitTime: string;
    historysByDateList: {
      profit: string;
      profitTime: string;
    }[];
  }[];
}

export interface CTSpotTraderHistoryProfitShareItemV2 {
  profitId: string;
  coin: string;
  distributeRatio: string;
  profit: string;
  followerName: string;
  profitTime: string;
}

export interface CTSpotTraderHistoryProfitSharingV2 {
  endId: string;
  profitList: CTSpotTraderHistoryProfitShareItemV2[];
}

export interface CTSpotTraderUnrealizedProfitV2 {
  distributeRatio: string;
  coin: string;
  profit: string;
  followerName: string;
}

export interface CTSpotTraderTotalOrderDetailV2 {
  totalFollowerNum: string;
  currentFollowerNum: string;
  maxFollowerNum: string;
  tradingOrderNum: string;
  totalpl: string;
  gainNum: string;
  lossNum: string;
  totalEquity: string;
  winRate: string;
  lastWeekRoiList: CTAmountCTimeV2[];
  lastMonthRoiList: CTRateCTimeV2[];
  lastWeekProfitList: CTAmountCTimeV2[];
  lastMonthProfitList: CTAmountCTimeV2[];
}

export interface CTSpotTraderHistoryOrderV2 {
  trackingNo: string;
  fillSize: string;
  buyPrice: string;
  sellPrice: string;
  achievedPL: string;
  buyTime: string;
  sellTime: string;
  buyFee: string;
  sellFee: string;
  achievedPLR: string;
  symbol: string;
  netProfit: string;
  followCount: string;
}
export interface CTSpotTraderHistoryOrdersV2 {
  endId: string;
  trackingList: CTSpotTraderHistoryOrderV2[];
}

export interface CTSpotTraderCurrentTrackingOrderV2 {
  trackingNo: string;
  orderId: string;
  buyFillSize: string;
  buyDelegateSize: string;
  buyPrice: string;
  unrealizedPL: string;
  buyTime: string;
  buyFee: string;
  unrealizedPLR: string;
  symbol: string;
  stopLossPrice: string | null;
  stopSurplusPrice: string | null;
  followCount: string;
}

export interface CTSpotTraderCurrentTrackingOrdersV2 {
  endId: string;
  trackingList: CTSpotTraderCurrentTrackingOrderV2[];
}

export interface CTSpotTraderFollowerListV2 {
  accountEquity: string;
  isRemove: string;
  followerHeadPic: string | null;
  followerName: string;
  followerUid: string;
  followerTime: string;
}

/**
 *
 *
 * Copy Trading | Spot copy trading | Follower api
 *
 *
 */

export interface CTSpotFollowerMyTraderV2 {
  certificationType: string;
  traceTotalAmount: string;
  traceTotalNetProfit: string;
  traceTotalProfit: string;
  traderName: string;
  traderId: string;
  maxFollowLimit: string;
  bgbMaxFollowLimit: string;
  followCount: string;
  bgbFollowCount: string;
  followerTime: string;
}

export interface CTSpotFollowerMyTradersV2 {
  resultList: CTSpotFollowerMyTraderV2[];
}

export interface CTSpotFollowerTradeSettingV2 {
  maxTraceAmount: string;
  stopLossRation: string;
  stopSurplusRation: string;
  symbol: string;
  traceType: string;
}

export interface CTSpotFollowerTradeSymbolSettingV2 {
  maxStopLossRation: string;
  maxStopSurplusRation: string;
  maxTraceAmount: string;
  maxTraceAmountSystem: string;
  maxTraceSize: string;
  maxTraceRation: string;
  minStopLossRation: string;
  minStopSurplusRation: string;
  minTraceAmount: string;
  minTraceSize: string;
  minTraceRation: string;
  sliderMaxStopLossRatio: string;
  sliderMaxStopSurplusRatio: string;
  symbol: string;
}

export interface CTSpotFollowerFollowConfigurationV2 {
  enable: string;
  profitRate: string;
  settledInDays: string;
  tradeSettingList: CTSpotFollowerTradeSettingV2[];
  tradeSymbolSettingList: CTSpotFollowerTradeSymbolSettingV2[];
  traderHeadPic: string;
  traderName: string;
}

export interface CTSpotFollowerHistoryOrderV2 {
  trackingNo: string;
  traderId: string;
  fillSize: string;
  buyPrice: string;
  sellPrice: string;
  buyFee: string;
  sellFee: string;
  achievedPL: string;
  achievedPLR: string;
  symbol: string;
  buyTime: string;
  sellTime: string;
}
export interface CTSpotFollowerHistoryOrdersV2 {
  endId: string;
  trackingList: CTSpotFollowerHistoryOrderV2[];
}

export interface CTSpotFollowerCurrentOrderV2 {
  trackingNo: string;
  traderId: string;
  buyFillSize: string;
  buyDelegateSize: string;
  buyPrice: string;
  unrealizedPL: string;
  buyTime: string;
  buyFee: string;
  unrealizedPLR: string;
  symbol: string;
  stopSurplusPrice: string | null;
  stopLossPrice: string | null;
}

export interface CTSpotFollowerCurrentOrdersV2 {
  endId: string;
  trackingList: CTSpotFollowerCurrentOrderV2[];
}
