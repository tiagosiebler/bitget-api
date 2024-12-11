import { SpotClient } from '../../src';
import {
  successResponseString,
  sucessEmptyResponseObject,
} from '../response.util';

describe('Public Spot REST API Endpoints', () => {
  const api = new SpotClient();

  const symbol = 'BTCUSDT_SPBL';

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
   * Public
   *
   */

  it('getServerTime()', async () => {
    // expect(await api.getServerTime()).toStrictEqual('');
    expect(await api.getServerTime()).toMatchObject(successResponseString());
  });

  it('fetchServertime() returns number', async () => {
    expect(await api.fetchServerTime()).toStrictEqual(expect.any(Number));
  });

  it('getCoins()', async () => {
    expect(await api.getCoins()).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getSymbols()', async () => {
    expect(await api.getSymbols()).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getSymbol()', async () => {
    expect(await api.getSymbol(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        baseCoin: expect.any(String),
      },
    });
  });

  /**
   *
   * Market
   *
   */

  it('getTicker()', async () => {
    expect(await api.getTicker(symbol)).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        askSz: expect.any(String),
        baseVol: expect.any(String),
      },
    });
  });

  it('getAllTickers()', async () => {
    expect(await api.getAllTickers()).toMatchObject({
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
    expect(await api.getCandles(symbol, '1min')).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: expect.any(Array),
    });
  });

  it('getDepth()', async () => {
    expect(await api.getDepth(symbol, 'step0')).toMatchObject({
      ...sucessEmptyResponseObject(),
      data: {
        bids: expect.any(Array),
        asks: expect.any(Array),
      },
    });
  });
});
