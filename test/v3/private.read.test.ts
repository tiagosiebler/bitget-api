import { API_ERROR_CODE } from '../../src';
import { RestClientV3 } from '../../src/rest-client-v3';
import {
  errorResponseObjectV3,
  sucessEmptyResponseObject,
} from '../response.util';

describe('Bitget Private REST API V3 Read Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM_V3;
  const API_SECRET = process.env.API_SECRET_COM_V3;
  const API_PASSPHRASE = process.env.API_PASS_COM_V3;

  const api = new RestClientV3({
    apiKey: API_KEY!,
    apiSecret: API_SECRET!,
    apiPass: API_PASSPHRASE!,
  });

  it('should have api credentials to use', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
    expect(API_PASSPHRASE).toStrictEqual(expect.any(String));
  });

  describe('Account Endpoints', () => {
    it('getBalances()', async () => {
      try {
        const res = await api.getBalances();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getFundingAssets()', async () => {
      try {
        const res = await api.getFundingAssets();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getAccountSettings()', async () => {
      try {
        const res = await api.getAccountSettings();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe('Trade Endpoints', () => {
    it('getOrderInfo()', async () => {
      try {
        const res = await api.getOrderInfo({
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.ORDER_DOES_NOT_EXIST_V3),
        );
      }
    });

    it('getUnfilledOrders()', async () => {
      try {
        const res = await api.getUnfilledOrders();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getHistoryOrders()', async () => {
      try {
        const res = await api.getHistoryOrders({
          category: 'SPOT',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getTradeFills()', async () => {
      try {
        const res = await api.getTradeFills();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe('Funding Endpoints', () => {
    it('getDepositRecords()', async () => {
      try {
        const res = await api.getDepositRecords({
          startTime: '1715808000000',
          endTime: '1715894400000',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getWithdrawRecords()', async () => {
      try {
        const res = await api.getWithdrawRecords({
          startTime: '1715808000000',
          endTime: '1715894400000',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getFinancialRecords()', async () => {
      try {
        const res = await api.getFinancialRecords({
          category: 'SPOT',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe('Position Endpoints', () => {
    it('getCurrentPosition()', async () => {
      try {
        const res = await api.getCurrentPosition({
          category: 'USDT-FUTURES',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getPositionHistory()', async () => {
      try {
        const res = await api.getPositionHistory({
          category: 'USDT-FUTURES',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getOrderInfo() with invalid order', async () => {
      try {
        const res = await api.getOrderInfo({
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.ORDER_DOES_NOT_EXIST_V3),
        ); // The order does not exist
      }
    });
  });
});
