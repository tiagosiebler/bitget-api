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
