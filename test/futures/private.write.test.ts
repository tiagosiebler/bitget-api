import { API_ERROR_CODE, FuturesClient } from '../../src';
import { sucessEmptyResponseObject } from '../response.util';

jest.setTimeout(10000);

describe('Private Futures REST API POST Endpoints', () => {
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

  it('setLeverage()', async () => {
    try {
      expect(await api.setLeverage(symbol, marginCoin, '20')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      console.error('setLeverage: ', e);
      expect(e).toBeNull();
    }
  });

  it('setMargin()', async () => {
    try {
      expect(await api.setMargin(symbol, marginCoin, '-10')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      // expect(e).toBeNull();
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.PARAMETER_EXCEPTION,
      });
    }
  });

  it('setMarginMode()', async () => {
    try {
      expect(
        await api.setMarginMode(symbol, marginCoin, 'crossed'),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      console.error('setMarginMode: ', e);
      expect(e).toBeNull();
    }
  });

  it('submitOrder()', async () => {
    const symbol = 'BTCUSDT_UMCBL';
    const marginCoin = 'USDT';

    try {
      expect(
        await api.submitOrder({
          marginCoin,
          orderType: 'market',
          symbol,
          size: '1',
          side: 'open_long',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        // seems to be the new "insufficient balance" error, informed bitget on 7th feb
        code: API_ERROR_CODE.QTY_GREATER_THAN_MAX_OPEN,
        // code: API_ERROR_CODE.INSUFFICIENT_BALANCE,
      });
    }
  });

  it('batchSubmitOrder()', async () => {
    try {
      expect(
        await api.batchSubmitOrder(symbol, marginCoin, [
          {
            orderType: 'market',
            size: '1',
            side: 'open_long',
          },
        ]),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.INSUFFICIENT_BALANCE,
      });
    }
  });

  it('cancelOrder()', async () => {
    try {
      expect(
        await api.cancelOrder(symbol, marginCoin, '1234656'),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_ORDER_CANCEL_NOT_FOUND,
      });
    }
  });

  it('batchCancelOrder()', async () => {
    try {
      expect(
        await api.batchCancelOrder(symbol, marginCoin, ['1234656']),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      console.error('batchCancelOrder: ', e);
      expect(e).toBeNull();
    }
  });

  it('cancelAllOrders()', async () => {
    try {
      expect(await api.cancelAllOrders('umcbl', marginCoin)).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.NO_ORDER_TO_CANCEL,
      });
    }
  });

  it('submitPlanOrder()', async () => {
    try {
      expect(
        await api.submitPlanOrder({
          marginCoin,
          orderType: 'market',
          side: 'open_long',
          size: '0.1',
          symbol,
          triggerPrice: '1000',
          triggerType: 'market_price',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      // {"code": "40889", "data": null, "msg": "The plan order of this contract has reached the upper limit"
      // if the above error is seen, you need to cancel trigger orders on the test account (in futures)
      console.error('submitPlanOrder: ', e);
      expect(e).toBeNull();
    }
  });

  it('modifyPlanOrder()', async () => {
    try {
      expect(
        await api.modifyPlanOrder({
          orderId: '123456',
          marginCoin,
          orderType: 'market',
          symbol,
          triggerPrice: '100',
          triggerType: 'market_price',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.PLAN_ORDER_NOT_FOUND,
      });
    }
  });

  it('modifyPlanOrderTPSL()', async () => {
    try {
      expect(
        await api.modifyPlanOrderTPSL({
          orderId: '123456',
          marginCoin,
          symbol,
          presetTakeProfitPrice: '100',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      // expect(e).toBeNull();
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.PLAN_ORDER_NOT_FOUND,
      });
    }
  });

  it.skip('submitStopOrder()', async () => {
    try {
      expect(
        await api.submitStopOrder({
          marginCoin,
          symbol,
          planType: 'profit_plan',
          holdSide: 'long',
          triggerPrice: '100',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      // console.log(e.body);
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_INSUFFICIENT_POSITION_NO_TPSL,
      });
    }
  });

  it('submitPositionTPSL()', async () => {
    try {
      expect(
        await api.submitPositionTPSL({
          marginCoin,
          symbol,
          holdSide: 'long',
          planType: 'profit_plan',
          triggerPrice: '50',
          triggerType: 'market_price',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_INSUFFICIENT_POSITION_NO_TPSL,
      });
    }
  });

  it('modifyStopOrder()', async () => {
    try {
      expect(
        await api.modifyStopOrder({
          marginCoin,
          symbol,
          orderId: '123456',
          planType: 'profit_plan',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      // expect(e).toBeNull();
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_ORDER_TPSL_NOT_FOUND,
      });
    }
  });

  it('cancelPlanOrderTPSL()', async () => {
    try {
      expect(
        await api.cancelPlanOrderTPSL({
          marginCoin,
          symbol,
          orderId: '123456',
          planType: 'profit_plan',
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.FUTURES_ORDER_TPSL_NOT_FOUND,
      });
    }
  });

  it.skip('closeCopyTraderPosition()', async () => {
    try {
      expect(await api.closeCopyTraderPosition(symbol, '123456')).toMatchObject(
        {
          ...sucessEmptyResponseObject(),
          data: {},
        },
      );
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it.skip('modifyCopyTraderTPSL()', async () => {
    try {
      expect(
        await api.modifyCopyTraderTPSL(symbol, '123456', {
          stopLossPrice: 1234,
        }),
      ).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });

  it.skip('setCopyTraderSymbols()', async () => {
    try {
      expect(await api.setCopyTraderSymbols(symbol, 'delete')).toMatchObject({
        ...sucessEmptyResponseObject(),
        data: {},
      });
    } catch (e) {
      expect(e.body).toMatchObject({
        code: API_ERROR_CODE.ACCOUNT_NOT_COPY_TRADER,
      });
    }
  });
});
