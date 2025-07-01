import {
    APIResponse,
    CandlestickV3,
    ContractOiV3,
    CurrentFundingRateV3,
    DiscountRateV3,
    FillV3,
    GetCandlesRequestV3,
    GetContractsOiRequestV3,
    GetCurrentFundingRateRequestV3,
    GetFillsRequestV3,
    GetHistoryCandlesRequestV3,
    GetHistoryFundingRateRequestV3,
    GetInstrumentsRequestV3,
    GetMarginLoansRequestV3,
    GetOpenInterestRequestV3,
    GetOrderBookRequestV3,
    GetPositionTierRequestV3,
    GetRiskReserveRequestV3,
    GetTickersRequestV3,
    HistoryFundingRateV3,
    InstrumentV3,
    MarginLoanV3,
    OpenInterestV3,
    OrderBookV3,
    PositionTierV3,
    RiskReserveV3,
    TickerV3,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for all V3 endpoints
 */
export class RestClientV3 extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v3;
  }

  /**
   *
   * Custom SDK functions
   *
   */

  /**
   * This method is used to get the latency and time sync between the client and the server.
   * This is not official API endpoint and is only used for internal testing purposes.
   * Use this method to check the latency and time sync between the client and the server.
   * Final values might vary slightly, but it should be within few ms difference.
   * If you have any suggestions or improvements to this measurement, please create an issue or pull request on GitHub.
   */
  async fetchLatencySummary(): Promise<any> {
    const clientTimeReqStart = Date.now();
    const serverTime = await this.getServerTime();
    const clientTimeReqEnd = Date.now();
    console.log('serverTime', serverTime);

    const serverTimeMs = Number(serverTime.data.serverTime);
    const roundTripTime = clientTimeReqEnd - clientTimeReqStart;
    const estimatedOneWayLatency = Math.floor(roundTripTime / 2);

    // Adjust server time by adding estimated one-way latency
    const adjustedServerTime = serverTimeMs + estimatedOneWayLatency;

    // Calculate time difference between adjusted server time and local time
    const timeDifference = adjustedServerTime - clientTimeReqEnd;

    const result = {
      localTime: clientTimeReqEnd,
      serverTime: serverTimeMs,
      roundTripTime,
      estimatedOneWayLatency,
      adjustedServerTime,
      timeDifference,
    };

    console.log('Time synchronization results:');
    console.log(result);

    console.log(
      `Your approximate latency to exchange server:
        One way: ${estimatedOneWayLatency}ms.
        Round trip: ${roundTripTime}ms.
        `,
    );

    if (timeDifference > 500) {
      console.warn(
        `WARNING! Time difference between server and client clock is greater than 500ms. It is currently ${timeDifference}ms.
          Consider adjusting your system clock to avoid unwanted clock sync errors!
          Visit https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow for more information`,
      );
    } else {
      console.log(
        `Time difference between server and client clock is within acceptable range of 500ms. It is currently ${timeDifference}ms.`,
      );
    }

    return result;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.data.serverTime);
  }

  /**
   *
   * Public endpoints
   *
   */

  getServerTime(): Promise<
    APIResponse<{
      serverTime: string;
    }>
  > {
    return this.get('/api/v3/public/time');
  }

  /**
   *
   * Market Data endpoints
   *
   */

  /**
   * Get Recent Public Fills
   */
  getFills(params: GetFillsRequestV3): Promise<APIResponse<FillV3[]>> {
    return this.get('/api/v3/market/fills', params);
  }

  /**
   * Get Kline/Candlestick
   */
  getCandles(
    params: GetCandlesRequestV3,
  ): Promise<APIResponse<CandlestickV3[]>> {
    return this.get('/api/v3/market/candles', params);
  }

  /**
   * Get Kline/Candlestick History
   */
  getHistoryCandles(
    params: GetHistoryCandlesRequestV3,
  ): Promise<APIResponse<CandlestickV3[]>> {
    return this.get('/api/v3/market/history-candles', params);
  }

  /**
   * Get Open Interest Limit
   */
  getContractsOi(
    params: GetContractsOiRequestV3,
  ): Promise<APIResponse<ContractOiV3[]>> {
    return this.get('/api/v3/market/oi-limit', params);
  }

  /**
   * Get Current Funding Rate
   */
  getCurrentFundingRate(
    params: GetCurrentFundingRateRequestV3,
  ): Promise<APIResponse<CurrentFundingRateV3[]>> {
    return this.get('/api/v3/market/current-fund-rate', params);
  }

  /**
   * Get Discount Rate
   */
  getDiscountRate(): Promise<APIResponse<DiscountRateV3[]>> {
    return this.get('/api/v3/market/discount-rate');
  }

  /**
   * Get Funding Rate History
   */
  getHistoryFundingRate(
    params: GetHistoryFundingRateRequestV3,
  ): Promise<APIResponse<HistoryFundingRateV3[]>> {
    return this.get('/api/v3/market/history-fund-rate', params);
  }

  /**
   * Get Margin Loan
   */
  getMarginLoans(
    params: GetMarginLoansRequestV3,
  ): Promise<APIResponse<MarginLoanV3>> {
    return this.get('/api/v3/market/margin-loans', params);
  }

  /**
   * Get Open Interest
   */
  getOpenInterest(
    params: GetOpenInterestRequestV3,
  ): Promise<APIResponse<OpenInterestV3>> {
    return this.get('/api/v3/market/open-interest', params);
  }

  /**
   * Get Position Tier
   */
  getPositionTier(
    params: GetPositionTierRequestV3,
  ): Promise<APIResponse<PositionTierV3[]>> {
    return this.get('/api/v3/market/position-tier', params);
  }

  /**
   * Get Risk Reserve
   */
  getRiskReserve(
    params: GetRiskReserveRequestV3,
  ): Promise<APIResponse<RiskReserveV3>> {
    return this.get('/api/v3/market/risk-reserve', params);
  }

  /**
   * Get Instruments
   */
  getInstruments(
    params: GetInstrumentsRequestV3,
  ): Promise<APIResponse<InstrumentV3[]>> {
    return this.get('/api/v3/market/instruments', params);
  }

  /**
   * Get OrderBook
   */
  getOrderBook(
    params: GetOrderBookRequestV3,
  ): Promise<APIResponse<OrderBookV3>> {
    return this.get('/api/v3/market/orderbook', params);
  }

  /**
   * Get Tickers
   */
  getTickers(params: GetTickersRequestV3): Promise<APIResponse<TickerV3[]>> {
    return this.get('/api/v3/market/tickers', params);
  }
}
