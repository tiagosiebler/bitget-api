export interface APIResponse<T> {
  code: string;
  data: T;
  msg: 'success' | string;
  requestTime: number;
}
