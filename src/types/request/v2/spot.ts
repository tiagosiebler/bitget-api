type SpotKlineIntervalV2 =
  | '1min'
  | '5min'
  | '15min'
  | '30min'
  | '1h'
  | '4h'
  | '6h'
  | '12h'
  | '1day'
  | '3day'
  | '1week'
  | '1M'
  | '6Hutc'
  | '12Hutc'
  | '1Dutc'
  | '3Dutc'
  | '1Wutc'
  | '1Mutc';

export interface SpotCandlesRequestV2 {
  symbol: string;
  granularity: SpotKlineIntervalV2;
  startTime?: string;
  endTime?: string;
  limit?: string;
}
