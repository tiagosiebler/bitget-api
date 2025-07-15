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

export interface CoinInfoV3 {
  coin: string;
  convertRatio: string;
  maxConvertValue: string;
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
