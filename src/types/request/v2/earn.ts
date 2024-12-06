/**
 *
 *
 * Earn | Savings
 *
 *
 */

export interface GetEarnSavingsAssetsRequest {
  periodType: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetEarnSavingsRecordsRequest {
  coin?: string;
  periodType: string;
  orderType?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface RedeemSavingsRequest {
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

export interface GetSharkfinAssetsRequest {
  status: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetSharkfinRecordsRequest {
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

export interface GetLoanEstInterestAndBorrowableRequest {
  loanCoin: string;
  pledgeCoin: string;
  daily: 'SEVEN' | 'THIRTY';
  pledgeAmount?: string;
}

export interface BorrowLoanRequest {
  loanCoin: string;
  pledgeCoin: string;
  daily: 'SEVEN' | 'THIRTY';
  pledgeAmount?: string;
  loanAmount?: string;
}

export interface RepayLoanRequest {
  orderId: string;
  amount?: string;
  repayUnlock?: string;
  repayAll: string;
}

export interface GetLoanRepayHistoryRequest {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}

export interface ModifyLoanPledgeRateRequest {
  orderId: string;
  amount: string;
  pledgeCoin: string;
  reviseType: string;
}

export interface GetLoanPledgeRateHistoryRequest {
  orderId?: string;
  reviseSide?: string;
  pledgeCoin?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}

export interface GetLoanHistoryRequest {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  status?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}

export interface GetLiquidationRecordsRequest {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  status?: string;
  startTime: string;
  endTime: string;
  pageNo?: string;
  pageSize?: string;
}
