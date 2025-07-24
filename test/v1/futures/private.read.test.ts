import { API_ERROR_CODE, FuturesClient } from '../../../src/index.js';
import { sucessEmptyResponseObject } from '../../response.util.js';

describe('Private Futures REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const API_PASS = process.env.API_PASS_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
    expect(API_PASS).toStrictEqual(expect.any(String));
  });

  const api = new FuturesClient({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    apiPass: API_PASS,
  });

  const symbol = 'BTCUSDT_UMCBL';
  const marginCoin = 'USDT';
  const timestampOneHourAgo = new Date().getTime() - 1000 * 60 * 60;
  const from = timestampOneHourAgo.toFixed(0);
  const to = String(Number(from) + 1000 * 60 * 30); // 30 minutes

  it('getAccount()', async () => {
    try {
      expect(await api.getAccount(symbol, marginCoin)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          available: expect.any(String),
          btcEquity: expect.any(String),
          equity: expect.any(String),
          marginCoin: expect.any(String),
          marginMode: expect.any(String),
        },
      });
    } catch (e: any) {
      console.error('getAccount: ', e);
      expect(e).toBeNull();
    }
  });

  it('getAccounts()', async () => {
    try {
      expect(await api.getAccounts('umcbl')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e: any) {
      console.error('getAccounts: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOpenCount()', async () => {
    try {
      expect(
        await api.getOpenCount(symbol, marginCoin, 20000, 1),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          openCount: expect.any(Number),
        },
      });
    } catch (e: any) {
      console.error('getOpenCount: ', e);
      expect(e).toBeNull();
    }
  });

  it('getPosition()', async () => {
    try {
      expect(await api.getPosition(symbol, marginCoin)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e: any) {
      console.error('getPosition: ', e);
      expect(e).toBeNull();
    }
  });

  it('getPositions()', async () => {
    try {
      expect(await api.getPositions('umcbl')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e: any) {
      console.error('getPosition: ', e);
      expect(e).toBeNull();
    }
  });

  it('getAccountBill()', async () => {
    try {
      expect(
        await api.getAccountBill({
          startTime: from,
          endTime: to,
          marginCoin,
          symbol,
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          lastEndId: null,
          nextFlag: false,
          preFlag: false,
          result: expect.any(Array),
        },
      });
    } catch (e: any) {
      console.error('getAccountBill: ', e);
      expect(e).toBeNull();
    }
  });

  it('getBusinessBill()', async () => {
    try {
      expect(
        await api.getBusinessBill({
          startTime: from,
          endTime: to,
          productType: 'umcbl',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {
          lastEndId: null,
          nextFlag: false,
          preFlag: false,
          result: expect.any(Array),
        },
      });
    } catch (e: any) {
      console.error('getBusinessBill: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOpenSymbolOrders()', async () => {
    try {
      expect(await api.getOpenSymbolOrders(symbol)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e: any) {
      console.error('getOpenSymbolOrders: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOpenOrders()', async () => {
    try {
      expect(await api.getOpenOrders('umcbl', marginCoin)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Array),
      });
    } catch (e: any) {
      console.error('getOpenOrders: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOrderHistory()', async () => {
    try {
      expect(await api.getOrderHistory(symbol, from, to, '10')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      console.error('getOrderHistory: ', e);
      expect(e).toBeNull();
    }
  });

  it('getProductTypeOrderHistory()', async () => {
    try {
      expect(
        await api.getProductTypeOrderHistory('umcbl', from, to, '10'),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      console.error('getProductTypeOrderHistory: ', e);
      expect(e).toBeNull();
    }
  });

  it('getOrder() should throw FUTURES_ORDER_NOT_FOUND', async () => {
    try {
      expect(await api.getOrder(symbol, '12345')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_ORDER_GET_NOT_FOUND,
      });
    }
  });

  it('getOrderFills() should throw FUTURES_ORDER_NOT_FOUND', async () => {
    try {
      expect(await api.getOrderFills(symbol, '12345')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_ORDER_GET_NOT_FOUND,
      });
    }
  });

  it('getProductTypeOrderFills() ', async () => {
    try {
      expect(
        await api.getProductTypeOrderFills('umcbl', {
          startTime: from,
          endTime: to,
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      console.error('getProductTypeOrderFills: ', e);
      expect(e).toBeNull();
    }
  });

  it('getPlanOrderTPSLs()', async () => {
    try {
      expect(await api.getPlanOrderTPSLs(symbol)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      console.error('getPlanOrderTPSLs: ', e);
      expect(e).toBeNull();
    }
  });

  it('getHistoricPlanOrdersTPSL()', async () => {
    try {
      expect(
        await api.getHistoricPlanOrdersTPSL({
          startTime: from,
          endTime: to,
          symbol,
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      console.error('getHistoricPlanOrdersTPSL: ', e);
      expect(e).toBeNull();
    }
  });

  it.skip('getCopyTraderOpenOrder()', async () => {
    try {
      expect(
        await api.getCopyTraderOpenOrder(symbol, 'umcbl', 1, 0),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyFollowersOpenOrder()', async () => {
    try {
      expect(
        await api.getCopyFollowersOpenOrder(symbol, 'umcbl', 1, 0),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it.skip('getCopyTraderOrderHistory()', async () => {
    try {
      expect(await api.getCopyTraderOrderHistory(from, to, 1, 0)).toMatchObject(
        {
          ...sucessEmptyResponseObject(),
          data: expect.any(Object),
        },
      );
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyTraderProfitSummary()', async () => {
    try {
      expect(await api.getCopyTraderProfitSummary()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyTraderHistoricProfitSummary()', async () => {
    try {
      expect(await api.getCopyTraderHistoricProfitSummary()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyTraderHistoricProfitSummaryByDate()', async () => {
    try {
      expect(
        await api.getCopyTraderHistoricProfitSummaryByDate(
          marginCoin,
          from,
          1,
          1,
        ),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyTraderHistoricProfitDetail()', async () => {
    try {
      expect(
        await api.getCopyTraderHistoricProfitDetail(marginCoin, from, 1, 1),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyTraderProfitDetails()', async () => {
    try {
      expect(await api.getCopyTraderProfitDetails(1, 1)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it('getCopyTraderSymbols()', async () => {
    try {
      expect(await api.getCopyTraderSymbols()).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: expect.any(Object),
      });
    } catch (e: any) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });
});
