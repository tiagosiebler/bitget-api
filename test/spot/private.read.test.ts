import { API_ERROR_CODE, SpotClient } from '../../src';
import { sucessEmptyResponseObject } from '../response.util';

describe('Private Spot REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
    expect(API_PASS).toStrictEqual(expect.any(String));
  });

  const api = new SpotClient({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
  });

  const symbol = 'BTCUSDT_SPBL';
  const coin = 'BTC';
  const timestampOneHourAgo = new Date().getTime() - 1000 * 60 * 60;
  const from = timestampOneHourAgo.toFixed(0);
  const to = String(Number(from) + 1000 * 60 * 30); // 30 minutes

  // Seems to throw a permission error, probably because withdrawal permissions aren't set on this key (requires IP whitelist)
  it.skip('getDepositAddress()', async () => {
    try {
      expect(await api.getDepositAddress(coin)).toStrictEqual('');
    } catch (e) {
      console.error('exception: ', e);
      expect(e).toBeNull();
    }
  });

  it('getWithdrawals()', async () => {
    try {
      expect(await api.getWithdrawals(coin, from, to)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getWithdrawals: ', e);
      expect(e).toBeNull();
    }
  });

  it('getDeposits()', async () => {
    try {
      expect(await api.getDeposits(coin, from, to)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getDeposits: ', e);
      expect(e).toBeNull();
    }
  });

  it('getApiKeyInfo()', async () => {
    // No auth error == test pass
    try {
      expect(await api.getApiKeyInfo()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          user_id: expect.any(String),
          authorities: expect.any(Array),
        },
      });
    } catch (e) {
      console.error('getApiKeyInfo: ', e);
      expect(e).toBeNull();
    }
  });

  it('getBalance()', async () => {
    try {
      // expect(await api.getWithdrawals(coin, from, to)).toStrictEqual('');
      expect(await api.getBalance()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getBalance: ', e);
      expect(e).toBeNull();
    }
  });

  it('getTransactionHistory()', async () => {
    try {
      expect(await api.getTransactionHistory()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getTransactionHistory: ', e);
      expect(e).toBeNull();
    }
  });

  // Sees exception now about requiring coinId. Question sent to bitget 7th feb.
  it.skip('getTransferHistory()', async () => {
    try {
      expect(await api.getTransferHistory()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getTransferHistory: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOrder()', async () => {
    try {
      expect(await api.getOrder(symbol, '12345')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getOrder: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOpenOrders()', async () => {
    try {
      expect(await api.getOpenOrders()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getOpenOrders: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOrderHistory()', async () => {
    try {
      expect(await api.getOrderHistory(symbol)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getOrderHistory: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOrderFills()', async () => {
    try {
      expect(await api.getOrderFills(symbol, '12345')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      console.error('getOrderFills: ', e);
      expect(e).toBeNull();
    }
  });

  it('getCurrentPlanOrders()', async () => {
    try {
      expect(
        await api.getCurrentPlanOrders({ symbol, pageSize: '20' }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          nextFlag: false,
          orderList: expect.any(Array),
        },
      });
    } catch (e) {
      console.error('getCurrentPlanOrders: ', e);
      expect(e).toBeNull();
    }
  });

  it('getHistoricPlanOrders()', async () => {
    try {
      expect(
        await api.getHistoricPlanOrders({
          symbol,
          pageSize: '20',
          startTime: '1667889483000',
          endTime: '1668134732000',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          endId: null,
          nextFlag: false,
          orderList: expect.any(Array),
        },
      });
    } catch (e) {
      console.error('getHistoricPlanOrders: ', e);
      expect(e).toBeNull();
    }
  });
});
