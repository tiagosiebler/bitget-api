export type BrokerProductType =
  | 'umcbl'
  | 'usdt'
  | 'swap'
  | 'dmcbl'
  | 'mix'
  | 'swap';

export interface BrokerSubListRequest {
  pageSize?: string;
  lastEndId?: number;
  status?: string;
}

export interface BrokerSubWithdrawalRequest {
  subUid: string;
  coin: string;
  address: string;
  chain: string;
  tag?: string;
  amount: string;
  remark?: string;
  clientOid?: string;
}

export interface BrokerSubAPIKeyModifyRequest {
  subUid: string;
  apikey: string;
  remark?: string;
  ip?: string;
  perm?: string;
}
