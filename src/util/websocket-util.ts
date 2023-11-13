import { WsKey } from '../types';
import { signMessage } from './node-support';
import { BitgetInstType, WsTopicSubscribeEventArgs } from './WsStore';

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
  Record<'all' | 'public' | 'private', NetworkMap<'livenet'>>
> = {
  mixv1: {
    all: {
      livenet: 'wss://ws.bitget.com/mix/v1/stream',
    },
    public: {
      livenet: 'N/A',
    },
    private: {
      livenet: 'N/A',
    },
  },
  spotv1: {
    all: {
      livenet: 'wss://ws.bitget.com/spot/v1/stream',
    },
    public: {
      livenet: 'N/A',
    },
    private: {
      livenet: 'N/A',
    },
  },
  v2: {
    all: {
      livenet: 'N/A',
    },
    public: {
      livenet: 'wss://ws.bitget.com/v2/ws/public',
    },
    private: {
      livenet: 'wss://ws.bitget.com/v2/ws/private',
    },
  },
};

/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  spotv1: 'spotv1',
  mixv1: 'mixv1',
  v2: 'v2',
} as const;

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  WS_KEY_MAP.spotv1,
  WS_KEY_MAP.mixv1,
];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS = [] as WsKey[];

/**
 * Used to automatically determine if a sub request should be to a public or private ws (when there's two separate connections).
 * Unnecessary if there's only one connection to handle both public & private topics.
 */
export const PRIVATE_TOPICS = ['account', 'orders', 'positions', 'ordersAlgo'];

export function isPrivateChannel<TChannel extends string>(
  channel: TChannel,
): boolean {
  return PRIVATE_TOPICS.includes(channel);
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

/** Force subscription requests to be sent in smaller batches, if a number is returned */
export function getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
  switch (wsKey) {
    case 'mixv1':
    case 'spotv1':
    case 'v2': {
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
