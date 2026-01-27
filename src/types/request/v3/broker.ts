export interface CreateBrokerSubAccountRequestV3 {
  subaccountName: string;
  label: string;
}

export interface GetBrokerSubAccountListRequestV3 {
  limit?: string;
  cursor?: string;
  status?: 'normal' | 'freeze';
}

export interface ModifyBrokerSubAccountRequestV3 {
  subUid: string;
  status?: 'normal' | 'freeze';
  permList?: string[];
}

export interface BrokerSubWithdrawalRequestV3 {
  subUid: string;
  coin: string;
  dest: 'on_chain' | 'internal_transfer';
  address: string;
  amount: string;
  chain?: string;
  tag?: string;
  clientOid?: string;
}

export interface GetBrokerSubDepositAddressRequestV3 {
  subUid: string;
  coin: string;
  chain?: string;
}

export interface GetBrokerAllSubDepositWithdrawalRequestV3 {
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
  status?: 'pending' | 'fail' | 'success';
}

export interface GetBrokerCommissionRequestV3 {
  startTime?: string;
  endTime?: string;
  pageSize?: string;
  pageNo?: string;
  bizType?: 'spot' | 'futures';
  subBizType?:
    | 'spot_trade'
    | 'spot_margin'
    | 'usdt_futures'
    | 'usdc_futures'
    | 'coin_futures';
}

export interface CreateBrokerSubApiKeyRequestV3 {
  subUid: string;
  passphrase: string;
  label: string;
  ipList?: string[];
  permType: 'read_and_write' | 'readonly';
  permList: string[];
}

export interface ModifyBrokerSubApiKeyRequestV3 {
  subUid: string;
  passphrase: string;
  apiKey: string;
  label?: string;
  ipList?: string[];
  permType?: 'read_and_write' | 'readonly';
  permList?: string[];
}

export interface DeleteBrokerSubApiKeyRequestV3 {
  subUid: string;
  apiKey: string;
}

export interface GetBrokerSubApiKeyRequestV3 {
  subUid: string;
}
