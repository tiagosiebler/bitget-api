export interface LoanTransfersV3 {
  coin: string;
  transfered: string;
  userId: string;
}

export interface LoanSymbolSettingV3 {
  symbol: string;
  leverage: string;
}

export interface LoanSymbolsV3 {
  productId: string;
  spotSymbols: string[];
  marginLeverage: string;
  usdtContractLeverage: string;
  coinContractLeverage: string;
  usdcContractLeverage: string;
  usdtContractSymbols: LoanSymbolSettingV3[];
  coinContractSymbols: LoanSymbolSettingV3[];
  usdcContractSymbols: LoanSymbolSettingV3[];
}

export interface RepaidHistoryItemV3 {
  repayOrderId: string;
  businessType: 'normal' | 'liquidation';
  repayType: 'all' | 'part';
  repaidTime: string;
  coin: string;
  repayAmount: string;
  repayInterest: string;
}

export interface LoanProductInfoV3 {
  productId: string;
  leverage: string;
  supportUsdtContract: 'YES' | 'NO';
  supportCoinContract: 'YES' | 'NO';
  supportUsdcContract: 'YES' | 'NO';
  transferLine: string;
  spotBuyLine: string;
  usdtContractOpenLine: string;
  coinContractOpenLine: string;
  usdcContractOpenLine: string;
  liquidationLine: string;
  stopLiquidationLine: string;
}

export interface LoanOrderV3 {
  orderId: string;
  orderProductId: string;
  uid: string;
  loanTime: string;
  loanCoin: string;
  loanAmount: string;
  unpaidAmount: string;
  unpaidInterest: string;
  repaidAmount: string;
  repaidInterest: string;
  reserve: string;
  status: 'not_paid_off' | 'paid_off';
}

/** Tiered conversion rate item (when Tiered Discount Rate Model is enabled) */
export interface ConvertRatioListItemV3 {
  ladder: string;
  convertRatio: string;
}

export interface CoinInfoV3 {
  coin: string;
  convertRatio: string;
  maxConvertValue: string;
  /** Tiered conversion rate (when margin mode is Tiered Discount Rate Model) */
  convertRatioList?: ConvertRatioListItemV3[];
}

export interface BindUidResponseV3 {
  riskUnitId: string;
  uid: string;
  operate: 'bind' | 'unbind';
}

export interface UnpaidInfoV3 {
  coin: string;
  unpaidQty: string;
  unpaidInterest: string;
}

export interface BalanceInfoV3 {
  coin: string;
  price: string;
  amount: string;
  convertedUsdtAmount: string;
}

export interface LTVConvertResponseV3 {
  ltv: string;
  subAccountUids: string[];
  unpaidUsdtAmount: string;
  usdtBalance: string;
  unpaidInfo: UnpaidInfoV3[];
  balanceInfo: BalanceInfoV3[];
}

/* Unified Account Staking & Lending (Crypto Loans) - /api/v3/loan/* */

export interface LoanCoinInfoV3 {
  coin: string;
  hourRateFlexible: string;
  rateFlexible: string;
  hourRate7D: string;
  rate7D: string;
  hourRate30D: string;
  rate30D: string;
  minBorrowAmount: string;
  maxBorrowAmount: string;
  minBorrowLimit: string;
  maxBorrowLimit: string;
}

export interface LoanPledgeInfoV3 {
  coin: string;
  initRate: string;
  supRate: string;
  forceRate: string;
  minPledgeAmount: string;
  maxPledgeAmount: string;
}

export interface GetLoanCoinsResponseV3 {
  loanInfos: LoanCoinInfoV3[];
  pledgeInfos: LoanPledgeInfoV3[];
}

export interface GetLoanInterestResponseV3 {
  hourInterest: string;
  loanAmount: string;
}

export interface LoanBorrowResponseV3 {
  orderId: string;
}

export interface LoanBorrowOngoingItemV3 {
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

export interface LoanBorrowHistoryItemV3 {
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

export interface LoanRepayResponseV3 {
  loanCoin: string;
  pledgeCoin: string;
  repayAmount: string;
  payInterest: string;
  repayLoanAmount: string;
  repayUnlockAmount: string;
}

export interface LoanRepayHistoryItemV3 {
  orderId: string;
  loanCoin: string;
  pledgeCoin: string;
  repayAmount: string;
  payInterest: string;
  repayLoanAmount: string;
  repayUnlockAmount: string;
  repayTime: string;
}

export interface LoanRevisePledgeResponseV3 {
  loanCoin: string;
  pledgeCoin: string;
  afterPledgeRate: string;
}

export interface LoanPledgeRateHistoryItemV3 {
  loanCoin: string;
  pledgeCoin: string;
  orderId: string;
  reviseTime: string;
  reviseSide: string;
  reviseAmount: string;
  afterPledgeRate: string;
  beforePledgeRate: string;
}

export interface LoanDebtInfoV3 {
  coin: string;
  amount: string;
  amountUsdt: string;
}

export interface GetLoanDebtsResponseV3 {
  pledgeInfos: LoanDebtInfoV3[];
  loanInfos: LoanDebtInfoV3[];
}

export interface LoanReduceItemV3 {
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
