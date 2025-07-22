import { API_ERROR_CODE } from '../../src';
import { RestClientV3 } from '../../src/rest-client-v3';
// prettier-ignore
import {
    errorResponseObjectV3,
    sucessEmptyResponseObject,
} from '../response.util';

describe('Bitget Private REST API V3 Write Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASSPHRASE = process.env.API_PASS_COM;

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

  describe('Trade Endpoints', () => {
    it('submitNewOrder()', async () => {
      try {
        const res = await api.submitNewOrder({
          category: 'SPOT',
          symbol: 'BTCUSDT',
          side: 'buy',
          orderType: 'limit',
          price: '20000',
          qty: '0.001',
          timeInForce: 'gtc',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.INSUFFICIENT_BALANCE_V3),
        ); // not enough balance
      }
    });

    it('cancelOrder()', async () => {
      try {
        const res = await api.cancelOrder({
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.ORDER_DOES_NOT_EXIST_V3),
        ); //The order does not exist
      }
    });

    it('placeBatchOrders()', async () => {
      try {
        const res = await api.placeBatchOrders([
          {
            category: 'SPOT',
            symbol: 'BTCUSDT',
            side: 'buy',
            orderType: 'limit',
            price: '20000',
            qty: '0.001',
            timeInForce: 'gtc',
          },
        ]);
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.INSUFFICIENT_BALANCE),
        ); // not enough balance
      }
    });

    it('cancelBatchOrders()', async () => {
      try {
        const res = await api.cancelBatchOrders([
          {
            category: 'SPOT',
            symbol: 'BTCUSDT',
            orderId: '123456789',
          },
        ]);
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.ORDER_DOES_NOT_EXIST_V3),
        ); //The order does not exist
      }
    });

    it('modifyOrder()', async () => {
      try {
        const res = await api.modifyOrder({
          orderId: '123456789',
          qty: '0.002',
          price: '21000',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.ORDER_DOES_NOT_EXIST_V3),
        ); //The order does not exist
      }
    });
  });

  describe('Futures Endpoints', () => {
    it('submitNewOrder() futures', async () => {
      try {
        const res = await api.submitNewOrder({
          category: 'USDT-FUTURES',
          symbol: 'BTCUSDT',
          side: 'buy',
          orderType: 'limit',
          price: '20000',
          qty: '0.001',
          timeInForce: 'gtc',
          posSide: 'long',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.INSUFFICIENT_BALANCE_V3),
        ); // not enough balance
      }
    });

    it('cancelOrder() futures', async () => {
      try {
        const res = await api.cancelOrder({
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.ORDER_DOES_NOT_EXIST_V3),
        ); // The order does not exist
      }
    });

    it('placeBatchOrders() futures', async () => {
      try {
        const res = await api.placeBatchOrders([
          {
            category: 'USDT-FUTURES',
            symbol: 'BTCUSDT',
            side: 'buy',
            orderType: 'limit',
            price: '20000',
            qty: '0.001',
            timeInForce: 'gtc',
            posSide: 'long',
          },
        ]);
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.INSUFFICIENT_BALANCE),
        );
      }
    });

    it('closeAllPositions()', async () => {
      try {
        const res = await api.closeAllPositions({
          category: 'USDT-FUTURES',
          symbol: 'BTCUSDT',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(
          errorResponseObjectV3(API_ERROR_CODE.NO_POSITION_TO_CLOSE),
        );
      }
    });
  });
});
