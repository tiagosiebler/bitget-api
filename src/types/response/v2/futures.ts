/**
 *
 * * Futures | Market
 *
 */

export interface FuturesVipFeeRateV2 {
  level: string;
  dealAmount: string;
  assetAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  btcWithdrawAmount: string;
  usdtWithdrawAmount: string;
}

export interface FuturesHistoryInterestRateV2 {
  ts: string;
  annualInterestRate: string;
  dailyInterestRate: string;
}

export interface FuturesInterestExchangeRateV2 {
  tier: string;
  minAmount: string;
  maxAmount: string;
  exchangeRate: string;
}

export interface FuturesDiscountRateV2 {
  tier: string;
  minAmount: string;
  maxAmount: string;
  discountRate: string;
}

export interface FuturesDiscountRatesV2 {
  coin: string;
  userLimit: string;
  totalLimit: string;
  discountRateList: FuturesDiscountRateV2[];
}

export interface FuturesMergeDepthV2 {
  asks: [number, number][];
  bids: [number, number][];
  ts: string;
  scale: string;
  precision: string;
  isMaxPrecision: string;
}

export interface FuturesTickerV2 {
  symbol: string;
  lastPr: string;
  askPr: string;
  bidPr: string;
  bidSz: string;
  askSz: string;
  high24h: string;
  low24h: string;
  ts: string;
  change24h: string;
  baseVolume: string;
  quoteVolume: string;
  usdtVolume: string;
  openUtc: string;
  changeUtc24h: string;
  indexPrice: string;
  fundingRate: string;
  holdingAmount: string;
  deliveryStartTime: string;
  deliveryTime: string;
  deliveryStatus: string;
  open24h: string;
  markPrice: string;
}

export interface FuturesFillV2 {
  tradeId: string;
  price: string;
  size: string;
  side: string;
  ts: string;
  symbol: string;
}

export type FuturesCandlestickV2 = [
  string, // timestamp
  string, // open
  string, // high
  string, // low
  string, // close
  string, // baseVolume
  string, // usdtVolume
  string, // quoteVolume
];

export interface FuturesOpenInterestV2 {
  symbol: string;
  size: string;
}

export interface FuturesFundingTimeV2 {
  symbol: string;
  nextFundingTime: string;
  ratePeriod: string;
}

export interface FuturesSymbolPriceV2 {
  symbol: string;
  price: string;
  indexPrice: string;
  markPrice: string;
  ts: string;
}

export interface FuturesHistoricalFundingRateV2 {
  symbol: string;
  fundingRate: string;
  fundingTime: string;
}

export interface FuturesContractConfigV2 {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  buyLimitPriceRatio: string;
  sellLimitPriceRatio: string;
  feeRateUpRatio: string;
  makerFeeRate: string;
  takerFeeRate: string;
  openCostUpRatio: string;
  supportMarginCoins: string[];
  minTradeNum: string;
  priceEndStep: string;
  volumePlace: string;
  pricePlace: string;
  sizeMultiplier: string;
  symbolType: string;
  minTradeUSDT: string;
  maxSymbolOrderNum: string;
  maxProductOrderNum: string;
  maxPositionNum: string;
  symbolStatus: string;
  offTime: string;
  limitOpenTime: string;
  deliveryTime: string;
  deliveryStartTime: string;
  launchTime: string;
  fundInterval: string;
  minLever: string;
  maxLever: string;
  posLimit: string;
  maintainTime: string;
}

/**
 *
 * * Futures | Account
 *
 */

export interface FuturesAccountV2 {
  marginCoin: string;
  locked: string;
  available: string;
  crossedMaxAvailable: string;
  isolatedMaxAvailable: string;
  maxTransferOut: string;
  accountEquity: string;
  usdtEquity: string;
  btcEquity: string;
  crossedRiskRate: string;
  crossedMarginLeverage: string;
  isolatedLongLever: string;
  isolatedShortLever: string;
  marginMode: string;
  posMode: string;
  unrealizedPL: string;
  coupon: string;
  crossedUnrealizedPL: string;
  isolatedUnrealizedPL: string;
  assetMode: string;
}

export interface FuturesAccountsV2 {
  marginCoin: string;
  locked: string;
  available: string;
  crossedMaxAvailable: string;
  isolatedMaxAvailable: string;
  maxTransferOut: string;
  accountEquity: string;
  usdtEquity: string;
  btcEquity: string;
  crossedRiskRate: string;
  unrealizedPL: string;
  coupon: string;
  unionTotalMagin: string;
  unionAvailable: string;
  unionMm: string;
  assetList: {
    coin: string;
    balance: string;
  }[];
  isolatedMargin: string;
  crossedMargin: string;
  crossedUnrealizedPL: string;
  isolatedUnrealizedPL: string;
  assetMode: string;
}

