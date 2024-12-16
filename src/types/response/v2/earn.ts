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

export interface EarnSavingsAssetsV2 {
  resultList: {
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
  }[];
  endId: string;
}

export interface EarnSavingsRecordsV2 {
  resultList: {
    orderId: string;
    coinName: string;
    settleCoinName: string;
    productType: string;
    period: string;
    productLevel: string;
    amount: string;
    ts: string;
    orderType: string;
  }[];
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

export interface EarnSharkfinProductsV2 {
  resultList: {
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
  }[];
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

export interface EarnSharkfinAssetsV2 {
  resultList: {
    productId: string;
    interestStartTime: string;
    interestEndTime: string;
    productCoin: string;
    subscribeCoin: string;
    trend: string;
    settleTime: string;
    interestAmount: string;
    productStatus: string;
  }[];
  endId: string;
}

export interface EarnSharkfinRecordsV2 {
  resultList: {
    orderId: string;
    product: string;
    period: string;
    amount: string;
    ts: string;
    type: string;
  }[];
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

export interface EarnLoanCurrenciesV2 {
  loanInfos: {
    coin: string;
    hourRate7D: string;
    rate7D: string;
    hourRate30D: string;
    rate30D: string;
    minUsdt: string;
    maxUsdt: string;
    min: string;
    max: string;
  }[];
  pledgeInfos: {
    coin: string;
    initRate: string;
    supRate: string;
    forceRate: string;
    minUsdt: string;
    maxUsdt: string;
  }[];
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

export interface EarnLoanDebtsV2 {
  pledgeInfos: {
    coin: string;
    amount: string;
    amountUsdt: string;
  }[];
  loanInfos: {
    coin: string;
    amount: string;
    amountUsdt: string;
  }[];
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
