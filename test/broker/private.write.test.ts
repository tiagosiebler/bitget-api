import { API_ERROR_CODE, BrokerClient } from '../../src';
import { sucessEmptyResponseObject } from '../response.util';

describe('Private Broker REST API POST Endpoints', () => {
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

  it('createSubAccount()', async () => {
    try {
      expect(await api.createSubAccount('test1')).toMatchObject(
        sucessEmptyResponseObject(),
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('modifySubAccount()', async () => {
    try {
      expect(
        await api.modifySubAccount('test1', 'spot_trade,transfer', 'normal'),
      ).toMatchObject(sucessEmptyResponseObject());
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('modifySubEmail()', async () => {
    try {
      expect(
        await api.modifySubEmail('test1', 'ASDFASDF@LKMASDF.COM'),
      ).toMatchObject(sucessEmptyResponseObject());
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('subWithdrawal()', async () => {
    try {
      expect(
        await api.subWithdrawal({
          address: '123455',
          amount: '12345',
          chain: 'TRC20',
          coin: 'USDT',
          subUid,
        }),
      ).toMatchObject(sucessEmptyResponseObject());
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('setSubDepositAutoTransfer()', async () => {
    try {
      expect(
        await api.setSubDepositAutoTransfer(subUid, 'USDT', 'spot'),
      ).toMatchObject(sucessEmptyResponseObject());
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('createSubAPIKey()', async () => {
    try {
      expect(
        await api.createSubAPIKey(
          subUid,
          'passphrase12345',
          'remark',
          '10.0.0.1',
        ),
      ).toMatchObject(sucessEmptyResponseObject());
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_BROKER,
      });
    }
  });

  it('modifySubAPIKey()', async () => {
    try {
      expect(
        await api.modifySubAPIKey({
          apikey: '12345',
          subUid,
          remark: 'test',
        }),
      ).toMatchObject(sucessEmptyResponseObject());
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.PASSPHRASE_CANNOT_BE_EMPTY,
      });
    }
  });
});
