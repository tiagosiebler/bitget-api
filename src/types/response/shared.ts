export interface APIResponse<T> {
  code: string;
  data: T;
  msg: 'success' | string;
  requestTime: number;
}

export interface VIPFeeRate {
  level: number;
  dealAmount: string;
  assetAmount: string;
  takerFeeRate?: string;
  makerFeeRate?: number;
  withdrawAmount: string;
  withdrawAmountUSDT: string;
}
