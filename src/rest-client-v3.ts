/* eslint-disable prettier/prettier */
import {
    AccountAssetsV3,
    AccountSettingsV3,
    APIResponse,
    BindUidRequestV3,
    BindUidResponseV3,
    CandlestickV3,
    ContractOiV3,
    ConvertRecordsResponseV3,
    CreateSubAccountApiKeyRequestV3,
    CreateSubAccountApiKeyResponseV3,
    CreateSubAccountRequestV3,
    CreateSubAccountResponseV3,
    CurrentFundingRateV3,
    DeleteSubAccountApiKeyRequestV3,
    DiscountRateV3,
    EnsureCoinsResponseV3,
    FillV3,
    FinancialRecordsResponseV3,
    FreezeSubAccountRequestV3,
    GetCandlesRequestV3,
    GetContractsOiRequestV3,
    GetConvertRecordsRequestV3,
    GetCurrentFundingRateRequestV3,
    GetEnsureCoinsRequestV3,
    GetFillsRequestV3,
    GetFinancialRecordsRequestV3,
    GetHistoryCandlesRequestV3,
    GetHistoryFundingRateRequestV3,
    GetInstrumentsRequestV3,
    GetLoanOrderRequestV3,
    GetLTVConvertRequestV3,
    GetMarginLoansRequestV3,
    GetOpenInterestRequestV3,
    GetOrderBookRequestV3,
    GetPositionTierRequestV3,
    GetProductInfosRequestV3,
    GetRepaidHistoryRequestV3,
    GetRiskReserveRequestV3,
    GetSubAccountApiKeysRequestV3,
    GetSubAccountApiKeysResponseV3,
    GetSubAccountListRequestV3,
    GetSubAccountListResponseV3,
    GetSubTransferRecordsRequestV3,
    GetSubTransferRecordsResponseV3,
    GetSymbolsRequestV3,
    GetTickersRequestV3,
    GetTransferableCoinsRequestV3,
    GetTransferedRequestV3,
    HistoryFundingRateV3,
    InstrumentV3,
    LoanOrderV3,
    LTVConvertResponseV3,
    MarginLoanV3,
    OpenInterestV3,
    OrderBookV3,
    PaymentCoinsResponseV3,
    PositionTierV3,
    ProductInfosResponseV3,
    RepaidHistoryItemV3,
    RepayableCoinsResponseV3,
    RepayRequestV3,
    RepayResponseV3,
    RiskReserveV3,
    RiskUnitResponseV3,
    SetLeverageRequestV3,
    SubAccountTransferRequestV3,
    SubAccountTransferResponseV3,
    SymbolsResponseV3,
    TickerV3,
    TransferedResponseV3,
    TransferRequestV3,
    TransferResponseV3,
    UpdateSubAccountApiKeyRequestV3,
    UpdateSubAccountApiKeyResponseV3
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
   * Account Management endpoints
   *
   */

  /**
   * Set Leverage
   */
  setLeverage(params: SetLeverageRequestV3): Promise<APIResponse<string>> {
    return this.postPrivate('/api/v3/account/set-leverage', params);
  }

  /**
   * Set Holding Mode
   */
  setHoldMode(params: {
    holdMode: 'one_way_mode' | 'hedge_mode';
  }): Promise<APIResponse<string>> {
    return this.postPrivate('/api/v3/account/set-hold-mode', params);
  }

  /**
   * Get Account Info
   */
  getAccountSettings(): Promise<APIResponse<AccountSettingsV3>> {
    return this.getPrivate('/api/v3/account/settings');
  }

  /**
   * Get Account Assets
   */
  getAccountAssets(): Promise<APIResponse<AccountAssetsV3>> {
    return this.getPrivate('/api/v3/account/assets');
  }

  /**
   * Get Convert Records
   */
  getConvertRecords(
    params: GetConvertRecordsRequestV3,
  ): Promise<APIResponse<ConvertRecordsResponseV3>> {
    return this.getPrivate('/api/v3/account/convert-records', params);
  }

  /**
   * Get Financial Records
   */
  getFinancialRecords(
    params: GetFinancialRecordsRequestV3,
  ): Promise<APIResponse<FinancialRecordsResponseV3>> {
    return this.getPrivate('/api/v3/account/financial-records', params);
  }

  /**
   * Get Payment Coins
   */
  getPaymentCoins(): Promise<APIResponse<PaymentCoinsResponseV3>> {
    return this.getPrivate('/api/v3/account/payment-coins');
  }

  /**
   * Get Repayable Coins
   */
  getRepayableCoins(): Promise<APIResponse<RepayableCoinsResponseV3>> {
    return this.getPrivate('/api/v3/account/repayable-coins');
  }

  /**
   * Repay
   */
  submitRepay(params: RepayRequestV3): Promise<APIResponse<RepayResponseV3>> {
    return this.postPrivate('/api/v3/account/repay', params);
  }

  /**
   *
   * Sub-account Management endpoints
   *
   */

  /**
   * Create Sub-account API Key
   */
  createSubAccountApiKey(
    params: CreateSubAccountApiKeyRequestV3,
  ): Promise<APIResponse<CreateSubAccountApiKeyResponseV3>> {
    return this.postPrivate('/api/v3/user/create-sub-api', params);
  }

  /**
   * Delete Sub-account API Key
   */
  deleteSubAccountApiKey(
    params: DeleteSubAccountApiKeyRequestV3,
  ): Promise<APIResponse<object>> {
    return this.postPrivate('/api/v3/user/delete-sub-api', params);
  }

  /**
   * Get Sub-account API Keys
   */
  getSubAccountApiKeys(
    params: GetSubAccountApiKeysRequestV3,
  ): Promise<APIResponse<GetSubAccountApiKeysResponseV3>> {
    return this.getPrivate('/api/v3/user/sub-api-list', params);
  }

  /**
   * Modify Sub-account API Key
   */
  updateSubAccountApiKey(
    params: UpdateSubAccountApiKeyRequestV3,
  ): Promise<APIResponse<UpdateSubAccountApiKeyResponseV3>> {
    return this.postPrivate('/api/v3/user/update-sub-api', params);
  }

  /**
   * Create Sub-account
   */
  createSubAccount(
    params: CreateSubAccountRequestV3,
  ): Promise<APIResponse<CreateSubAccountResponseV3>> {
    return this.postPrivate('/api/v3/user/create-sub', params);
  }

  /**
   * Freeze/Unfreeze Sub-account
   */
  freezeSubAccount(
    params: FreezeSubAccountRequestV3,
  ): Promise<APIResponse<object>> {
    return this.postPrivate('/api/v3/user/freeze-sub', params);
  }

  /**
   * Get Sub-account List
   */
  getSubAccountList(
    params?: GetSubAccountListRequestV3,
  ): Promise<APIResponse<GetSubAccountListResponseV3>> {
    return this.getPrivate('/api/v3/user/sub-list', params);
  }

  /**
   *
   * Transfer endpoints
   *
   */

  /**
   * Transfer
   */
  submitTransfer(params: TransferRequestV3): Promise<APIResponse<TransferResponseV3>> {
    return this.postPrivate('/api/v3/account/transfer', params);
  }

  /**
   * Get Transferable Coins
   */
  getTransferableCoins(
    params: GetTransferableCoinsRequestV3,
  ): Promise<APIResponse<string[]>> {
    return this.getPrivate('/api/v3/account/transferable-coins', params);
  }

  /**
   * Get Main-Sub Transfer Records
   */
  getSubTransferRecords(
    params?: GetSubTransferRecordsRequestV3,
  ): Promise<APIResponse<GetSubTransferRecordsResponseV3>> {
    return this.getPrivate('/api/v3/account/sub-transfer-record', params);
  }

  /**
   * Main-Sub Account Transfer
   */
  subAccountTransfer(
    params: SubAccountTransferRequestV3,
  ): Promise<APIResponse<SubAccountTransferResponseV3>> {
    return this.postPrivate('/api/v3/account/sub-transfer', params);
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

  /**
   *
   * Loan endpoints
   *
   */

  /**
   * Get Transferred Quantity
   */
  getLoanTransfered(
    params: GetTransferedRequestV3,
  ): Promise<APIResponse<TransferedResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/transfered', params);
  }

  /**
   * Get Trade Symbols
   */
  getLoanSymbols(
    params: GetSymbolsRequestV3,
  ): Promise<APIResponse<SymbolsResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/symbols', params);
  }

  /**
   * Get Risk Unit
   */
  getLoanRiskUnit(): Promise<APIResponse<RiskUnitResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/risk-unit');
  }

  /**
   * Get Repayment Orders
   */
  getLoanRepaidHistory(
    params?: GetRepaidHistoryRequestV3,
  ): Promise<APIResponse<RepaidHistoryItemV3[]>> {
    return this.getPrivate('/api/v3/ins-loan/repaid-history', params);
  }

  /**
   * Get Product Info
   */
  getLoanProductInfo(
    params: GetProductInfosRequestV3,
  ): Promise<APIResponse<ProductInfosResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/product-infos', params);
  }

  /**
   * Get Loan Orders
   */
  getLoanOrder(
    params?: GetLoanOrderRequestV3,
  ): Promise<APIResponse<LoanOrderV3[]>> {
    return this.getPrivate('/api/v3/ins-loan/loan-order', params);
  }

  /**
   * Get Margin Coin Info
   */
  getLoanMarginCoinInfo(
    params: GetEnsureCoinsRequestV3,
  ): Promise<APIResponse<EnsureCoinsResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/ensure-coins-convert', params);
  }

  /**
   * Bind/Unbind UID to Risk Unit
   */
  bindLoanUid(params: BindUidRequestV3): Promise<APIResponse<BindUidResponseV3>> {
    return this.postPrivate('/api/v3/ins-loan/bind-uid', params);
  }

  /**
   * Get LTV
   */
  getLoanLTVConvert(
    params?: GetLTVConvertRequestV3,
  ): Promise<APIResponse<LTVConvertResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/ltv-convert', params);
  }


}
