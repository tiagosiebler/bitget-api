/**
 *
 * * Margin | Common
 *
 */

export interface MarginCurrencyV2 {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  maxCrossedLeverage: string;
  maxIsolatedLeverage: string;
  warningRiskRatio: string;
  liquidationRiskRatio: string;
  minTradeAmount: string;
  maxTradeAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  pricePrecision: string;
  quantityPrecision: string;
  minTradeUSDT: string;
  isBorrowable: boolean;
  userMinBorrow: string;
  status: string;
  isIsolatedBaseBorrowable: boolean;
  isIsolatedQuoteBorrowable: boolean;
  isCrossBorrowable: boolean;
}

/**
 *
 * * Margin | Cross/Isolated | Order Record
 *
 */

export interface MarginBorrowHistoryV2 {
  resultList: {
    loanId: string;
    coin: string;
    borrowAmount: string;
    borrowType: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

export interface MarginRepaymentHistoryV2 {
  resultList: {
    repayId: string;
    coin: string;
    repayAmount: string;
    repayType: string;
    repayInterest: string;
    repayPrincipal: string;
    symbol: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

export interface MarginInterestHistoryV2 {
  resultList: {
    interestId: string;
    interestCoin: string;
    dailyInterestRate: string;
    loanCoin: string;
    interestAmount: string;
    interstType: string;
    symbol: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

export interface MarginLiquidationHistoryV2 {
  resultList: {
    liqId: string;
    symbol: string;
    liqStartTime: string;
    liqEndTime: string;
    liqRiskRatio: string;
    totalAssets: string;
    totalDebt: string;
    liqFee: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

export interface MarginFinancialHistoryV2 {
  resultList: {
    coin: string;
    symbol: string;
    marginId: string;
    amount: string;
    balance: string;
    fee: string;
    marginType: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

/**
 *
 * * Margin | Cross/Isolated | Account
 *
 */

export interface MarginAccountAssetV2 {
  symbol: string;
  coin: string;
  totalAmount: string;
  available: string;
  frozen: string;
  borrow: string;
  interest: string;
  net: string;
  coupon: string;
  cTime: string;
  uTime: string;
}

export interface CrossMaxBorrowableResponseV2 {
  coin: string;
  maxBorrowableAmount: string;
}

export interface IsolatedMaxBorrowableResponseV2 {
  symbol: string;
  baseCoin: string;
  baseCoinMaxBorrowAmount: string;
  quoteCoin: string;
  quoteCoinMaxBorrowAmount: string;
}

export interface CrossMaxTransferableResponseV2 {
  coin: string;
  maxTransferOutAmount: string;
}

export interface IsolatedMaxTransferableResponseV2 {
  baseCoin: string;
  symbol: string;
  baseCoinMaxTransferOutAmount: string;
  quoteCoin: string;
  quoteCoinMaxTransferOutAmount: string;
}

export interface CrossInterestRateAndLimitResponseV2 {
  transferable: boolean;
  leverage: string;
  coin: string;
  borrowable: boolean;
  dailyInterestRate: string;
  annualInterestRate: string;
  maxBorrowableAmount: string;
  vipList: {
    level: string;
    limit: string;
    dailyInterestRate: string;
    annualInterestRate: string;
    discountRate: string;
  }[];
}

export interface IsolatedInterestRateAndLimitResponseV2 {
  symbol: string;
  leverage: string;
  baseCoin: string;
  baseTransferable: boolean;
  baseBorrowable: boolean;
  baseDailyInterestRate: string;
  baseAnnuallyInterestRate: string;
  baseMaxBorrowableAmount: string;
  baseVipList: {
    level: string;
    dailyInterestRate: string;
    limit: string;
    annuallyInterestRate: string;
    discountRate: string;
  }[];
  quoteCoin: string;
  quoteTransferable: boolean;
  quoteBorrowable: boolean;
  quoteDailyInterestRate: string;
  quoteAnnuallyInterestRate: string;
  quoteMaxBorrowableAmount: string;
  quoteList: {
    level: string;
    dailyInterestRate: string;
    limit: string;
    annuallyInterestRate: string;
    discountRate: string;
  }[];
}

export interface CrossTierConfigurationResponseV2 {
  tier: string;
  leverage: string;
  coin: string;
  maxBorrowableAmount: string;
  maintainMarginRate: string;
}

export interface IsolatedTierConfigurationResponseV2 {
  tier: string;
  symbol: string;
  leverage: string;
  baseCoin: string;
  quoteCoin: string;
  baseMaxBorrowableAmount: string;
  quoteMaxBorrowableAmount: string;
  maintainMarginRate: string;
  initRate: string;
}

/**
 *
 * * Margin | Cross/Isolated | Trade
 *
 */

export interface MarginBatchOrdersResponseV2 {
  successList: {
    orderId: string;
    clientOid: string;
  }[];
  failureList: {
    clientOid: string;
    errorMsg: string;
  }[];
}

export interface MarginCurrentOrdersV2 {
  orderList: {
    orderId: string;
    symbol: string;
    orderType: string;
    enterPointSource: string;
    clientOid: string;
    loanType: string;
    price: string;
    side: string;
    status: string;
    baseSize: string;
    quoteSize: string;
    priceAvg: string;
    size: string;
    amount: string;
    force: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

export interface MarginHistoryOrdersV2 {
  orderList: {
    orderId: string;
    symbol: string;
    orderType: string;
    enterPointSource: string;
    clientOid: string;
    loanType: string;
    price: string;
    side: string;
    status: string;
    baseSize: string;
    quoteSize: string;
    priceAvg: string;
    size: string;
    amount: string;
    force: string;
    cTime: string;
    uTime: string;
  }[];
  maxId: string;
  minId: string;
}

export interface MarginOrderFillsV2 {
  fills: {
    orderId: string;
    tradeId: string;
    orderType: string;
    side: string;
    priceAvg: string;
    size: string;
    amount: string;
    tradeScope: string;
    feeDetail: {
      deduction: string;
      feeCoin: string;
      totalDeductionFee: string;
      totalFee: string;
    };
    cTime: string;
    uTime: string;
  }[];
  minId: string;
  maxId: string;
}

export interface MarginLiquidationOrdersV2 {
  resultList: {
    symbol: string;
    orderType: string;
    side: string;
    priceAvg: string;
    price: string;
    fillSize: string;
    size: string;
    amount: string;
    orderId: string;
    fromCoin: string;
    toCoin: string;
    fromSize: string;
    toSize: string;
    cTime: string;
    uTime: string;
  }[];
  idLessThan: string;
}
