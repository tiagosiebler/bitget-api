import {
  BitgetInstType,
  WebsocketClientOptions,
  WsKey,
  WsPrivateTopicV2,
  WsTopicSubscribeEventArgs,
  WsTopicSubscribePublicArgsV2,
} from '../types';
import { DefaultLogger } from './logger';
import { signMessage } from './node-support';

export const WS_LOGGER_CATEGORY = { category: 'bitget-ws' };

/**
 * Some exchanges have two livenet environments, some have test environments, some dont. This allows easy flexibility for different exchanges.
 * Examples:
 *  - One livenet and one testnet: NetworkMap<'livenet' | 'testnet'>
 *  - One livenet, sometimes two, one testnet: NetworkMap<'livenet' | 'testnet', 'livenet2'>
 *  - Only one livenet, no other networks: NetworkMap<'livenet'>
 */
type NetworkMap<
  TRequiredKeys extends string,
  TOptionalKeys extends string | undefined = undefined,
> = Record<TRequiredKeys, string> &
  (TOptionalKeys extends string
    ? Record<TOptionalKeys, string | undefined>
    : Record<TRequiredKeys, string>);

export const WS_BASE_URL_MAP: Record<
  WsKey,
  Record<'all', NetworkMap<'livenet' | 'demo'>>
> = {
  mixv1: {
    all: {
      livenet: 'wss://ws.bitget.com/mix/v1/stream',
      demo: 'NotSupportedForV1',
    },
  },
  spotv1: {
    all: {
      livenet: 'wss://ws.bitget.com/spot/v1/stream',
      demo: 'NotSupportedForV1',
    },
  },
  v2Public: {
    all: {
      livenet: 'wss://ws.bitget.com/v2/ws/public',
      demo: 'wss://wspap.bitget.com/v2/ws/public',
    },
  },
  v2Private: {
    all: {
      livenet: 'wss://ws.bitget.com/v2/ws/private',
      demo: 'wss://wspap.bitget.com/v2/ws/private',
    },
  },
  v3Public: {
    all: {
      livenet: 'wss://ws.bitget.com/v3/ws/public',
      demo: 'wss://wspap.bitget.com/v3/ws/public',
    },
  },
  v3Private: {
    all: {
      livenet: 'wss://ws.bitget.com/v3/ws/private',
      demo: 'wss://wspap.bitget.com/v3/ws/private',
    },
  },
};

/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  spotv1: 'spotv1',
  mixv1: 'mixv1',
  v2Public: 'v2Public',
  v2Private: 'v2Private',
  v3Public: 'v3Public',
  v3Private: 'v3Private',
} as const;

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  WS_KEY_MAP.spotv1,
  WS_KEY_MAP.mixv1,
  WS_KEY_MAP.v2Private,
  WS_KEY_MAP.v3Private,
];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS = [] as WsKey[];

/**
 * Used to automatically determine if a sub request should be to a public or private ws (when there's two separate connections).
 * Unnecessary if there's only one connection to handle both public & private topics.
 */
export const PRIVATE_TOPICS = ['account', 'orders', 'positions', 'ordersAlgo'];

export const PRIVATE_TOPICS_V2: WsPrivateTopicV2[] = [
  'account',
  'orders',
  'positions',
  'orders-algo',
  'positions-history',
  'orders-crossed',
  'account-crossed',
  'account-isolated',
  'orders-isolated',
];

export async function getWsUrl(
  wsKey: WsKey,
  options: WebsocketClientOptions,
  logger: DefaultLogger,
): Promise<string> {
  if (options.wsUrl) {
    return options.wsUrl;
  }

  const isDemoTrading = options.demoTrading;
  const networkKey: 'livenet' | 'demo' = isDemoTrading ? 'demo' : 'livenet';

  switch (wsKey) {
    case WS_KEY_MAP.spotv1:
    case WS_KEY_MAP.mixv1: {
      throw new Error(
        'Use the WebsocketClient instead of WebsocketClientV2 for V1 websockets',
      );
    }
    case WS_KEY_MAP.v2Private: {
      return WS_BASE_URL_MAP.v2Private.all[networkKey];
    }
    case WS_KEY_MAP.v2Public: {
      return WS_BASE_URL_MAP.v2Public.all[networkKey];
    }
    case WS_KEY_MAP.v3Private: {
      return WS_BASE_URL_MAP.v3Private.all[networkKey];
    }
    case WS_KEY_MAP.v3Public: {
      return WS_BASE_URL_MAP.v3Public.all[networkKey];
    }
    default: {
      logger.error('getWsUrl(): Unhandled wsKey: ', {
        ...WS_LOGGER_CATEGORY,
        wsKey,
      });
      throw neverGuard(wsKey, 'getWsUrl(): Unhandled wsKey');
    }
  }
}

/**
 * Normalised internal format for a request (subscribe/unsubscribe/etc) on a topic, with optional parameters.
 *
 * - Topic: the topic this event is for
 * - Payload: the parameters to include, optional. E.g. auth requires key + sign. Some topics allow configurable parameters.
 * - Category: required for bybit, since different categories have different public endpoints
 */
