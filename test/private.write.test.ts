import { RestClientV2 } from '../src/rest-client-v2';
import {
    errorResponseObjectV3,
    sucessEmptyResponseObject,
} from './response.util';

describe('Bitget Private REST API Write Endpoints', () => {
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

  describe('Trade Endpoints', () => {
    it('spotSubmitOrder()', async () => {
      try {
        const res = await api.spotSubmitOrder({
          symbol: 'BTCUSDT',
          side: 'buy',
          orderType: 'limit',
          price: '20000',
          size: '0.001',
          force: 'gtc',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43012')); // not enough balance
      }
    });

    it('spotCancelOrder()', async () => {
      try {
        const res = await api.spotCancelOrder({
          symbol: 'BTCUSDT',
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43001')); //The order does not exist
      }
    });

    it('spotBatchSubmitOrders()', async () => {
      try {
        const res = await api.spotBatchSubmitOrders({
          symbol: 'BTCUSDT',
          orderList: [
            {
              symbol: 'BTCUSDT',
              side: 'buy',
              orderType: 'limit',
              price: '20000',
              size: '0.001',
              force: 'gtc',
            },
          ],
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43001')); //The order does not exist
      }
    });

    it('spotBatchCancelOrders()', async () => {
      try {
        const res = await api.spotBatchCancelOrders({
          symbol: 'BTCUSDT',
          orderList: [
            {
              symbol: 'BTCUSDT',
              orderId: '123456789',
            },
          ],
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43001')); //The order does not exist
      }
    });
  });

  describe('Funding Endpoints', () => {
    it('spotTransfer()', async () => {
      try {
        const res = await api.spotTransfer({
          fromType: 'spot',
          toType: 'coin_futures',
          amount: '0.001',
          coin: 'BTC',
          symbol: 'BTCUSDT',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43117')); // Exceeds the maximum amount that can be transferred
      }
    });

    it('spotWithdraw()', async () => {
      try {
        const res = await api.spotWithdraw({
          coin: 'BTC',
          address: 'test_address',
          chain: 'BTC',
          transferType: 'on_chain',
          size: '0.001',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('40014')); // Incorrect permissions
      }
    });
  });

  describe('Futures Endpoints', () => {
    it('futuresSubmitOrder()', async () => {
      try {
        const res = await api.futuresSubmitOrder({
          symbol: 'BTCUSDT',
          productType: 'USDT-FUTURES',
          side: 'buy',
          orderType: 'limit',
          price: '20000',
          size: '0.001',
          marginMode: 'isolated',
          marginCoin: 'USDT',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('40774')); // The order type for unilateral position must also be the unilateral position type.
      }
    });

    it('futuresCancelOrder()', async () => {
      try {
        const res = await api.futuresCancelOrder({
          symbol: 'BTCUSDT',
          productType: 'USDT-FUTURES',
          orderId: '123456789',
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('40768')); // The order does not exist
      }
    });

    it('futuresBatchSubmitOrders()', async () => {
      try {
        const res = await api.futuresBatchSubmitOrders({
          symbol: 'BTCUSDT',
          productType: 'USDT-FUTURES',
          marginCoin: 'USDT',
          marginMode: 'crossed',
          orderList: [
            {
              side: 'buy',
              orderType: 'limit',
              price: '20000',
              size: '0.001',
            },
          ],
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43001'));
      }
    });

    it('futuresBatchCancelOrders()', async () => {
      try {
        const res = await api.futuresBatchCancelOrders({
          symbol: 'BTCUSDT',
          productType: 'USDT-FUTURES',
          orderIdList: [
            {
              orderId: '123456789',
            },
          ],
        });
        expect(res).toMatchObject(sucessEmptyResponseObject());
      } catch (e) {
        expect(e).toMatchObject(errorResponseObjectV3('43001'));
      }
    });
  });
});
