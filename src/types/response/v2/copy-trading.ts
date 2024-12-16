/**
 *
 *
 * Copy Trading | Future copy trading | Trader Api
 *
 *
 */

export interface CTFuturesTraderCurrentOrderV2 {
  trackingList: {
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
  }[];
  endId: string;
}

export interface CTFuturesTraderHistoryOrderV2 {
  trackingList: {
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
  }[];
  endId: string;
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
  lastWeekRoiList: {
    rate: string;
    ctime: string;
  }[];
  lastWeekProfitList: {
    amount: string;
    ctime: string;
  }[];
  lastMonthRoiList: {
    rate: string;
    ctime: string;
  }[];
  lastMonthProfitList: {
    amount: string;
    ctime: string;
  }[];
  totalEquity: string;
}

export interface CTFuturesTraderHistoryProfitSummaryV2 {
  profitSummary: {
    yesterdayProfit: string;
    sumProfit: string;
    waitProfit: string;
    yesterdayTime: string;
  };
  profitHistoryList: {
    coin: string;
    profitCount: string;
    lastProfitTime: string;
  }[];
}

export interface CTFuturesTraderProfitShareHistoryV2 {
  profitList: {
    profitId: string;
    coin: string;
    profit: string;
    nickName: string;
    profitTime: string;
  }[];
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

export interface CTFuturesFollowerHistoryOrdersV2 {
  trackingList: {
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
  }[];
  endId: string;
}

export interface CTFuturesFollowerSettingsV2 {
  followerEnable: string;
  detailList: {
    symbol: string;
    productType: string;
    marginType: string;
    marginCoin: string;
    leverType: string;
    longLeverage: string;
    shortLeverage: string;
    traceType: string;
    traceValue: string;
    maxHoldSize: string;
    stopSurplusRatio: string;
    stopLossRatio: string;
  }[];
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

export interface CTSpotTraderHistoryProfitSharingV2 {
  endId: string;
  profitList: {
    profitId: string;
    coin: string;
    distributeRatio: string;
    profit: string;
    followerName: string;
    profitTime: string;
  }[];
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
  lastWeekRoiList: {
    rate: string;
    ctime: string;
  }[];
  lastMonthRoiList: {
    rate: string;
    ctime: string;
  }[];
  lastWeekProfitList: {
    amount: string;
    ctime: string;
  }[];
  lastMonthProfitList: {
    amount: string;
    ctime: string;
  }[];
}

export interface CTSpotTraderHistoryOrdersV2 {
  endId: string;
  trackingList: {
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
  }[];
}

export interface CTSpotTraderCurrentTrackingOrdersV2 {
  endId: string;
  trackingList: {
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
  }[];
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

export interface CTSpotFollowerMyTradersV2 {
  resultList: {
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
  }[];
}

export interface CTSpotFollowerFollowConfigurationV2 {
  enable: string;
  profitRate: string;
  settledInDays: string;
  tradeSettingList: {
    maxTraceAmount: string;
    stopLossRation: string;
    stopSurplusRation: string;
    symbol: string;
    traceType: string;
  }[];
  tradeSymbolSettingList: {
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
  }[];
  traderHeadPic: string;
  traderName: string;
}

export interface CTSpotFollowerHistoryOrdersV2 {
  endId: string;
  trackingList: {
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
  }[];
}

export interface CTSpotFollowerCurrentOrdersV2 {
  endId: string;
  trackingList: {
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
  }[];
}
