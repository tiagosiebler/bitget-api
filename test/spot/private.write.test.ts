import { API_ERROR_CODE, SpotClient } from '../../src';
import { sucessEmptyResponseObject } from '../response.util';

describe('Private Spot REST API POST Endpoints', () => {
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
  const coin = 'USDT';
  const timestampOneHourAgo = new Date().getTime() - 1000 * 60 * 60;
  const from = timestampOneHourAgo.toFixed(0);
  const to = String(Number(from) + 1000 * 60 * 30); // 30 minutes

  it('transfer()', async () => {
    try {
      expect(
        await api.transfer({
          amount: '100',
          coin,
          fromType: 'spot',
          toType: 'mix_usdt',
        })
      ).toStrictEqual('');
    } catch (e) {
      // console.error('transfer: ', e);
      expect(e.body).toMatchObject({
        // not sure what this error means, probably no balance. Seems to change?
        code: expect.stringMatching(/42013|43117/gim),
      });
    }
  });

  it('withdraw()', async () => {
    try {
      expect(
        await api.withdraw({
          amount: '100',
          coin,
          chain: 'TRC20',
          address: `123456`,
        })
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.INCORRECT_PERMISSIONS,
      });
    }
  });

  it('innerWithdraw()', async () => {
    try {
      expect(await api.innerWithdraw(coin, '12345', '1')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.INCORRECT_PERMISSIONS,
      });
    }
  });

  it('submitOrder()', async () => {
    try {
      expect(
        await api.submitOrder({
          symbol,
          side: 'buy',
          orderType: 'market',
          quantity: '1',
          force: 'normal',
        })
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.QTY_LESS_THAN_MINIMUM,
      });
    }
  });

  it('batchSubmitOrder()', async () => {
    try {
      expect(
        await api.batchSubmitOrder(symbol, [
          {
            side: 'buy',
            orderType: 'market',
            quantity: '1',
            force: 'normal',
          },
        ])
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          resultList: expect.any(Array),
          failure: [{ errorCode: API_ERROR_CODE.QTY_LESS_THAN_MINIMUM }],
        },
      });
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  it('cancelOrder()', async () => {
    try {
      expect(await api.cancelOrder(symbol, '123456')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ORDER_NOT_FOUND,
      });
    }
  });

  it('batchCancelOrder()', async () => {
    try {
      expect(await api.batchCancelOrder(symbol, ['123456'])).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ORDER_NOT_FOUND,
      });
    }
  });
});
