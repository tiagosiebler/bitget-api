import { API_ERROR_CODE, FuturesClient } from '../../src';
import {
  notAuthenticatedError,
  successResponseString,
  sucessEmptyResponseObject,
} from '../response.util';

describe('Public Spot REST API Endpoints', () => {
  const api = new FuturesClient();

  const symbol = 'BTCUSDT_UMCBL';
  const timestampOneHourAgo = new Date().getTime() - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));
  const to = from + 1000 * 60 * 30; // 30 minutes

  // it('should throw for unauthenticated private calls', async () => {
  //   expect(() => api.getOpenOrders()).rejects.toMatchObject(
  //     notAuthenticatedError()
  //   );
  //   expect(() => api.getBalances()).rejects.toMatchObject(
  //     notAuthenticatedError()
  //   );
  // });

  /**
   *
   * Market
   *
   */
  it('getSymbols()', async () => {
    expect(await api.getSymbols('umcbl')).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getDepth()', async () => {
    expect(await api.getDepth(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        bids: expect.any(Array),
        asks: expect.any(Array),
      },
    });
  });

  it('getTicker()', async () => {
    expect(await api.getTicker(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        bestAsk: expect.any(String),
        bestBid: expect.any(String),
      },
    });
  });

  it('getAllTickers()', async () => {
    expect(await api.getAllTickers('umcbl')).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getMarketTrades()', async () => {
    expect(await api.getMarketTrades(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getCandles()', async () => {
    expect(
      await api.getCandles(symbol, '1min', `${from}`, `${to}`)
    ).toMatchObject(expect.any(Array));
  });

  it('getIndexPrice()', async () => {
    expect(await api.getIndexPrice(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        index: expect.any(String),
        symbol: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });

  it('getNextFundingTime()', async () => {
    expect(await api.getNextFundingTime(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        fundingTime: expect.any(String),
        symbol: expect.any(String),
      },
    });
  });

  it('getHistoricFundingRate()', async () => {
    expect(await api.getHistoricFundingRate(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getCurrentFundingRate()', async () => {
    expect(await api.getCurrentFundingRate(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        fundingRate: expect.any(String),
        symbol: expect.any(String),
      },
    });
  });

  it('getOpenInterest()', async () => {
    expect(await api.getOpenInterest(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        amount: expect.any(String),
        symbol: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });

  it('getMarkPrice()', async () => {
    expect(await api.getMarkPrice(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        markPrice: expect.any(String),
        symbol: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });

  it('getLeverageMinMax()', async () => {
    expect(await api.getLeverageMinMax(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        maxLeverage: expect.any(String),
        minLeverage: expect.any(String),
        symbol: expect.any(String),
      },
    });
  });
});
