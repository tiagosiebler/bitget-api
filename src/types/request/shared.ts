/** Pagination */
export interface Pagination {
  /** Time after */
  after?: string;
  /** Time before */
  before?: string;
  /** Elements per page */
  limit?: string;
}

export type OrderTimeInForce = 'normal' | 'post_only' | 'fok' | 'ioc';

export interface GetHistoricTradesParams {
  symbol: string;
  limit?: string;
  tradeId?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * The margin type, used directly in building the endpoint URL
 */
export type MarginType = 'crossed' | 'isolated';