export interface FuturesSubAccountAssetV2 {
  marginCoin: string;
  locked: string;
  available: string;
  crossedMaxAvailable: string;
  isolatedMaxAvailable: string;
  maxTransferOut: string;
  accountEquity: string;
  usdtEquity: string;
  btcEquity: string;
  unrealizedPL: string;
  coupon: string;
}

export interface FuturesInterestV2 {
  coin: string;
  liability: string;
  interestFreeLimit: string;
  interestLimit: string;
  hourInterestRate: string;
  interest: string;
  cTime: string;
}
export interface FuturesInterestHistoryV2 {
  nextSettleTime: string;
  borrowAmount: string;
  borrowLimit: string;
  interestList: FuturesInterestV2[];
  endId: string;
}

export interface SetLeverageResponseV2 {
  symbol: string;
  marginCoin: string;
  longLeverage: string;
  shortLeverage: string;
  crossMarginLeverage: string;
  marginMode: string;
}

export interface SetMarginModeResponseV2 {
  symbol: string;
  marginCoin: string;
  longLeverage: string;
  shortLeverage: string;
  marginMode: string;
}

export interface FuturesAccountBillV2 {
  billId: string;
  symbol: string;
  amount: string;
  fee: string;
  feeByCoupon: string;
  businessType: string;
  coin: string;
  balance: string;
  cTime: string;
}

/**
 *
 * * Futures | Position
 *
 */

export interface FuturesPositionTierV2 {
  symbol: string;
  level: string;
  startUnit: string;
  endUnit: string;
  leverage: string;
  keepMarginRate: string;
}

export interface FuturesPositionV2 {
  marginCoin: string;
  symbol: string;
  holdSide: string;
  openDelegateSize: string;
  marginSize: string;
  available: string;
  locked: string;
  total: string;
  leverage: string;
  achievedProfits: string;
  openPriceAvg: string;
  marginMode: string;
  posMode: string;
  unrealizedPL: string;
  liquidationPrice: string;
  keepMarginRate: string;
  markPrice: string;
  breakEvenPrice: string;
  totalFee: string;
  deductedFee: string;
  marginRatio: string;
  assetMode: string;
  uTime: string;
  autoMargin: string;
  cTime: string;
}

export interface FuturesHistoryPositionV2 {
  positionId: string;
  marginCoin: string;
  symbol: string;
  holdSide: string;
  openAvgPrice: string;
  closeAvgPrice: string;
  marginMode: string;
  openTotalPos: string;
  closeTotalPos: string;
  pnl: string;
  netProfit: string;
  totalFunding: string;
  openFee: string;
  closeFee: string;
  cTime: string;
  uTime: string;
}

/**
 *
 * * Futures | Trade
 *
 */

export interface FuturesBatchOrderResponseV2 {
  successList: {
    orderId: string;
    clientOid: string;
  }[];
  failureList: {
    orderId: string;
    clientOid: string;
    errorMsg: string;
    errorCode: string;
  }[];
}

export interface FuturesClosePositionResponseV2 {
  successList: {
    orderId: string;
    clientOid: string;
    symbol: string;
  }[];
  failureList: {
    orderId: string;
    clientOid: string;
    symbol: string;
    errorMsg: string;
    errorCode: string;
  }[];
}

export interface FuturesOrderDetailV2 {
  symbol: string;
  size: string;
  orderId: string;
  clientOid: string;
  baseVolume: string;
  priceAvg: string;
  fee: string;
  price: string;
  state: string;
  side: string;
  force: string;
  totalProfits: string;
  posSide: string;
  marginCoin: string;
  presetStopSurplusPrice: string;
  presetStopLossPrice: string;
  quoteVolume: string;
  orderType: string;
  leverage: string;
  marginMode: string;
  reduceOnly: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  orderSource: string;
  cancelReason: string;
  cTime: string;
  uTime: string;
}

export interface FuturesOrderFillV2 {
  tradeId: string;
  symbol: string;
  orderId: string;
  price: string;
  baseVolume: string;
  feeDetail: {
    deduction: string;
    feeCoin: string;
    totalDeductionFee: string;
    totalFee: string;
  }[];
  side: string;
  quoteVolume: string;
  profit: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  tradeScope: string;
  cTime: string;
}

