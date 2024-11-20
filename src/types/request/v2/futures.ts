import { FuturesProductTypeV2 } from '../shared';
import { FuturesKlineInterval } from '../v1/futuresV1';

export type FuturesKlineTypeV2 = 'MARKET' | 'MARK' | 'INDEX';

export interface FuturesAccountBillRequestV2 {
  productType: FuturesProductTypeV2;
  symbol?: string;
  coin?: string;
  businessType?: string;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface FuturesCandlesRequestV2 {
  symbol: string;
  productType: FuturesProductTypeV2;
  granularity: FuturesKlineInterval;
  startTime?: string;
  endTime?: string;
  kLineType?: FuturesKlineTypeV2;
  limit?: string;
}
