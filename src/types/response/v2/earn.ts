/**
 *
 *
 * Earn | Savings
 *
 *
 */

export interface EarnSavingsProductsV2 {
  productId: string;
  coin: string;
  periodType: string;
  period: string;
  apyType: string;
  advanceRedeem: string;
  settleMethod: string;
  apyList: {
    rateLevel: string;
    minStepVal: string;
    maxStepVal: string;
    currentApy: string;
  }[];
  status: string;
  productLevel: string;
}

export interface EarnSavingsAccountV2 {
  btcAmount: string;
  usdtAmount: string;
  btc24hEarning: string;
  usdt24hEarning: string;
  btcTotalEarning: string;
  usdtTotalEarning: string;
}

export interface EarnSavingsAssetV2 {
  productId: string;
  orderId: string;
  productCoin: string;
  interestCoin: string;
  periodType: string;
  period: string;
  holdAmount: string;
  lastProfit: string;
  totalProfit: string;
  holdDays: string;
  status: string;
  allowRedemption: string;
  productLevel: string;
  apy: {
    rateLevel: string;
    minApy: string;
    maxApy: string;
    currentApy: string;
  }[];
}

export interface EarnSavingsAssetsV2 {
  resultList: EarnSavingsAssetV2[];
  endId: string;
}

export interface EarnSavingsRecordV2 {
  orderId: string;
  coinName: string;
  settleCoinName: string;
  productType: string;
  period: string;
  productLevel: string;
  amount: string;
  ts: string;
  orderType: string;
}

export interface EarnSavingsRecordsV2 {
  resultList: EarnSavingsRecordV2[];
  endId: string;
}

export interface EarnSavingsSubscriptionDetailV2 {
  singleMinAmount: string;
  singleMaxAmount: string;
  remainingAmount: string;
  subscribePrecision: string;
  profitPrecision: string;
  subscribeTime: string;
  interestTime: string;
  settleTime: string;
  expireTime: string;
  redeemTime: string;
  settleMethod: string;
  apyList: {
    rateLevel: string;
    minStepVal: string;
    maxStepVal: string;
    currentApy: string;
  }[];
  redeemDelay: string;
}

/**
 *
 *
 * Earn | Earn Account
 *
 *
 */

/**
 *
 *
 * Earn | Shark Fin
 *
 *
 */

export interface EarnSharkfinProductV2 {
  productId: string;
  productName: string;
  productCoin: string;
  subscribeCoin: string;
  farmingStartTime: string;
  farmingEndTime: string;
  lowerRate: string;
  defaultRate: string;
  upperRate: string;
  period: string;
  interestStartTime: string;
  status: string;
  minAmount: string;
  limitAmount: string;
  soldAmount: string;
  endTime: string;
  startTime: string;
}

export interface EarnSharkfinProductsV2 {
  resultList: EarnSharkfinProductV2[];
  endId: string;
}

export interface EarnSharkfinAccountV2 {
  btcSubscribeAmount: string;
  usdtSubscribeAmount: string;
  btcHistoricalAmount: string;
  usdtHistoricalAmount: string;
  btcTotalEarning: string;
  usdtTotalEarning: string;
}

export interface EarnSharkfinAssetV2 {
  productId: string;
  interestStartTime: string;
  interestEndTime: string;
  productCoin: string;
  subscribeCoin: string;
  trend: string;
  settleTime: string;
  interestAmount: string;
  productStatus: string;
}

export interface EarnSharkfinAssetsV2 {
  resultList: EarnSharkfinAssetV2[];
  endId: string;
}

export interface EarnSharkfinRecordV2 {
  orderId: string;
  product: string;
  period: string;
  amount: string;
  ts: string;
  type: string;
}
export interface EarnSharkfinRecordsV2 {
  resultList: EarnSharkfinRecordV2[];
  endId: string;
}

export interface EarnSharkfinSubscriptionDetailV2 {
  productCoin: string;
  subscribeCoin: string;
  interestTime: string;
  expirationTime: string;
  minPrice: string;
  currentPrice: string;
  maxPrice: string;
  minRate: string;
  defaultRate: string;
  maxRate: string;
  period: string;
  productMinAmount: string;
  availableBalance: string;
  userAmount: string;
  remainingAmount: string;
  profitPrecision: string;
  subscribePrecision: string;
}

/**
 *
 *
 * Earn | Loan
 *
 *
 */

export interface EarnLoanCurrencyLoanInfoV2 {
  coin: string;
  hourRate7D: string;
  rate7D: string;
  hourRate30D: string;
  rate30D: string;
  minUsdt: string;
  maxUsdt: string;
  min: string;
  max: string;
}
export interface EarnLoanCurrencyPledgeInfoV2 {
  coin: string;
  initRate: string;
  supRate: string;
  forceRate: string;
  minUsdt: string;
  maxUsdt: string;
}

export interface EarnLoanCurrenciesV2 {
  loanInfos: EarnLoanCurrencyLoanInfoV2[];
  pledgeInfos: EarnLoanCurrencyPledgeInfoV2[];
}

export interface EarnLoanOrdersV2 {
  orderId: string;
  loanCoin: string;
  loanAmount: string;
  interestAmount: string;
  hourInterestRate: string;
  pledgeCoin: string;
  pledgeAmount: string;
  pledgeRate: string;
  supRate: string;
  forceRate: string;
  borrowTime: string;
  expireTime: string;
}

export interface EarnLoanRepayResponseV2 {
  loanCoin: string;
  pledgeCoin: string;
  repayAmount: string;
  payInterest: string;
  repayLoanAmount: string;
  repayUnlockAmount: string;
}

export interface EarnLoanRepayHistoryV2 {
  orderId: string;
  loanCoin: string;
  pledgeCoin: string;
  repayAmount: string;
  payInterest: string;
  repayLoanAmount: string;
  repayUnlockAmount: string;
  repayTime: string;
}

export interface EarnLoanPledgeRateHistoryV2 {
  loanCoin: string;
  pledgeCoin: string;
  orderId: string;
  reviseTime: string;
  reviseSide: string;
  reviseAmount: string;
  afterPledgeRate: string;
  beforePledgeRate: string;
}

export interface EarnLoanHistoryV2 {
  orderId: string;
  loanCoin: string;
  pledgeCoin: string;
  initPledgeAmount: string;
  initLoanAmount: string;
  hourRate: string;
  daily: string;
  borrowTime: string;
  status: string;
}

export interface EarnLoanDebtPledgeInfoV2 {
  coin: string;
  amount: string;
  amountUsdt: string;
}

export interface EarnLoanDebtLoanInfoV2 {
  coin: string;
  amount: string;
  amountUsdt: string;
}

export interface EarnLoanDebtsV2 {
  pledgeInfos: EarnLoanDebtPledgeInfoV2[];
  loanInfos: EarnLoanDebtLoanInfoV2[];
}

export interface EarnLoanLiquidationRecordsV2 {
  orderId: string;
  loanCoin: string;
  pledgeCoin: string;
  reduceTime: string;
  pledgeRate: string;
  pledgePrice: string;
  status: string;
  pledgeAmount: string;
  reduceFee: string;
  residueAmount: string;
  runlockAmount: string;
  repayLoanAmount: string;
}
