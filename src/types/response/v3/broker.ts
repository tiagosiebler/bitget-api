export interface CreateBrokerSubAccountResponseV3 {
  subUid: string;
  subaccountName: string;
  subaccountEmail: string;
  status: 'normal' | 'freeze';
  permList: string[];
  label: string;
  cTime: string;
}

export interface BrokerSubAccountV3 {
  subUid: string;
  subaccountName: string;
  subaccountEmail: string | null;
  status: 'normal' | 'freeze';
  permList: string[];
  label: string;
  language: string;
  cTime: string;
  uTime: string;
}

export interface GetBrokerSubAccountListResponseV3 {
  subList: BrokerSubAccountV3[];
}

export interface ModifyBrokerSubAccountResponseV3 {
  subUid: string;
  subaccountName: string;
  status: 'normal' | 'freeze';
  permList: string[];
  label: string;
  cTime: string;
  uTime: string;
}

export interface BrokerSubWithdrawalResponseV3 {
  orderId: string;
  clientOid: string;
}

export interface BrokerSubDepositAddressV3 {
  subUid: string;
  coin: string;
  address: string;
  chain: string;
  tag: string | null;
  url: string;
  cTime: string;
}

export interface BrokerSubDepositWithdrawalRecordV3 {
  uid: string;
  txId: string;
  type: 'deposit' | 'withdrawal';
  subType: 'onchain' | 'internal' | 'fast';
  coin: string;
  amount: string;
  status: 'pending' | 'fail' | 'success';
  ts: string;
}

export interface GetBrokerAllSubDepositWithdrawalResponseV3 {
  list: BrokerSubDepositWithdrawalRecordV3[];
  endId: string;
}

export interface BrokerCommissionRecordV3 {
  uid: string;
  coin: string;
  symbol: string;
  dealtAmount: string;
  totalFee: string;
  deductedFee: string;
  paidFee: string;
  markUpFee: string;
  totalCommission: string;
}

export interface CreateBrokerSubApiKeyResponseV3 {
  subUid: string;
  label: string;
  apiKey: string;
  secretKey: string;
  permType: 'read_and_write' | 'readonly';
  permList: string[];
  ipList: string[] | null;
}

export interface ModifyBrokerSubApiKeyResponseV3 {
  subUid: string;
  label: string;
  apiKey: string;
  permType: 'read_and_write' | 'readonly';
  permList: string[];
  ipList: string[];
}

export interface GetBrokerSubApiKeyResponseV3 {
  subUid: string;
  label: string;
  apiKey: string;
  secretKey: string;
  permType: 'read_and_write' | 'readonly';
  permList: string[];
  ipList: string[] | null;
}
