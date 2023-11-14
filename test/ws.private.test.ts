import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_ERROR_ENUM,
  WS_KEY_MAP,
} from '../src';
import {
  getSilentLogger,
  listenToSocketEvents,
  logAllEvents,
  waitForSocketEvent,
} from './ws.util';

describe.skip('Private Spot Websocket Client', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  const wsClientOptions: WSClientConfigurableOptions = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
  };

  describe('with invalid credentials', () => {
    it('should reject private subscribe if keys/signature are incorrect', async () => {
      const badClient = new WebsocketClient(
        {
          ...wsClientOptions,
          apiKey: 'bad',
          apiSecret: 'bad',
          apiPass: 'bad',
        },
        getSilentLogger('expect401'),
      );

      logAllEvents(badClient);
      // const wsOpenPromise = waitForSocketEvent(badClient, 'open');
      const wsResponsePromise = waitForSocketEvent(badClient, 'response');
      // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

      badClient.subscribeTopic('SPBL', 'account');

      expect(wsResponsePromise).rejects.toMatchObject({
        code: WS_ERROR_ENUM.INVALID_ACCESS_KEY,
        wsKey: WS_KEY_MAP.spotv1,
        event: 'error',
      });

      try {
        await Promise.all([wsResponsePromise]);
      } catch (e) {
        // console.error()
      }
      badClient.closeAll();
    });
  });

  describe('with valid API credentails', () => {
    let wsClient: WebsocketClient;

    it('should have api credentials to test with', () => {
      expect(API_KEY).toStrictEqual(expect.any(String));
      expect(API_SECRET).toStrictEqual(expect.any(String));
      expect(API_PASS).toStrictEqual(expect.any(String));
    });

    beforeAll(() => {
      wsClient = new WebsocketClient(
        wsClientOptions,
        getSilentLogger('expectSuccess'),
      );
      wsClient.connectAll();
      // logAllEvents(wsClient);
      logAllEvents(wsClient);
    });

    afterAll(() => {
      wsClient.closeAll();
    });

    it('should successfully authenticate a private ws connection', async () => {
      const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
      const wsResponsePromise = waitForSocketEvent(wsClient, 'response');

      try {
        expect(await wsOpenPromise).toMatchObject({});
      } catch (e) {
        expect(e).toBeFalsy();
      }

      try {
        expect(await wsResponsePromise).toMatchObject({
          code: 0,
          event: 'login',
        });
      } catch (e) {
        console.error(`Wait for "books" subscription response exception: `, e);
        expect(e).toBeFalsy();
      }
    });

    it('should subscribe to private account events and get a snapshot', async () => {
      const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

      const channel = 'account';
      wsClient.subscribeTopic('SPBL', channel);

      expect(await wsUpdatePromise).toMatchObject({
        action: 'snapshot',
        arg: {
          channel: channel,
        },
      });
    });
  });
});
