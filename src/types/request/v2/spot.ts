import { SpotKlineInterval } from '../v1/spotV1';

export interface SpotCandlesRequestV2 {
  symbol: string;
  granularity: SpotKlineInterval;
  startTime?: string;
  endTime?: string;
  limit?: string;
}
