import { WS_KEY_MAP } from '../../util';
import { FuturesProductTypeV2 } from '../request';

/** A "topic" is always a string */
export type BitgetInstType = 'SP' | 'SPBL' | 'MC' | 'UMCBL' | 'DMCBL';
export type BitgetInstTypeV2 = 'SPOT' | FuturesProductTypeV2;

export type WsPublicSpotTopic =
  | 'ticker'
  | 'candle1W'
  | 'candle1D'
  | 'candle12H'
  | 'candle4H'
  | 'candle1H'
  | 'candle30m'
  | 'candle15m'
  | 'candle5m'
  | 'candle1m'
  | 'books'
  | 'books5'
  | 'trade';

// Futures currently has the same public topics as spot
export type WsPublicFuturesTopic = WsPublicSpotTopic;
export type WsPrivateSpotTopic = 'account' | 'orders';

export type WsPrivateFuturesTopic =
  | 'account'
  | 'positions'
  | 'orders'
  | 'ordersAlgo';

export type WsPublicTopic = WsPublicSpotTopic | WsPublicFuturesTopic;
export type WsPrivateTopic = WsPrivateSpotTopic | WsPrivateFuturesTopic;
export type WsTopic = WsPublicTopic | WsPrivateTopic;

export type WsPublicTopicV2 =
  | 'index-price' // margin only
  | 'ticker'
  | 'candle1m'
  | 'candle5m'
  | 'candle15'
  | 'candle30m'
  | 'candle1H'
  | 'candle4H'
  | 'candle6H'
  | 'candle12H'
  | 'candle1D'
  | 'candle3D'
  | 'candle1W'
  | 'candle1M'
  | 'candle6Hutc'
  | 'candle12Hutc'
  | 'candle1Dutc'
  | 'candle3Dutc'
  | 'candle1Wutc'
  | 'candle1Mutc'
  | 'trade'
  | 'books'
  | 'books1'
  | 'books5'
  | 'books15';

export type WSPrivateTopicFuturesV2 =
  | 'positions'
  | 'orders-algo'
  | 'positions-history';

export type WSPrivateTopicMarginV2 =
  | 'orders-crossed'
  | 'account-crossed'
  | 'account-isolated'
  | 'orders-isolated';

export type WsPrivateTopicV2 =
  | 'account'
  | 'orders'
  | WSPrivateTopicFuturesV2
  | WSPrivateTopicMarginV2;

export type WsTopicV2 = WsPublicTopicV2 | WsPrivateTopicV2;

/** This is used to differentiate between each of the available websocket streams */
export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];

/**
 * Event args for subscribing/unsubscribing
 */

export interface WsTopicSubscribeEventArgs {
  instType: BitgetInstType;
  channel: WsTopic;
  instId?: string;
}

export type WsTopicSubscribePublicArgsV2 = {
  instType: BitgetInstTypeV2;
  channel: WsPublicTopicV2;
  /** The symbol, e.g. "BTCUSDT" */
  instId: string;
};

export type WsInstIdChannelsV2 =
  | 'orders'
  | WSPrivateTopicFuturesV2
  | 'orders-crossed'
  | 'orders-isolated';

export type WsTopicSubscribePrivateInstIdArgsV2 = {
  instType: BitgetInstTypeV2;
  channel: WsInstIdChannelsV2;
  /** The symbol, e.g. "BTCUSDT" */
  instId?: string;
};

export type WsCoinChannelsV2 =
  | 'account'
  | 'account-crossed'
  | 'account-isolated';

export type WsTopicSubscribePrivateCoinArgsV2 = {
  instType: BitgetInstTypeV2;
  channel: WsCoinChannelsV2;
  coin: 'default' | string;
};

export type WsTopicSubscribePrivateArgsV2 =
  | WsTopicSubscribePrivateInstIdArgsV2
  | WsTopicSubscribePrivateCoinArgsV2;

export type WsTopicSubscribeEventArgsV2 =
  | WsTopicSubscribePublicArgsV2
  | WsTopicSubscribePrivateArgsV2;

/** General configuration for the WebsocketClient */
export interface WSClientConfigurableOptions {
  /** Your API key */
  apiKey?: string;

  /** Your API secret */
  apiSecret?: string;

  /** The passphrase you set when creating the API Key (NOT your account password) */
  apiPass?: string;

  /** How often to check if the connection is alive */
  pingInterval?: number;

  /** How long to wait for a pong (heartbeat reply) before assuming the connection is dead */
  pongTimeout?: number;

  /** Delay in milliseconds before respawning the connection */
  reconnectTimeout?: number;

  requestOptions?: {
    /** override the user agent when opening the websocket connection (some proxies use this) */
    agent?: string;
  };

  wsUrl?: string;

  /** Define a recv window when preparing a private websocket signature. This is in milliseconds, so 5000 == 5 seconds */
  recvWindow?: number;
}

export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  pingInterval: number;
  pongTimeout: number;
  reconnectTimeout: number;
  recvWindow: number;
}
