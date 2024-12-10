/**
 *
 *
 * Earn | Savings
 *
 *
 */

export interface GetEarnSavingsAssetsRequestV2 {
  periodType: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetEarnSavingsRecordsRequestV2 {
  coin?: string;
  periodType: string;
  orderType?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface RedeemSavingsRequestV2 {
  productId: string;
  orderId?: string;
  periodType: string;
  amount: string;
}

/**
 *
 *
 * Earn | Shark Fin
 *
 *
 */

export interface GetSharkfinAssetsRequestV2 {
  status: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetSharkfinRecordsRequestV2 {
  coin?: string;
  type: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

/**
 *
 *
 * Earn | Loan
 *
 *
 */

export interface GetLoanEstInterestAndBorrowableRequestV2 {
  loanCoin: string;
  pledgeCoin: string;
  daily: 'SEVEN' | 'THIRTY';
  pledgeAmount?: string;
}

export interface BorrowLoanRequestV2 {
  loanCoin: string;
  pledgeCoin: string;
  daily: 'SEVEN' | 'THIRTY';
  pledgeAmount?: string;
  loanAmount?: string;
}

export interface RepayLoanRequestV2 {
  orderId: string;
  amount?: string;
  repayUnlock?: string;
  repayAll: string;
}

export interface GetLoanRepayHistoryRequestV2 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}

export interface ModifyLoanPledgeRateRequestV2 {
  orderId: string;
  amount: string;
  pledgeCoin: string;
  reviseType: string;
}

export interface GetLoanPledgeRateHistoryRequestV2 {
  orderId?: string;
  reviseSide?: string;
  pledgeCoin?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}

export interface GetLoanHistoryRequestV2 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  status?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}

export interface GetLiquidationRecordsRequestV2 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  status?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}
