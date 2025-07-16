export type WsOperation = 'subscribe' | 'unsubscribe' | 'login';

export interface WsOperationLoginParams {
  apiKey: string;
  passphrase: string;
  timestamp: number;
  sign: string;
}

export interface WsRequestOperationBitget<TWSRequestArg> {
  op: WsOperation;
  args?: (TWSRequestArg | string | number)[];
}
