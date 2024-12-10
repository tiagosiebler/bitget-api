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

export type SubAccountPermission =
  | 'withdraw'
  | 'transfer'
  | 'spot_trade'
  | 'contract_trade'
  | 'read'
  | 'deposit'
  | 'margin_trade';

export type SubAccountLanguage =
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

export type SubAccountStatus = 'normal' | 'freeze';

export interface ModifySubRequestV2 {
  subUid: string;
  permList: SubAccountPermission[];
  status: SubAccountStatus;
  language?: SubAccountLanguage;
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
