import { FuturesProductTypeV2, MarginType } from '../shared';

/**
 *
 * * Common | Notice
 *
 */

export interface GetAnnouncementsRequestV2 {
  annType?: string;
  startTime?: string;
  endTime?: string;
  language: string;
}

/**
 *
 * * Common | Public
 *
 */

export interface GetTradeRateRequestV2 {
  symbol: string;
  businessType: string;
}

/**
 *
 * * Common | Tax
 *
 */

export interface GetSpotTransactionsRequestV2 {
  coin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetFuturesTransactionsRequestV2 {
  productType?: FuturesProductTypeV2;
  marginCoin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetMarginTransactionsRequestV2 {
  marginType?: MarginType;
  coin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetP2PTransactionsRequestV2 {
  coin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

/**
 *
 * * Common | P2P
 *
 */

export interface GetP2PMerchantsRequestV2 {
  online?: 'yes' | 'no';
  idLessThan?: string;
  limit?: string;
}

export interface GetMerchantP2POrdersRequestV2 {
  startTime: string;
  endTime?: string;
  idLessThan?: string;
  limit?: string;
  status?: string;
  advNo: string;
  side?: string;
  coin?: string;
  language: string;
  fiat?: string;
  orderNo?: string;
}

export interface GetMerchantAdvertisementsRequestV2 {
  startTime: string;
  endTime?: string;
  idLessThan?: string;
  limit?: string;
  status: string;
  advNo?: string;
  side: string;
  coin: string;
  language?: string;
  fiat: string;
  orderBy?: string;
  payMethodId?: string;
  sourceType?: string;
}

/**
 *
 * * Common | Virtual Subaccount
 *
 */

export interface ModifyVirtualSubRequestV2 {
  subAccountUid: string;
  permList: string[];
  status: string;
}

export interface CreateVirtualSubRequestV2 {
  subAccountName: string;
  passphrase: string;
  label: string;
  ipList?: string[];
  permList?: string[];
}

export interface CreateVirtualSubApiKeyRequestV2 {
  subAccountUid: string;
  passphrase: string;
  label: string;
  ipList?: string[];
  permList?: string[];
}

export interface ModifyVirtualSubApiKeyRequestV2 {
  subAccountUid: string;
  subAccountApiKey: string;
  passphrase: string;
  label: string;
  ipList?: string[];
  permList?: string[];
}

/**
 *
 * * Common | Convert
 *
 */

export interface ConvertQuoteRequestV2 {
  fromCoin: string;
  fromCoinSize?: string;
  toCoin: string;
  toCoinSize?: string;
}

export interface ConvertRequestV2 {
  fromCoin: string;
  fromCoinSize: string;
  cnvtPrice: string;
  toCoin: string;
  toCoinSize: string;
  traceId: string;
}

export interface GetConvertHistoryRequestV2 {
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

/**
 *
 * * Common | BGB Convert
 *
 */

export interface GetConvertBGBHistoryRequestV2 {
  orderId?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}
