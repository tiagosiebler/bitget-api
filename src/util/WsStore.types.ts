export enum WsConnectionStateEnum {
  INITIAL = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  CLOSING = 3,
  RECONNECTING = 4,
  // ERROR = 5,
}

export interface WsStoredState<TWSTopicSubscribeEvent extends object> {
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
   * All the topics we are expected to be subscribed to on this connection (and we automatically resubscribe to if the connection drops)
   *
   * A "Set" and a deep-object-match are used to ensure we only subscribe to a topic once (tracking a list of unique topics we're expected to be connected to)
   */
  subscribedTopics: Set<TWSTopicSubscribeEvent>;
  isAuthenticated?: boolean;
}
