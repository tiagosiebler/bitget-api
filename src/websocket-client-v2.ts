import WebSocket from 'isomorphic-ws';

import {
  BitgetInstTypeV2,
  WebsocketClientOptions,
  WsCoinChannelsV2,
  WsInstIdChannelsV2,
  WsKey,
  WsPublicTopicV2,
  WsTopicSubscribeEventArgsV2,
  WsTopicSubscribePrivateCoinArgsV2,
  WsTopicSubscribePrivateInstIdArgsV2,
  WsTopicV2,
} from './types';

import {
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  DefaultLogger,
  WS_BASE_URL_MAP,
  neverGuard,
  getMaxTopicsPerSubscribeEvent,
  isPrivateChannel,
} from './util';

import { BaseWebsocketClient } from './util/BaseWSClient';

const LOGGER_CATEGORY = { category: 'bitget-ws' };

const COIN_CHANNELS: WsTopicV2[] = [
  'account',
  'account-crossed',
  'account-isolated',
];

export class WebsocketClientV2 extends BaseWebsocketClient<
  WsKey,
  WsTopicSubscribeEventArgsV2
> {
  protected logger: typeof DefaultLogger;
  protected options: WebsocketClientOptions;

  protected getWsKeyForTopic(
    subscribeEvent: WsTopicSubscribeEventArgsV2,
    isPrivate?: boolean,
  ): WsKey {
    return isPrivate || isPrivateChannel(subscribeEvent.channel)
      ? WS_KEY_MAP.v2Private
      : WS_KEY_MAP.v2Public;
  }

  protected isPrivateChannel(
    subscribeEvent: WsTopicSubscribeEventArgsV2,
  ): boolean {
    return isPrivateChannel(subscribeEvent.channel);
  }

  protected shouldAuthOnConnect(wsKey: WsKey): boolean {
    return WS_AUTH_ON_CONNECT_KEYS.includes(wsKey as WsKey);
  }

  protected getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey = 'livenet';

    switch (wsKey) {
      case WS_KEY_MAP.spotv1:
      case WS_KEY_MAP.mixv1: {
        throw new Error(
          `Use the WebsocketClient instead of WebsocketClientV2 for V1 websockets`,
        );
      }
      case WS_KEY_MAP.v2Private: {
        return WS_BASE_URL_MAP.v2Private.all[networkKey];
      }
      case WS_KEY_MAP.v2Public: {
        return WS_BASE_URL_MAP.v2Public.all[networkKey];
      }
      default: {
        this.logger.error('getWsUrl(): Unhandled wsKey: ', {
          ...LOGGER_CATEGORY,
          wsKey,
        });
        throw neverGuard(wsKey, `getWsUrl(): Unhandled wsKey`);
      }
    }
  }

  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    return getMaxTopicsPerSubscribeEvent(wsKey);
  }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.v2Private),
      this.connect(WS_KEY_MAP.v2Public),
    ];
  }

  /** Some private channels use `coin` instead of `instId`. This method handles building the sub/unsub request */
  private getSubRequest(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    coin: string = 'default',
  ): WsTopicSubscribeEventArgsV2 {
    if (isPrivateChannel(topic)) {
      if (COIN_CHANNELS.includes(topic)) {
        const subscribeRequest: WsTopicSubscribePrivateCoinArgsV2 = {
          instType,
          channel: topic as WsCoinChannelsV2,
          coin,
        };
        return subscribeRequest;
      }

      const subscribeRequest: WsTopicSubscribePrivateInstIdArgsV2 = {
        instType,
        channel: topic as WsInstIdChannelsV2,
        instId: coin,
      };

      return subscribeRequest;
    }

    return {
      instType,
      channel: topic as WsPublicTopicV2,
      instId: coin,
    };
  }

  /**
   * Subscribe to a PUBLIC topic
   * @param instType instrument type (refer to API docs).
   * @param topic topic name (e.g. "ticker").
   * @param instId instrument ID (e.g. "BTCUSDT"). Use "default" for private topics.
   */
  public subscribeTopic(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    coin: string = 'default',
  ) {
    const subRequest = this.getSubRequest(instType, topic, coin);
    return this.subscribe(subRequest);
  }

  /**
   * Unsubscribe from a topic
   * @param instType instrument type (refer to API docs).
   * @param topic topic name (e.g. "ticker").
   * @param instId instrument ID (e.g. "BTCUSDT"). Use "default" for private topics to get all symbols.
   */
  public unsubscribeTopic(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    coin: string = 'default',
  ) {
    const subRequest = this.getSubRequest(instType, topic, coin);
    return this.unsubscribe(subRequest);
  }
}