export interface WsTopicRequest<
  TWSTopic extends string = string,
  TWSPayload = unknown,
> {
  topic: TWSTopic;
  payload?: TWSPayload;
}

/**
 * Conveniently allow users to request a topic either as string topics or objects (containing string topic + params)
 */
export type WsTopicRequestOrStringTopic<
  TWSTopic extends string,
  TWSPayload = unknown,
> = WsTopicRequest<TWSTopic, TWSPayload> | string;

export function isPrivateChannel<TChannel extends string>(
  channel: TChannel,
): boolean {
  return (
    PRIVATE_TOPICS.includes(channel) ||
    PRIVATE_TOPICS_V2.includes(channel as any)
  );
}

export function getWsKeyForTopic(
  subscribeEvent: WsTopicSubscribeEventArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPrivate?: boolean,
): WsKey {
  const instType = subscribeEvent.instType.toUpperCase() as BitgetInstType;
  switch (instType) {
    case 'SP':
    case 'SPBL': {
      return WS_KEY_MAP.spotv1;
    }
    case 'MC':
    case 'UMCBL':
    case 'DMCBL': {
      return WS_KEY_MAP.mixv1;
    }
    default: {
      throw neverGuard(
        instType,
        `getWsKeyForTopic(): Unhandled market ${'instrumentId'}`,
      );
    }
  }
}

export function getWsKeyForTopicV2(
  subscribeEvent: WsTopicSubscribePublicArgsV2,
  isPrivate?: boolean,
): WsKey {
  return isPrivate || isPrivateChannel(subscribeEvent.channel)
    ? WS_KEY_MAP.v2Private
    : WS_KEY_MAP.v2Public;
}

/** Force subscription requests to be sent in smaller batches, if a number is returned */
export function getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
  switch (wsKey) {
    case 'mixv1':
    case 'spotv1':
    case 'v2Public':
    case 'v2Private':
    case 'v3Public':
    case 'v3Private': {
      // Technically there doesn't seem to be a documented cap, but there is a size limit per request. Doesn't hurt to batch requests.
      return 15;
    }
    default: {
      throw neverGuard(wsKey, 'getWsKeyForTopic(): Unhandled wsKey');
    }
  }
}

export const WS_ERROR_ENUM = {
  INVALID_ACCESS_KEY: 30011,
};

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}

export async function getWsAuthSignature(
  apiKey: string | undefined,
  apiSecret: string | undefined,
  apiPass: string | undefined,
  recvWindow: number = 0,
): Promise<{
  expiresAt: number;
  signature: string;
}> {
  if (!apiKey || !apiSecret || !apiPass) {
    throw new Error(
      'Cannot auth - missing api key, secret or passcode in config',
    );
  }
  const signatureExpiresAt = ((Date.now() + recvWindow) / 1000).toFixed(0);

  const signature = await signMessage(
    signatureExpiresAt + 'GET' + '/user/verify',
    apiSecret,
    'base64',
    'SHA-256',
  );

  return {
    expiresAt: Number(signatureExpiresAt),
    signature,
  };
}

/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined. Does nothing in browsers.
 */
export function safeTerminateWs(
  ws?: WebSocket | any,
  fallbackToClose?: boolean,
): boolean {
  if (!ws) {
    return false;
  }
  if (typeof ws['terminate'] === 'function') {
    ws.terminate();
    return true;
  } else if (fallbackToClose) {
    ws.close();
  }

  return false;
}
/**
 * Users can conveniently pass topics as strings or objects (object has topic name + optional params).
 *
 * This method normalises topics into objects (object has topic name + optional params).
 */
export function getNormalisedTopicRequests(
  wsTopicRequests: WsTopicRequestOrStringTopic<string>[],
): WsTopicRequest<string>[] {
  const normalisedTopicRequests: WsTopicRequest<string>[] = [];

  for (const wsTopicRequest of wsTopicRequests) {
    // passed as string, convert to object
    if (typeof wsTopicRequest === 'string') {
      const topicRequest: WsTopicRequest<string> = {
        topic: wsTopicRequest,
        payload: undefined,
      };
      normalisedTopicRequests.push(topicRequest);
      continue;
    }

    // already a normalised object, thanks to user
    normalisedTopicRequests.push(wsTopicRequest);
  }
  return normalisedTopicRequests;
}

/**
 * WebSocket.ping() is not available in browsers. This is a simple check used to
 * disable heartbeats in browers, for exchanges that use native WebSocket ping/pong frames.
 */
export function isWSPingFrameAvailable(): boolean {
  return typeof WebSocket.prototype['ping'] === 'function';
}

/**
 * WebSocket.pong() is not available in browsers. This is a simple check used to
 * disable heartbeats in browers, for exchanges that use native WebSocket ping/pong frames.
 */
export function isWSPongFrameAvailable(): boolean {
  return typeof WebSocket.prototype['pong'] === 'function';
}
