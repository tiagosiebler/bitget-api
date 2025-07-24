/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLogger, WebsocketClientLegacyV1 } from '../src/index.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getSilentLogger(_logHint?: string): DefaultLogger {
  return {
    trace: () => {},
    info: () => {},
    error: () => {},
  };
}

export const fullLogger: DefaultLogger = {
  trace: (...params) => console.log('trace', ...params),
  info: (...params) => console.info('info', ...params),
  error: (...params) => console.error('error', ...params),
};

type WsClientEvent =
  | 'open'
  | 'update'
  | 'close'
  | 'exception'
  | 'reconnect'
  | 'reconnected'
  | 'response';

/** Resolves a promise if an event is seen before a timeout (defaults to 4.5 seconds) */
export function waitForSocketEvent(
  wsClient: WebsocketClientLegacyV1,
  event: WsClientEvent,
  timeoutMs: number = 10 * 1000,
) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(
        `Failed to receive "${event}" event before timeout. Check that these are correct: topic, api keys (if private), signature process (if private)`,
      );
    }, timeoutMs);

    let resolvedOnce = false;

    function cleanup() {
      clearTimeout(timeout);
      resolvedOnce = true;
      wsClient.removeListener(event, (e) => resolver(e));
      wsClient.removeListener('error', (e) => rejector(e));
    }

    function resolver(event: unknown) {
      resolve(event);
      cleanup();
    }

    function rejector(event: any) {
      if (!resolvedOnce) {
        reject(event);
      }
      cleanup();
    }

    wsClient.on(event, (e: any) => resolver(e));
    wsClient.on('exception', (e) => rejector(e));

    // if (event !== 'close') {
    //   wsClient.on('close', (event) => {
    //     clearTimeout(timeout);

    //     if (!resolvedOnce) {
    //       reject(event);
    //     }
    //   });
    // }
  });
}

export function listenToSocketEvents(wsClient: WebsocketClientLegacyV1) {
  const retVal: Record<
    'update' | 'open' | 'response' | 'close' | 'error',
    typeof jest.fn
  > = {
    open: jest.fn(),
    response: jest.fn(),
    update: jest.fn(),
    close: jest.fn(),
    error: jest.fn(),
  };

  wsClient.on('open', retVal.open);
  wsClient.on('response', retVal.response);
  wsClient.on('update', retVal.update);
  wsClient.on('close', retVal.close);
  wsClient.on('exception', retVal.error);

  return {
    ...retVal,
    cleanup: () => {
      wsClient.removeListener('open', retVal.open);
      wsClient.removeListener('response', retVal.response);
      wsClient.removeListener('update', retVal.update);
      wsClient.removeListener('close', retVal.close);
      wsClient.removeListener('exception', retVal.error);
    },
  };
}

export function logAllEvents(wsClient: WebsocketClientLegacyV1) {
  wsClient.on('update', (_data) => {
    // console.log('wsUpdate: ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('wsOpen: ', data.wsKey);
  });
  wsClient.on('response', (data) => {
    console.log('wsResponse ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnect', ({ wsKey }) => {
    console.log('wsReconnecting ', wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('wsReconnected ', data?.wsKey);
  });
  wsClient.on('close', (_data) => {
    // console.log('wsClose: ', data);
  });
}

export function promiseSleep(ms: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, ms);
  });
}
