import { RestClientV2 } from '../../src/rest-client-v2';
import { sucessEmptyResponseObject } from '../response.util';

describe('Bitget Public REST API Endpoints', () => {
  const api = new RestClientV2();

  describe('public endpoints', () => {
    it('should succeed making a GET request without params', async () => {
      const res = await api.getServerTime();
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should succeed making a GET request with params', async () => {
      const res = await api.getSpotTicker({ symbol: 'BTCUSDT' });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return orderbook data', async () => {
      const res = await api.getSpotOrderBookDepth({
        symbol: 'BTCUSDT',
        type: 'step0',
        limit: '20',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return candles data', async () => {
      const res = await api.getSpotCandles({
        symbol: 'BTCUSDT',
        granularity: '1min',
        limit: '100',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return recent trades', async () => {
      const res = await api.getSpotRecentTrades({
        symbol: 'BTCUSDT',
        limit: '20',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return historic trades', async () => {
      const res = await api.getSpotHistoricTrades({
        symbol: 'BTCUSDT',
        limit: '20',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return funding rate data', async () => {
      const res = await api.getFuturesCurrentFundingRate({
        symbol: 'BTCUSDT',
        productType: 'USDT-FUTURES',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return open interest data', async () => {
      const res = await api.getFuturesOpenInterest({
        symbol: 'BTCUSDT',
        productType: 'USDT-FUTURES',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });

    it('should return contract config', async () => {
      const res = await api.getFuturesContractConfig({
        symbol: 'BTCUSDT',
        productType: 'USDT-FUTURES',
      });
      expect(res).toMatchObject(sucessEmptyResponseObject());
    });
  });
});
