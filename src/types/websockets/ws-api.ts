export type WsOperation = 'subscribe' | 'unsubscribe' | 'login';

export interface WsOperationLoginParams {
  apiKey: string;
  passphrase: string;
  timestamp: number;
  sign: string;
}

/**
 * V2 request looks like this:
{
  "op":"subscribe",
  "args":[
      {
          "instType":"SPOT",
          "channel":"ticker",
          "instId":"BTCUSDT"
      },
      {
          "instType":"SPOT",
          "channel":"candle5m",
          "instId":"BTCUSDT"
      }
  ]
}
 */

export interface WsRequestOperationBitgetV2<TWSRequestArg> {
  op: WsOperation;
  args?: (TWSRequestArg | string | number)[];
}
