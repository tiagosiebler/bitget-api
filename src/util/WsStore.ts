import WebSocket from 'isomorphic-ws';
import { WsPrivateTopic, WsTopic } from '../types';
import { DefaultLogger } from './logger';

export enum WsConnectionStateEnum {
  INITIAL = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  CLOSING = 3,
  RECONNECTING = 4,
  // ERROR = 5,
}
/** A "topic" is always a string */

export type BitgetInstType = 'SP' | 'SPBL' | 'MC' | 'UMCBL' | 'DMCBL';

// TODO: generalise so this can be made a reusable module for other clients
export interface WsTopicSubscribeEventArgs {
  instType: BitgetInstType;
  channel: WsTopic;
  /** The symbol, e.g. "BTCUSDT" */
  instId: string;
}

type WsTopicList = Set<WsTopicSubscribeEventArgs>;

interface WsStoredState {
  /** The currently active websocket connection */
  ws?: WebSocket;
  /** The current lifecycle state of the connection (enum) */
  connectionState?: WsConnectionStateEnum;
  /** A timer that will send an upstream heartbeat (ping) when it expires */
  activePingTimer?: ReturnType<typeof setTimeout> | undefined;
  /** A timer tracking that an upstream heartbeat was sent, expecting a reply before it expires */
  activePongTimer?: ReturnType<typeof setTimeout> | undefined;
  /** If a reconnection is in progress, this will have the timer for the delayed reconnect */
  activeReconnectTimer?: ReturnType<typeof setTimeout> | undefined;
  /**
   * All the topics we are expected to be subscribed to (and we automatically resubscribe to if the connection drops)
   *
   * A "Set" and a deep object match are used to ensure we only subscribe to a topic once (tracking a list of unique topics we're expected to be connected to)
   */
  subscribedTopics: WsTopicList;
  isAuthenticated?: boolean;
}

function isDeepObjectMatch(object1: any, object2: any) {
  for (const key in object1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

export default class WsStore<WsKey extends string> {
  private wsState: Record<string, WsStoredState> = {};
  private logger: typeof DefaultLogger;

  constructor(logger: typeof DefaultLogger) {
    this.logger = logger || DefaultLogger;
  }

  /** Get WS stored state for key, optionally create if missing */
  get(key: WsKey, createIfMissing?: true): WsStoredState;
  get(key: WsKey, createIfMissing?: false): WsStoredState | undefined;
  get(key: WsKey, createIfMissing?: boolean): WsStoredState | undefined {
    if (this.wsState[key]) {
      return this.wsState[key];
    }

    if (createIfMissing) {
      return this.create(key);
    }
  }

  getKeys(): WsKey[] {
    return Object.keys(this.wsState) as WsKey[];
  }

  create(key: WsKey): WsStoredState | undefined {
    if (this.hasExistingActiveConnection(key)) {
      this.logger.warning(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key)
      );
    }
    this.wsState[key] = {
      subscribedTopics: new Set(),
      connectionState: WsConnectionStateEnum.INITIAL,
    };
    return this.get(key);
  }

  delete(key: WsKey): void {
    // TODO: should we allow this at all? Perhaps block this from happening...
    if (this.hasExistingActiveConnection(key)) {
      const ws = this.getWs(key);
      this.logger.warning(
        'WsStore deleting state for connection still open: ',
        ws
      );
      ws?.close();
    }
    delete this.wsState[key];
  }

  /* connection websocket */

  hasExistingActiveConnection(key: WsKey): boolean {
    return this.get(key) && this.isWsOpen(key);
  }

  getWs(key: WsKey): WebSocket | undefined {
    return this.get(key)?.ws;
  }

  setWs(key: WsKey, wsConnection: WebSocket): WebSocket {
    if (this.isWsOpen(key)) {
      this.logger.warning(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key)
      );
    }

    this.get(key, true).ws = wsConnection;
    return wsConnection;
  }

  /* connection state */

  isWsOpen(key: WsKey): boolean {
    const existingConnection = this.getWs(key);
    return (
      !!existingConnection &&
      existingConnection.readyState === existingConnection.OPEN
    );
  }

  getConnectionState(key: WsKey): WsConnectionStateEnum {
    return this.get(key, true).connectionState!;
  }

  setConnectionState(key: WsKey, state: WsConnectionStateEnum) {
    this.get(key, true).connectionState = state;
  }

  isConnectionState(key: WsKey, state: WsConnectionStateEnum): boolean {
    return this.getConnectionState(key) === state;
  }

  /* subscribed topics */

  getTopics(key: WsKey): WsTopicList {
    return this.get(key, true).subscribedTopics;
  }

  getTopicsByKey(): Record<string, WsTopicList> {
    const result = {};
    for (const refKey in this.wsState) {
      result[refKey] = this.getTopics(refKey as WsKey);
    }
    return result;
  }

  // Since topics are objects we can't rely on the set to detect duplicates
  getMatchingTopic(key: WsKey, topic: WsTopicSubscribeEventArgs) {
    // if (typeof topic === 'string') {
    //   return this.getMatchingTopic(key, { channel: topic });
    // }

    const allTopics = this.getTopics(key).values();
    for (const storedTopic of allTopics) {
      if (isDeepObjectMatch(topic, storedTopic)) {
        return storedTopic;
      }
    }
  }

  addTopic(key: WsKey, topic: WsTopicSubscribeEventArgs) {
    // if (typeof topic === 'string') {
    //   return this.addTopic(key, {
    //     instType: 'sp',
    //     channel: topic,
    //     instId: 'default',
    //   };
    // }
    // Check for duplicate topic. If already tracked, don't store this one
    const existingTopic = this.getMatchingTopic(key, topic);
    if (existingTopic) {
      return this.getTopics(key);
    }
    return this.getTopics(key).add(topic);
  }

  deleteTopic(key: WsKey, topic: WsTopicSubscribeEventArgs) {
    // Check if we're subscribed to a topic like this
    const storedTopic = this.getMatchingTopic(key, topic);
    if (storedTopic) {
      this.getTopics(key).delete(storedTopic);
    }

    return this.getTopics(key);
  }
}
