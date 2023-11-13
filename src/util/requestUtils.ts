export interface RestClientOptions {
  /** Your API key */
  apiKey?: string;

  /** Your API secret */
  apiSecret?: string;

  /** The passphrase you set when creating the API Key (NOT your account password) */
  apiPass?: string;

  /** Set to `true` to connect to testnet. Uses the live environment by default. */
  // testnet?: boolean;

  /** Override the max size of the request window (in ms) */
  recvWindow?: number;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strictParamValidation?: boolean;

  /**
   * Default: true.
   * If true, query string values will be URI Encoded (encodeURIComponent).
   * This prevents sign errors with GET requests containing unusual parameters (spaces, symbols, etc).
   */
  encodeQueryStringValues?: boolean;

  /**
   * Optionally override API protocol + domain
   * e.g baseUrl: 'https://api.bitget.com'
   **/
  baseUrl?: string;

  /** Default: true. whether to try and post-process request exceptions (and throw them). */
  parseExceptions?: boolean;
}

export function serializeParams<T extends object | undefined = {}>(
  params: T,
  strict_validation = false,
  encodeValues: boolean = true,
  prefixWith: string = '',
): string {
  if (!params) {
    return '';
  }

  const queryString = Object.keys(params)
    .sort()
    .map((key) => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error(
          'Failed to sign API request due to undefined parameter',
        );
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      return `${key}=${encodedValue}`;
    })
    .join('&');

  // Only prefix if there's a value
  return queryString ? prefixWith + queryString : queryString;
}

export function getRestBaseUrl(
  useTestnet: boolean,
  restInverseOptions: RestClientOptions,
): string {
  const exchangeBaseUrls = {
    livenet: 'https://api.bitget.com',
    livenet2: 'https://capi.bitget.com',
    testnet: 'https://noTestnet',
  };

  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useTestnet) {
    return exchangeBaseUrls.testnet;
  }

  return exchangeBaseUrls.livenet;
}

export function isWsPong(msg: any): boolean {
  // bitget
  if (msg?.data === 'pong') {
    return true;
  }
  return false;
}

/**
 * Used to switch how authentication/requests work under the hood (primarily for SPOT since it's different there)
 */
export const REST_CLIENT_TYPE_ENUM = {
  spot: 'spot',
  futures: 'futures',
  broker: 'broker',
  v2: 'v2',
} as const;
