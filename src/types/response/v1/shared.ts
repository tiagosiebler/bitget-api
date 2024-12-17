export interface APIResponse<T> {
  code: string;
  requestTime: number;
  msg: 'success' | string;
  data: T;
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