export interface FuturesOpenOrderV2 {
  symbol: string;
  size: string;
  orderId: string;
  clientOid: string;
  baseVolume: string;
  fee: string;
  price: string;
  priceAvg: string;
  status: string;
  side: string;
  force: string;
  totalProfits: string;
  posSide: string;
  marginCoin: string;
  quoteVolume: string;
  leverage: string;
  marginMode: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  orderType: string;
  orderSource: string;
  cTime: string;
  uTime: string;
  presetStopSurplusPrice: string;
  presetStopSurplusType: string;
  presetStopSurplusExecutePrice: string;
  presetStopLossPrice: string;
  presetStopLossType: string;
  presetStopLossExecutePrice: string;
}

export interface FuturesHistoryOrderV2 {
  symbol: string;
  size: string;
  orderId: string;
  clientOid: string;
  baseVolume: string;
  fee: string;
  price: string;
  priceAvg: string;
  status: string;
  side: string;
  force: string;
  totalProfits: string;
  posSide: string;
  marginCoin: string;
  quoteVolume: string;
  leverage: string;
  marginMode: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  orderType: string;
  orderSource: string;
  cTime: string;
  uTime: string;
  presetStopSurplusPrice: string;
  presetStopLossPrice: string;
}

export interface FuturesCancelAllOrdersV2 {
  successList: {
    orderId: string;
    clientOid: string;
  }[];
  failureList: {
    orderId: string;
    clientOid: string;
    errorMsg: string;
    errorCode: string;
  }[];
}

/**
 *
 * * Futures | Trigger Orders
 *
 */

export interface FuturesTriggerSubOrderV2 {
  orderId: string;
  price: string;
  type: string;
  status: string;
}

export interface FuturesPendingPlanOrderV2 {
  planType: string;
  symbol: string;
  size: string;
  orderId: string;
  clientOid: string;
  price: string;
  executePrice: string;
  callbackRatio: string;
  triggerPrice: string;
  triggerType: string;
  planStatus: string;
  side: string;
  posSide: string;
  marginCoin: string;
  marginMode: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  orderType: string;
  orderSource: string;
  cTime: string;
  uTime: string;
  stopSurplusExecutePrice: string;
  stopSurplusTriggerPrice: string;
  stopSurplusTriggerType: string;
  stopLossExecutePrice: string;
  stopLossTriggerPrice: string;
  stopLossTriggerType: string;
}

export interface FuturesCancelPlanOrderV2 {
  successList: {
    orderId: string;
    clientOid: string;
  }[];
  failureList: {
    orderId: string;
    clientOid: string;
    errorMsg: string;
  }[];
}

export interface FuturesHistoryPlanOrderV2 {
  planType: string;
  symbol: string;
  size: string;
  orderId: string;
  executeOrderId: string;
  clientOid: string;
  planStatus: string;
  price: string;
  executePrice: string;
  priceAvg: string;
  baseVolume: string;
  callbackRatio: string;
  triggerPrice: string;
  triggerType: string;
  side: string;
  posSide: string;
  marginCoin: string;
  marginMode: string;
  enterPointSource: string;
  tradeSide: string;
  posMode: string;
  orderType: string;
  cTime: string;
  uTime: string;
  stopSurplusExecutePrice: string;
  stopSurplusTriggerPrice: string;
  stopSurplusTriggerType: string;
  stopLossExecutePrice: string;
  stopLossTriggerPrice: string;
  stopLossTriggerType: string;
}

/**
 *
 * * Futures | Union Margin
 *
 */

export interface UnionTransferLimitsV2 {
  coin: string;
  maxTransferIn: string;
}

export interface UnionConfigV2 {
  imr: string;
  mmr: string;
  individualLimit: string;
  individualLimitRatio: string;
}

export interface UnionSwitchUsdtV2 {
  usdtAmount: string;
}

export interface UnionConvertV2 {
  usdtAmount: string;
}

/**
 *
 * * Futures | Account | Max Openable Quantity
 *
 */

export interface FuturesMaxOpenV2 {
  maxOpen: string;
}

/**
 *
 * * Futures | Account | Liquidation Price
 *
 */

export interface FuturesLiquidationPriceV2 {
  liqPrice: string;
}

/**
 *
 * * Futures | Account | Isolated Symbols
 *
 */

export interface FuturesIsolatedSymbolV2 {
  symbol: string;
  marginMode: 'isolated';
}
