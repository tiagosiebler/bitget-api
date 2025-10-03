/**
 *
 * * Broker | Subaccount
 *
 */

export interface GetSubAccountsRequestV2 {
  limit?: string;
  idLessThan?: string;
  status?: 'normal' | 'freeze' | 'del';
  startTime?: string;
  endTime?: string;
}

export type SubAccountPermissionV2 =
  | 'withdraw'
  | 'transfer'
  | 'spot_trade'
  | 'contract_trade'
  | 'read'
  | 'deposit'
  | 'margin_trade';

export type SubAccountLanguageV2 =
  | 'en_US'
  | 'zh_CN'
  | 'ja_JP'
  | 'vi_VN'
  | 'zh_TW'
  | 'ru_RU'
  | 'es_ES'
  | 'tr_TR'
  | 'fr_FR'
  | 'de_DE'
  | 'pt_PT'
  | 'th_TH';

export type SubAccountStatusV2 = 'normal' | 'freeze';

export interface ModifySubRequestV2 {
  subUid: string;
  permList: SubAccountPermissionV2[];
  status: SubAccountStatusV2;
  language?: SubAccountLanguageV2;
}

export interface SubWithdrawalRequestV2 {
  subUid: string;
  coin: string;
  dest: 'on_chain' | 'internal_transfer';
  chain?: string;
  address: string;
  amount: string;
  tag?: string;
  clientOid?: string;
}

export interface SubDepositRecordsRequestV2 {
  orderId?: string;
  userId?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface SubWithdrawalRecordsRequestV2 {
  orderId?: string;
  userId?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

/**
 *
 * * Broker | Subaccount
 *
 */

export interface CreateSubAccountApiKeyRequestV2 {
  subUid: string;
  passphrase: string;
  label?: string;
  ipList: string[];
  permType: string;
  permList: string[];
}

export interface ModifySubAccountApiKeyRequestV2 {
  subUid: string;
  apiKey: string;
  label?: string;
  passphrase: string;
  ipList?: string[];
  permType?: string;
  permList: string[];
}

/**
 *
 * * Broker | All Sub-accounts Deposit and Withdrawal Records
 *
 */

export interface GetAllSubDepositWithdrawalRequestV2 {
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
  type?: 'all' | 'deposit' | 'withdrawal';
}

/**
 *
 * * Broker | Subaccounts
 *
 */

export interface GetBrokerSubaccountsRequestV2 {
  startTime?: string;
  endTime?: string;
  pageSize?: string;
  pageNo?: string;
}

/**
 *
 * * Broker | Commissions
 *
 */

export interface GetBrokerCommissionsRequestV2 {
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

/**
 *
 * * Broker | Trade Volume
 *
 */

export interface GetBrokerTradeVolumeRequestV2 {
  startTime?: string;
  endTime?: string;
  pageSize?: string;
  pageNo?: string;
}
