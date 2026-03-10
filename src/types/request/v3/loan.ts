export interface GetTransferedRequestV3 {
  userId?: string;
  coin: string;
}

export interface GetSymbolsRequestV3 {
  productId: string;
}

export interface GetRepaidHistoryRequestV3 {
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface GetProductInfosRequestV3 {
  productId: string;
}

export interface GetLoanOrderRequestV3 {
  orderId?: string;
  startTime?: string;
  endTime?: string;
}

export interface GetEnsureCoinsRequestV3 {
  productId: string;
}

export interface BindUidRequestV3 {
  riskUnitId?: string;
  uid: string;
  operate: 'bind' | 'unbind';
}

export interface GetLTVConvertRequestV3 {
  riskUnitId?: string;
}

/* Unified Account Staking & Lending (Crypto Loans) - /api/v3/loan/* */

export interface GetLoanCoinsRequestV3 {
  coin?: string;
}

export interface GetLoanInterestRequestV3 {
  loanCoin: string;
  pledgeCoin: string;
  daily: 'SEVEN' | 'THIRTY' | 'FLEXIBLE';
  pledgeAmount: string;
}

export interface LoanBorrowRequestV3 {
  loanCoin: string;
  pledgeCoin: string;
  daily: 'SEVEN' | 'THIRTY' | 'FLEXIBLE';
  pledgeAmount?: string;
  loanAmount?: string;
}

export interface GetLoanBorrowOngoingRequestV3 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
}

export interface GetLoanBorrowHistoryRequestV3 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  status?: 'ROLLBACK' | 'FORCE' | 'REPAY';
  startTime: string;
  endTime: string;
  pageNum?: string;
  pageSize?: string;
}

export interface LoanRepayRequestV3 {
  orderId: string;
  method: 'borrowed_coin' | 'collateral';
  repayAll: 'yes' | 'no';
  amount?: string;
  repayUnlock?: 'yes' | 'no';
}

export interface GetLoanRepayHistoryRequestV3 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  startTime: string;
  endTime: string;
  pageNum?: string;
  pageSize?: string;
}

export interface LoanRevisePledgeRequestV3 {
  orderId: string;
  amount: string;
  pledgeCoin: string;
  reviseType?: 'OUT' | 'IN';
}

export interface GetLoanPledgeRateHistoryRequestV3 {
  orderId?: string;
  reviseSide?: 'down' | 'up';
  pledgeCoin?: string;
  startTime: string;
  endTime: string;
  pageNum?: string;
  pageSize?: string;
}

export interface GetLoanReducesRequestV3 {
  orderId?: string;
  loanCoin?: string;
  pledgeCoin?: string;
  status?: 'COMPLETE' | 'WAIT';
  startTime: string;
  endTime: string;
  pageNum?: string;
  pageSize?: string;
}
