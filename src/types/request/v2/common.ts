import { FuturesProductTypeV2, MarginType } from '../shared';

/**
 *
 * * Common | Notice
 *
 */

export interface GetAnnouncementsRequest {
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

export interface GetTradeRateRequest {
  symbol: string;
  businessType: string;
}

/**
 *
 * * Common | Tax
 *
 */

export interface GetSpotTransactionsRequest {
  coin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetFuturesTransactionsRequest {
  productType?: FuturesProductTypeV2;
  marginCoin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetMarginTransactionsRequest {
  marginType?: MarginType;
  coin?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetP2PTransactionsRequest {
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

export interface GetP2PMerchantsRequest {
  online?: 'yes' | 'no';
  idLessThan?: string;
  limit?: string;
}

export interface GetMerchantP2POrdersRequest {
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

export interface GetMerchantAdvertisementsRequest {
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

export interface ModifyVirtualSubRequest {
  subAccountUid: string;
  permList: string[];
  status: string;
}

export interface CreateVirtualSubRequest {
  subAccountName: string;
  passphrase: string;
  label: string;
  ipList?: string[];
  permList?: string[];
}

export interface CreateVirtualSubApiKeyRequest {
  subAccountUid: string;
  passphrase: string;
  label: string;
  ipList?: string[];
  permList?: string[];
}

export interface ModifyVirtualSubApiKeyRequest {
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

export interface ConvertQuoteRequest {
  fromCoin: string;
  fromCoinSize?: string;
  toCoin: string;
  toCoinSize?: string;
}

export interface ConvertRequest {
  fromCoin: string;
  fromCoinSize: string;
  cnvtPrice: string;
  toCoin: string;
  toCoinSize: string;
  traceId: string;
}

export interface GetConvertHistoryRequest {
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

export interface GetConvertBGBHistoryRequest {
    orderId?: string;
    startTime: string;
    endTime: string;
    limit?: string;
    idLessThan?: string;
  }