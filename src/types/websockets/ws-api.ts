import { WS_KEY_MAP } from '../../util/websocket-util.js';
import { CancelOrderRequestV3 } from '../request/v3/trade.js';
import { CancelOrderResponseV3 } from '../response/v3/trade.js';
import { WSAPIPlaceOrderRequestV3 } from './ws-api-request.js';
import { WSAPIPlaceOrderResponseV3 } from './ws-api-response.js';
import { BitgetInstTypeV3, WsKey } from './ws-general.js';

export type WSOperation = 'subscribe' | 'unsubscribe' | 'login';

// When new WS API operations are added, make sure to also update WS_API_Operations[] below
export type WSAPIOperation =
  | 'place-order'
  | 'batch-place'
  | 'cancel-order'
  | 'batch-cancel';

export const WS_API_Operations: WSAPIOperation[] = [
  'place-order',
  'batch-place',
  'cancel-order',
  'batch-cancel',
];

export interface WSOperationLoginParams {
  apiKey: string;
  passphrase: string;
  timestamp: number;
  sign: string;
}

export interface WSAPIRequestBitgetV3<TWSParams> {
  op: 'trade';
  id: string;
  category: BitgetInstTypeV3;
  topic: WSAPIOperation;
  args: TWSParams | TWSParams[];
}

export interface WSAPIRequestFlags {
  /** If true, will skip auth requirement for WS API connection */
  authIsOptional?: boolean | undefined;
}

export type Exact<T> = {
  // This part says: if there's any key that's not in T, it's an error
  [K: string]: never;
} & {
  [K in keyof T]: T[K];
};

/**

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
export interface WsRequestOperationBitget<TWSRequestArg> {
  op: WSOperation;
  args?: (TWSRequestArg | string | number)[];
}
export interface WSAPIResponse<
  TResponseData extends object = object,
  TOperation extends WSAPIOperation = WSAPIOperation,
> {
  wsKey: WsKey;
  /** Auto-generated */
  id: string;
  event: 'trade';
  category: BitgetInstTypeV3;
  topic: TOperation;
  args: TResponseData;
  code: '0' | string;
  msg: 'success' | string;
  ts: string;
}

/**
 * List of operations supported for this WsKey (connection)
 */
export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.v3Private]: WSAPIOperation;
}

/**
 * Request parameters expected per operation
 */
export interface WsAPITopicRequestParamMap {
  // https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel#request-parameters
  'place-order': WSAPIPlaceOrderRequestV3;
  // https://www.bitget.com/api-doc/uta/websocket/private/Batch-Place-Order-Channel
  'batch-place': WSAPIPlaceOrderRequestV3[];
  // https://www.bitget.com/api-doc/uta/websocket/private/Cancel-Order-Channel
  'cancel-order': CancelOrderRequestV3;
  // https://www.bitget.com/api-doc/uta/websocket/private/Batch-Cancel-Order-Channel
  'batch-cancel': CancelOrderRequestV3[];
}

/**
 * Response structure expected for each operation
 */
export interface WsAPIOperationResponseMap {
  // https://www.bitget.com/api-doc/uta/websocket/private/Place-Order-Channel#request-parameters
  'place-order': WSAPIResponse<[WSAPIPlaceOrderResponseV3], 'place-order'>;
  // https://www.bitget.com/api-doc/uta/websocket/private/Batch-Place-Order-Channel
  'batch-place': WSAPIResponse<WSAPIPlaceOrderResponseV3[], 'batch-place'>;
  // https://www.bitget.com/api-doc/uta/websocket/private/Cancel-Order-Channel
  'cancel-order': WSAPIResponse<[CancelOrderResponseV3], 'cancel-order'>;
  // https://www.bitget.com/api-doc/uta/websocket/private/Batch-Cancel-Order-Channel
  'batch-cancel': WSAPIResponse<CancelOrderResponseV3[], 'batch-cancel'>;
}
