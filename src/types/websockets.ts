import { WS_KEY_MAP } from '../util';

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

/** This is used to differentiate between each of the available websocket streams */
export type WsKey = typeof WS_KEY_MAP[keyof typeof WS_KEY_MAP];

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
