import WebSocket from 'isomorphic-ws';

import {
  BitgetInstTypeV2,
  WebsocketClientOptions,
  WsKey,
  WsTopicSubscribeEventArgsV2,
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

  /**
   * Subscribe to a PUBLIC topic
   * @param instType instrument type (refer to API docs).
   * @param topic topic name (e.g. "ticker").
   * @param instId instrument ID (e.g. "BTCUSDT"). Use "default" for private topics.
   */
  public subscribeTopic(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    instId: string = 'default',
  ) {
    return this.subscribe({
      instType,
      instId,
      channel: topic,
    });
  }

  // public subscribeTopicV2(
  //   instType: BitgetInstTypeV2,
  //   topic: WsTopicV2,
  //   instId: string = 'default',
  // ) {
  //   if (isPrivateChannel(topic)) {
  //   }
  // }

  /**
   * Unsubscribe from a topic
   * @param instType instrument type (refer to API docs).
   * @param topic topic name (e.g. "ticker").
   * @param instId instrument ID (e.g. "BTCUSDT"). Use "default" for private topics to get all symbols.
   *
   * @deprecated, use `subscribe(topics, isPrivate) instead
   */
  public unsubscribeTopic(
    instType: BitgetInstTypeV2,
    topic: WsTopicV2,
    instId: string = 'default',
  ) {
    return this.unsubscribe({
      instType,
      instId,
      channel: topic,
    });
  }
}
