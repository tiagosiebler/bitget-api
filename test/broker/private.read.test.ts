import { API_ERROR_CODE, BrokerClient } from '../../src';
import { sucessEmptyResponseObject } from '../response.util';

describe('Private Broker REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
    expect(API_PASS).toStrictEqual(expect.any(String));
  });

  const api = new BrokerClient({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
  });

  const coin = 'BTC';
  const subUid = '123456';
  const timestampOneHourAgo = new Date().getTime() - 1000 * 60 * 60;
  const from = timestampOneHourAgo.toFixed(0);
  const to = String(Number(from) + 1000 * 60 * 30); // 30 minutes

  it('getBrokerInfo()', async () => {
    try {
      expect(await api.getBrokerInfo()).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('getSubAccounts()', async () => {
    try {
      expect(await api.getSubAccounts()).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('getSubEmail()', async () => {
    try {
      expect(await api.getSubEmail(subUid)).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('getSubSpotAssets()', async () => {
    try {
      expect(await api.getSubSpotAssets(subUid)).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      // expect(e.body).toBeNull();
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('getSubFutureAssets()', async () => {
    try {
      expect(await api.getSubFutureAssets(subUid, 'usdt')).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('getSubDepositAddress()', async () => {
    try {
      expect(await api.getSubDepositAddress(subUid, coin)).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('getSubAPIKeys()', async () => {
    try {
      expect(await api.getSubAPIKeys(subUid)).toMatchObject(
        sucessEmptyResponseObject()
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });
});
