import { API_ERROR_CODE } from '../../src/index.js';
import { RestClientV2 } from '../../src/rest-client-v2.js';
import {
  errorResponseObjectV3,
  sucessEmptyResponseObject,
} from '../response.util.js';

describe('Bitget Private REST API Read Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASSPHRASE = process.env.API_PASS_COM;

  const api = new RestClientV2({
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
    it('getSpotAccount()', async () => {
      try {
        const res = await api.getSpotAccount();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotAccountAssets()', async () => {
      try {
        const res = await api.getSpotAccountAssets();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotAccountBills()', async () => {
      try {
        const res = await api.getSpotAccountBills();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe('Trade Endpoints', () => {
    it('getSpotOrder()', async () => {
      try {
        const res = await api.getSpotOrder({
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotOpenOrders()', async () => {
      try {
        const res = await api.getSpotOpenOrders();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotHistoricOrders()', async () => {
      try {
        const res = await api.getSpotHistoricOrders();
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotFills()', async () => {
      try {
        const res = await api.getSpotFills({
          symbol: 'BTCUSDT',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe('Funding Endpoints', () => {
    it('getSpotDepositHistory()', async () => {
      try {
        const res = await api.getSpotDepositHistory({
          startTime: '1715808000000',
          endTime: '1715894400000',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotWithdrawalHistory()', async () => {
      try {
        const res = await api.getSpotWithdrawalHistory({
          startTime: '1715808000000',
          endTime: '1715894400000',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getSpotTransferHistory()', async () => {
      try {
        const res = await api.getSpotTransferHistory({
          coin: 'BTC',
          fromType: 'spot',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe('Futures Endpoints', () => {
    it('getFuturesAccountAsset()', async () => {
      try {
        const res = await api.getFuturesAccountAsset({
          symbol: 'BTCUSDT',
          marginCoin: 'USDT',
          productType: 'USDT-FUTURES',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getFuturesPositions()', async () => {
      try {
        const res = await api.getFuturesPositions({
          productType: 'USDT-FUTURES',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('getFuturesOrder()', async () => {
      try {
        const res = await api.getFuturesOrder({
          symbol: 'BTCUSDT',
          productType: 'USDT-FUTURES',
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.FUTURES_ORDER_GET_NOT_FOUND),
        ); // The data of the order cannot be found, please confirm the order number
      }
    });
  });
});
