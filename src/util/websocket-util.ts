import {
  BitgetInstType,
  WsKey,
  WsPrivateTopicV2,
  WsTopicSubscribeEventArgs,
  WsTopicSubscribePublicArgsV2,
} from '../types';
import { signMessage } from './node-support';

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
  Record<'all', NetworkMap<'livenet'>>
> = {
  mixv1: {
    all: {
      livenet: 'wss://ws.bitget.com/mix/v1/stream',
    },
  },
  spotv1: {
    all: {
      livenet: 'wss://ws.bitget.com/spot/v1/stream',
    },
  },
  v2Public: {
    all: {
      livenet: 'wss://ws.bitget.com/v2/ws/public',
    },
  },
  v2Private: {
    all: {
      livenet: 'wss://ws.bitget.com/v2/ws/private',
    },
  },
};

/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  spotv1: 'spotv1',
  mixv1: 'mixv1',
  v2Public: 'v2Public',
  v2Private: 'v2Private',
} as const;

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  WS_KEY_MAP.spotv1,
  WS_KEY_MAP.mixv1,
  WS_KEY_MAP.v2Private,
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
    case 'v2Private': {
      // Technically there doesn't seem to be a documented cap, but there is a size limit per request. Doesn't hurt to batch requests.
      return 15;
    }
    default: {
      throw neverGuard(wsKey, `getWsKeyForTopic(): Unhandled wsKey`);
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
      `Cannot auth - missing api key, secret or passcode in config`,
    );
  }
  const signatureExpiresAt = ((Date.now() + recvWindow) / 1000).toFixed(0);

  const signature = await signMessage(
    signatureExpiresAt + 'GET' + '/user/verify',
    apiSecret,
    'base64',
  );

  return {
    expiresAt: Number(signatureExpiresAt),
    signature,
  };
}
