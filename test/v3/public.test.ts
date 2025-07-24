import { RestClientV3 } from '../../src/rest-client-v3';
import { sucessEmptyResponseObject } from '../response.util';

describe('Bitget Public REST API V3 Endpoints', () => {
  const api = new RestClientV3();

  describe('public endpoints', () => {
    it('should succeed making a GET request without params', async () => {
      const res = await api.getDiscountRate();
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should succeed making a GET request with params', async () => {
      const res = await api.getTickers({
        category: 'SPOT',
        symbol: 'BTCUSDT',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return orderbook data', async () => {
      const res = await api.getOrderBook({
        category: 'SPOT',
        symbol: 'BTCUSDT',
        limit: '20',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return candles data', async () => {
      const res = await api.getCandles({
        category: 'SPOT',
        symbol: 'BTCUSDT',
        interval: '1m',
        limit: '100',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return recent fills', async () => {
      const res = await api.getFills({
        category: 'SPOT',
        symbol: 'BTCUSDT',
        limit: '20',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return historic candles', async () => {
      const res = await api.getHistoryCandles({
        category: 'SPOT',
        symbol: 'BTCUSDT',
        interval: '1m',
        limit: '20',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return funding rate data', async () => {
      const res = await api.getCurrentFundingRate({
        symbol: 'BTCUSDT',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return open interest data', async () => {
      const res = await api.getOpenInterest({
        category: 'USDT-FUTURES',
        symbol: 'BTCUSDT',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return instruments config', async () => {
      const res = await api.getInstruments({
        category: 'SPOT',
        symbol: 'BTCUSDT',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });
  });
});
