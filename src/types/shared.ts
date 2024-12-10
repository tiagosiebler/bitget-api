import { REST_CLIENT_TYPE_ENUM } from '../util';

export type numberInString = string;

export type OrderSide = 'Buy' | 'Sell';

/**
 * @deprecated use SpotKlineInterval or FuturesKlineInterval, depending on which API group you're using
 */
export type KlineInterval =
  | '1min'
  | '5min'
  | '15min'
  | '30min'
  | '1h'
  | '4h'
  | '6h'
  | '12h'
  | '1M'
  | '1W'
  | '1week'
  | '6Hutc'
  | '12Hutc'
  | '1Dutc'
  | '3Dutc'
  | '1Wutc'
  | '1Mutc';

export type RestClientType =
  (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];
