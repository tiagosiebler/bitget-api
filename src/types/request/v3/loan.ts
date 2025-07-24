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
