import {
  AccountAssetsV3,
  AccountSettingsV3,
  APIResponse,
  BatchModifyOrderRequestV3,
  BatchModifyOrderResponseV3,
  BindUidRequestV3,
  BindUidResponseV3,
  CancelAllOrdersRequestV3,
  CancelAllOrdersResponseV3,
  CancelBatchOrdersRequestV3,
  CancelBatchOrdersResponseV3,
  CancelOrderRequestV3,
  CancelOrderResponseV3,
  CancelStrategyOrderRequestV3,
  CandlestickV3,
  CloseAllPositionsRequestV3,
  CloseAllPositionsResponseV3,
  CoinInfoV3,
  ContractOiV3,
  ConvertRecordV3,
  CountdownCancelAllRequestV3,
  CreateSubAccountApiKeyRequestV3,
  CreateSubAccountApiKeyResponseV3,
  CreateSubAccountRequestV3,
  CreateSubAccountResponseV3,
  CurrentFundingRateV3,
  CurrentPositionV3,
  DeleteSubAccountApiKeyRequestV3,
  DepositAddressV3,
  DepositRecordV3,
  DiscountRateV3,
  FillV3,
  FinancialRecordV3,
  FreezeSubAccountRequestV3,
  FundingAssetV3,
  GetCandlesRequestV3,
  GetContractsOiRequestV3,
  GetConvertRecordsRequestV3,
  GetCurrentFundingRateRequestV3,
  GetCurrentPositionRequestV3,
  GetDepositAddressRequestV3,
  GetDepositRecordsRequestV3,
  GetEnsureCoinsRequestV3,
  GetFeeRateRequestV3,
  GetFillsRequestV3,
  GetFinancialRecordsRequestV3,
  GetFundingAssetsRequestV3,
  GetHistoryCandlesRequestV3,
  GetHistoryFundingRateRequestV3,
  GetHistoryOrdersRequestV3,
  GetHistoryStrategyOrdersRequestV3,
  GetInstrumentsRequestV3,
  GetLoanOrderRequestV3,
  GetLTVConvertRequestV3,
  GetMarginLoansRequestV3,
  GetMaxOpenAvailableRequestV3,
  GetMaxOpenAvailableResponseV3,
  GetOpenInterestRequestV3,
  GetOrderBookRequestV3,
  GetOrderInfoRequestV3,
  GetPositionHistoryRequestV3,
  GetPositionTierRequestV3,
  GetProductInfosRequestV3,
  GetPublicFillsRequestV3,
  GetRepaidHistoryRequestV3,
  GetRiskReserveRequestV3,
  GetSubAccountApiKeysRequestV3,
  GetSubAccountListRequestV3,
  GetSubDepositAddressRequestV3,
  GetSubDepositRecordsRequestV3,
  GetSubTransferRecordsRequestV3,
  GetSubUnifiedAssetsRequestV3,
  GetSymbolsRequestV3,
  GetTickersRequestV3,
  GetTransferableCoinsRequestV3,
  GetTransferedRequestV3,
  GetUnfilledOrdersRequestV3,
  GetUnfilledStrategyOrdersRequestV3,
  GetWithdrawRecordsRequestV3,
  HistoryFundingRateV3,
  HistoryOrderV3,
  InstrumentV3,
  LoanOrderV3,
  LoanProductInfoV3,
  LoanSymbolsV3,
  LoanTransfersV3,
  LTVConvertResponseV3,
  MarginLoanV3,
  ModifyOrderRequestV3,
  ModifyOrderResponseV3,
  ModifyStrategyOrderRequestV3,
  ModifyStrategyOrderResponseV3,
  OpenInterestV3,
  OrderBookV3,
  OrderInfoV3,
  PaymentCoinV3,
  PlaceBatchOrdersRequestV3,
  PlaceBatchOrdersResponseV3,
  PlaceOrderRequestV3,
  PlaceOrderResponseV3,
  PlaceStrategyOrderRequestV3,
  PlaceStrategyOrderResponseV3,
  PositionHistoryV3,
  PositionTierV3,
  PublicFillV3,
  RepaidHistoryItemV3,
  RepayableCoinV3,
  RepayRequestV3,
  RepayResponseV3,
  RiskReserveV3,
  SetLeverageRequestV3,
  StrategyOrderV3,
  SubAccountApiKeyV3,
  SubAccountTransferRequestV3,
  SubAccountV3,
  SubTransferRecordV3,
  SubUnifiedAssetV3,
  SwitchDeductRequestV3,
  TickerV3,
  TransferRequestV3,
  TransferResponseV3,
  UnfilledOrderV3,
  UpdateSubAccountApiKeyRequestV3,
  UpdateSubAccountApiKeyResponseV3,
  WithdrawRecordV3,
  WithdrawRequestV3,
  WithdrawResponseV3,
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
   * =====Market======= endpoints
   *
   */

  /**
   * Get Instruments
   */
  getInstruments(
    params: GetInstrumentsRequestV3,
  ): Promise<APIResponse<InstrumentV3[]>> {
    return this.get('/api/v3/market/instruments', params);
  }

  /**
   * Get Tickers
   */
  getTickers(params: GetTickersRequestV3): Promise<APIResponse<TickerV3[]>> {
    return this.get('/api/v3/market/tickers', params);
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
   * Get Recent Public Fills
   */
  getFills(
    params: GetPublicFillsRequestV3,
  ): Promise<APIResponse<PublicFillV3[]>> {
    return this.get('/api/v3/market/fills', params);
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
   * Get Current Funding Rate
   */
  getCurrentFundingRate(
    params: GetCurrentFundingRateRequestV3,
  ): Promise<APIResponse<CurrentFundingRateV3[]>> {
    return this.get('/api/v3/market/current-fund-rate', params);
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
   * Get Risk Reserve
   */
  getRiskReserve(
    params: GetRiskReserveRequestV3,
  ): Promise<APIResponse<RiskReserveV3>> {
    return this.get('/api/v3/market/risk-reserve', params);
  }

  /**
   * Get Discount Rate
   */
  getDiscountRate(): Promise<APIResponse<DiscountRateV3[]>> {
    return this.get('/api/v3/market/discount-rate');
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
   * Get Position Tier
   */
  getPositionTier(
    params: GetPositionTierRequestV3,
  ): Promise<APIResponse<PositionTierV3[]>> {
    return this.get('/api/v3/market/position-tier', params);
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
   *
   * =====Account======= endpoints
   *
   */

  /**
   * Get Account Assets
   */
  getBalances(): Promise<APIResponse<AccountAssetsV3>> {
    return this.getPrivate('/api/v3/account/assets');
  }

  /**
   * Get Fund Account Assets
   */
  getFundingAssets(
    params?: GetFundingAssetsRequestV3,
  ): Promise<APIResponse<FundingAssetV3[]>> {
    return this.getPrivate('/api/v3/account/funding-assets', params);
  }

  /**
   * Get Account Info
   */
  getAccountSettings(): Promise<APIResponse<AccountSettingsV3>> {
    return this.getPrivate('/api/v3/account/settings');
  }

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
   * Get Financial Records
   */
  getFinancialRecords(params: GetFinancialRecordsRequestV3): Promise<
    APIResponse<{
      list: FinancialRecordV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/account/financial-records', params);
  }

  /**
   * Get Repayable Coins
   */
  getRepayableCoins(): Promise<
    APIResponse<{
      repayableCoinList: RepayableCoinV3[];
      maxSelection: string;
    }>
  > {
    return this.getPrivate('/api/v3/account/repayable-coins');
  }

  /**
   * Get Payment Coins
   */
  getPaymentCoins(): Promise<
    APIResponse<{
      paymentCoinList: PaymentCoinV3[];
      maxSelection: string;
    }>
  > {
    return this.getPrivate('/api/v3/account/payment-coins');
  }

  /**
   * Repay
   */
  submitRepay(params: RepayRequestV3): Promise<APIResponse<RepayResponseV3>> {
    return this.postPrivate('/api/v3/account/repay', params);
  }

  /**
   * Get Convert Records
   */
  getConvertRecords(params: GetConvertRecordsRequestV3): Promise<
    APIResponse<{
      list: ConvertRecordV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/account/convert-records', params);
  }

  /**
   * Switch Deduct - Set BGB deduction
   */
  switchDeduct(params: SwitchDeductRequestV3): Promise<APIResponse<string>> {
    return this.postPrivate('/api/v3/account/switch-deduct', params);
  }

  /**
   * Get Deduct Info - Get BGB deduction status
   */
  getDeductInfo(): Promise<
    APIResponse<{
      deduct: 'on' | 'off';
    }>
  > {
    return this.getPrivate('/api/v3/account/deduct-info');
  }

  /**
   * Get Trading Fee Rate
   */
  getFeeRate(params: GetFeeRateRequestV3): Promise<
    APIResponse<{
      makerFeeRate: string;
      takerFeeRate: string;
    }>
  > {
    return this.getPrivate('/api/v3/account/fee-rate', params);
  }

  /**
   *
   * =====SubAccount======= endpoints
   *
   */

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
   * Get Sub-account Unified Account Assets
   */
  getSubUnifiedAssets(
    params?: GetSubUnifiedAssetsRequestV3,
  ): Promise<APIResponse<SubUnifiedAssetV3[]>> {
    return this.getPrivate('/api/v3/account/sub-unified-assets', params);
  }

  /**
   * Get Sub-account List
   */
  getSubAccountList(params?: GetSubAccountListRequestV3): Promise<
    APIResponse<{
      list: SubAccountV3[];
      hasNext: boolean;
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/user/sub-list', params);
  }

  /**
   * Create Sub-account API Key
   */
  createSubAccountApiKey(
    params: CreateSubAccountApiKeyRequestV3,
  ): Promise<APIResponse<CreateSubAccountApiKeyResponseV3>> {
    return this.postPrivate('/api/v3/user/create-sub-api', params);
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
   * Delete Sub-account API Key
   */
  deleteSubAccountApiKey(
    params: DeleteSubAccountApiKeyRequestV3,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/api/v3/user/delete-sub-api', params);
  }

  /**
   * Get Sub-account API Keys
   */
  getSubAccountApiKeys(params: GetSubAccountApiKeysRequestV3): Promise<
    APIResponse<{
      items: SubAccountApiKeyV3[];
      hasNext: boolean;
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/user/sub-api-list', params);
  }

  /**
   *
   * =====Transfer======= endpoints
   *
   */

  /**
   * Get Transferable Coins
   */
  getTransferableCoins(
    params: GetTransferableCoinsRequestV3,
  ): Promise<APIResponse<string[]>> {
    return this.getPrivate('/api/v3/account/transferable-coins', params);
  }

  /**
   * Transfer
   */
  submitTransfer(
    params: TransferRequestV3,
  ): Promise<APIResponse<TransferResponseV3>> {
    return this.postPrivate('/api/v3/account/transfer', params);
  }

  /**
   * Main-Sub Account Transfer
   */
  subAccountTransfer(params: SubAccountTransferRequestV3): Promise<
    APIResponse<{
      transferId: string;
      clientOid: string;
    }>
  > {
    return this.postPrivate('/api/v3/account/sub-transfer', params);
  }

  /**
   * Get Main-Sub Transfer Records
   */
  getSubTransferRecords(params?: GetSubTransferRecordsRequestV3): Promise<
    APIResponse<{
      items: SubTransferRecordV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/account/sub-transfer-record', params);
  }

  /**
   *
   * =====Deposit======= endpoints
   *
   */

  /**
   * Get Deposit Address
   */
  getDepositAddress(
    params: GetDepositAddressRequestV3,
  ): Promise<APIResponse<DepositAddressV3>> {
    return this.getPrivate('/api/v3/account/deposit-address', params);
  }

  /**
   * Get Sub Deposit Address
   */
  getSubDepositAddress(
    params: GetSubDepositAddressRequestV3,
  ): Promise<APIResponse<DepositAddressV3>> {
    return this.getPrivate('/api/v3/account/sub-deposit-address', params);
  }

  /**
   * Get Deposit Records
   */
  getDepositRecords(
    params: GetDepositRecordsRequestV3,
  ): Promise<APIResponse<DepositRecordV3[]>> {
    return this.getPrivate('/api/v3/account/deposit-records', params);
  }

  /**
   * Get Sub Deposit Records
   */
  getSubDepositRecords(
    params: GetSubDepositRecordsRequestV3,
  ): Promise<APIResponse<DepositRecordV3[]>> {
    return this.postPrivate('/api/v3/account/sub-deposit-records', params);
  }

  /**
   *
   * =====Withdraw======= endpoints
   *
   */

  /**
   * Withdraw - Includes on-chain withdrawals and internal transfers
   */
  submitWithdraw(
    params: WithdrawRequestV3,
  ): Promise<APIResponse<WithdrawResponseV3>> {
    return this.postPrivate('/api/v3/account/withdraw', params);
  }

  /**
   * Get Withdraw Records
   */
  getWithdrawRecords(
    params: GetWithdrawRecordsRequestV3,
  ): Promise<APIResponse<WithdrawRecordV3[]>> {
    return this.getPrivate('/api/v3/account/withdrawal-records', params);
  }

  /**
   *
   * =====Trade======= endpoints
   *
   */

  /**
   * Place Order
   */
  submitNewOrder(
    params: PlaceOrderRequestV3,
  ): Promise<APIResponse<PlaceOrderResponseV3>> {
    return this.postPrivate('/api/v3/trade/place-order', params);
  }

  /**
   * Modify Order
   */
  modifyOrder(
    params: ModifyOrderRequestV3,
  ): Promise<APIResponse<ModifyOrderResponseV3>> {
    return this.postPrivate('/api/v3/trade/modify-order', params);
  }

  /**
   * Cancel Order
   */
  cancelOrder(
    params: CancelOrderRequestV3,
  ): Promise<APIResponse<CancelOrderResponseV3>> {
    return this.postPrivate('/api/v3/trade/cancel-order', params);
  }

  /**
   * Batch Order
   */
  placeBatchOrders(
    params: PlaceBatchOrdersRequestV3[],
  ): Promise<APIResponse<PlaceBatchOrdersResponseV3[]>> {
    return this.postPrivate('/api/v3/trade/place-batch', params);
  }

  /**
   * Batch Modify Orders
   */
  batchModifyOrders(
    params: BatchModifyOrderRequestV3[],
  ): Promise<APIResponse<BatchModifyOrderResponseV3[]>> {
    return this.postPrivate('/api/v3/trade/batch-modify-order', params);
  }

  /**
   * Batch Cancel
   */
  cancelBatchOrders(
    params: CancelBatchOrdersRequestV3[],
  ): Promise<APIResponse<CancelBatchOrdersResponseV3[]>> {
    return this.postPrivate('/api/v3/trade/cancel-batch', params);
  }

  /**
   * Cancel All Orders
   */
  cancelAllOrders(
    params: CancelAllOrdersRequestV3,
  ): Promise<APIResponse<CancelAllOrdersResponseV3>> {
    return this.postPrivate('/api/v3/trade/cancel-symbol-order', params);
  }

  /**
   * Close All Positions
   */
  closeAllPositions(
    params: CloseAllPositionsRequestV3,
  ): Promise<APIResponse<CloseAllPositionsResponseV3>> {
    return this.postPrivate('/api/v3/trade/close-positions', params);
  }

  /**
   * Get Order Details
   */
  getOrderInfo(
    params: GetOrderInfoRequestV3,
  ): Promise<APIResponse<OrderInfoV3>> {
    return this.getPrivate('/api/v3/trade/order-info', params);
  }

  /**
   * Get Open Orders
   */
  getUnfilledOrders(params?: GetUnfilledOrdersRequestV3): Promise<
    APIResponse<{
      list: UnfilledOrderV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/trade/unfilled-orders', params);
  }

  /**
   * Get Order History
   */
  getHistoryOrders(params: GetHistoryOrdersRequestV3): Promise<
    APIResponse<{
      list: HistoryOrderV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/trade/history-orders', params);
  }

  /**
   * Get Fill History
   */
  getTradeFills(params?: GetFillsRequestV3): Promise<
    APIResponse<{
      list: FillV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/trade/fills', params);
  }

  /**
   * Get Position Info
   */
  getCurrentPosition(params: GetCurrentPositionRequestV3): Promise<
    APIResponse<{
      list: CurrentPositionV3[];
    }>
  > {
    return this.getPrivate('/api/v3/position/current-position', params);
  }

  /**
   * Get Positions History
   */
  getPositionHistory(params: GetPositionHistoryRequestV3): Promise<
    APIResponse<{
      list: PositionHistoryV3[];
      cursor: string;
    }>
  > {
    return this.getPrivate('/api/v3/position/history-position', params);
  }

  /**
   * Get Max Open Available
   */
  getMaxOpenAvailable(
    params: GetMaxOpenAvailableRequestV3,
  ): Promise<APIResponse<GetMaxOpenAvailableResponseV3>> {
    return this.postPrivate('/api/v3/account/max-open-available', params);
  }

  /**
   * CountDown Cancel All
   */
  countdownCancelAll(
    params: CountdownCancelAllRequestV3,
  ): Promise<APIResponse<string>> {
    return this.postPrivate('/api/v3/trade/countdown-cancel-all', params);
  }

  /**
   *
   * =====Inst Loan======= endpoints
   *
   */

  /**
   * Get Transferred Quantity
   */
  getLoanTransfered(
    params: GetTransferedRequestV3,
  ): Promise<APIResponse<LoanTransfersV3>> {
    return this.getPrivate('/api/v3/ins-loan/transfered', params);
  }

  /**
   * Get Trade Symbols
   */
  getLoanSymbols(
    params: GetSymbolsRequestV3,
  ): Promise<APIResponse<LoanSymbolsV3>> {
    return this.getPrivate('/api/v3/ins-loan/symbols', params);
  }

  /**
   * Get Risk Unit
   */
  getLoanRiskUnit(): Promise<
    APIResponse<{
      riskUnitId: string[];
    }>
  > {
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
  ): Promise<APIResponse<LoanProductInfoV3>> {
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
   * Get LTV
   */
  getLoanLTVConvert(
    params?: GetLTVConvertRequestV3,
  ): Promise<APIResponse<LTVConvertResponseV3>> {
    return this.getPrivate('/api/v3/ins-loan/ltv-convert', params);
  }

  /**
   * Get Margin Coin Info
   */
  getLoanMarginCoinInfo(params: GetEnsureCoinsRequestV3): Promise<
    APIResponse<{
      productId: string;
      coinInfo: CoinInfoV3[];
    }>
  > {
    return this.getPrivate('/api/v3/ins-loan/ensure-coins-convert', params);
  }

  /**
   * Bind/Unbind UID to Risk Unit
   */
  bindLoanUid(
    params: BindUidRequestV3,
  ): Promise<APIResponse<BindUidResponseV3>> {
    return this.postPrivate('/api/v3/ins-loan/bind-uid', params);
  }

  /**
   *
   * =====Strategy======= endpoints
   *
   */

  /**
   * Place Strategy Order
   */
  submitStrategyOrder(
    params: PlaceStrategyOrderRequestV3,
  ): Promise<APIResponse<PlaceStrategyOrderResponseV3>> {
    return this.postPrivate('/api/v3/trade/place-strategy-order', params);
  }

  /**
   * Modify Strategy Order
   */
  modifyStrategyOrder(
    params: ModifyStrategyOrderRequestV3,
  ): Promise<APIResponse<ModifyStrategyOrderResponseV3>> {
    return this.postPrivate('/api/v3/trade/modify-strategy-order', params);
  }

  /**
   * Cancel Strategy Order
   */
  cancelStrategyOrder(
    params: CancelStrategyOrderRequestV3,
  ): Promise<APIResponse<null>> {
    return this.postPrivate('/api/v3/trade/cancel-strategy-order', params);
  }

  /**
   * Get Unfilled Strategy Orders
   */
  getUnfilledStrategyOrders(
    params: GetUnfilledStrategyOrdersRequestV3,
  ): Promise<APIResponse<StrategyOrderV3[]>> {
    return this.getPrivate('/api/v3/trade/unfilled-strategy-orders', params);
  }

  /**
   * Get Strategy Order History
   */
  getHistoryStrategyOrders(params: GetHistoryStrategyOrdersRequestV3): Promise<
    APIResponse<{
      list: StrategyOrderV3[];
      cursor?: string;
    }>
  > {
    return this.getPrivate('/api/v3/trade/history-strategy-orders', params);
  }
}
