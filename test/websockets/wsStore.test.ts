import { isDeepObjectMatch } from '../../src/util/WsStore.js';

describe('WsStore', () => {
  describe('isDeepObjectMatch()', () => {
    it('should match an overlapping complex topic: ', () => {
      const topic1 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };
      const topic2 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should match an overlapping complex topic, even if keys are differently ordered', () => {
      const topic1 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };
      const topic2 = {
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
        topic: 'account',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeTruthy();
    });

    it('should NOT match an overlapping complex topic: ', () => {
      const topic1 = {
        topic: 'account',
        payload: { instType: 'USDC-FUTURES', coin: 'default' },
      };
      const topic2 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (child property removed): ', () => {
      const topic1 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };
      const topic2 = {
        topic: 'account',
        payload: { coin: 'default' },
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match asymmetric objects (no payload): ', () => {
      const topic1 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };
      const topic2 = {
        topic: 'account',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });

    it('should NOT match when object2 has extra keys', () => {
      const topic1 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
      };
      const topic2 = {
        topic: 'account',
        payload: { instType: 'USDT-FUTURES', coin: 'default' },
        extraKey: 'shouldNotMatch',
      };

      expect(isDeepObjectMatch(topic1, topic2)).toBeFalsy();
    });
  });
});
