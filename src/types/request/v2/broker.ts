/**
 *
 * * Broker | Subaccount
 *
 */

export interface GetSubaccountsRequest {
  limit?: string;
  idLessThan?: string;
  status?: 'normal' | 'freeze' | 'del';
  startTime?: string;
  endTime?: string;
}

export type SubaccountPermission =
  | 'withdraw'
  | 'transfer'
  | 'spot_trade'
  | 'contract_trade'
  | 'read'
  | 'deposit'
  | 'margin_trade';

export type SubaccountLanguage =
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

export type SubaccountStatus = 'normal' | 'freeze';

export interface ModifySubRequest {
  subUid: string;
  permList: SubaccountPermission[];
  status: SubaccountStatus;
  language?: SubaccountLanguage;
}

export interface SubWithdrawalRequest {
  subUid: string;
  coin: string;
  dest: 'on_chain' | 'internal_transfer';
  chain?: string;
  address: string;
  amount: string;
  tag?: string;
  clientOid?: string;
}

export interface SubDepositRecordsRequest {
  orderId?: string;
  userId?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface SubWithdrawalRecordsRequest {
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

export interface CreateSubaccountApiKeyRequest {
  subUid: string;
  passphrase: string;
  label?: string;
  ipList: string[];
  permType: string;
  permList: string[];
}

export interface ModifySubaccountApiKeyRequest {
  subUid: string;
  apiKey: string;
  label?: string;
  passphrase: string;
  ipList?: string[];
  permType?: string;
  permList: string[];
}
