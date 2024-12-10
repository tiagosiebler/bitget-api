type SpotKlineIntervalV2 =
  | '1min'
  | '5min'
  | '15min'
  | '30min'
  | '1h'
  | '4h'
  | '6h'
  | '12h'
  | '1day'
  | '3day'
  | '1week'
  | '1M'
  | '6Hutc'
  | '12Hutc'
  | '1Dutc'
  | '3Dutc'
  | '1Wutc'
  | '1Mutc';

export interface SpotCandlesRequestV2 {
  symbol: string;
  granularity: SpotKlineIntervalV2;
  startTime?: string;
  endTime?: string;
  limit?: string;
}

export interface SpotHistoricCandlesRequestV2 {
  symbol: string;
  granularity: SpotKlineIntervalV2;
  endTime?: string;
  limit?: string;
}

export interface SpotHistoricTradesRequestV2 {
  symbol: string;
  limit?: string;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
}

/**
 *
 * * Spot | Trade
 *
 */

export type SpotOrderSideV2 = 'buy' | 'sell';

export type SpotOrderTypeV2 = 'limit' | 'market';

export type SpotOrderForceV2 = 'gtc' | 'post_only' | 'fok' | 'ioc';

export type SpotTPSLTypeV2 = 'normal' | 'tpsl';

export type SpotSTPModeV2 =
  | 'none'
  | 'cancel_taker'
  | 'cancel_maker'
  | 'cancel_both';

export type SpotBatchModeV2 = 'single' | 'multiple';

export interface SpotOrderRequestV2 {
  symbol: string;
  side: SpotOrderSideV2;
  orderType: SpotOrderTypeV2;
  force: SpotOrderForceV2;
  price?: string;
  size: string;
  clientOid?: string;
  triggerPrice?: string;
  tpslType?: SpotTPSLTypeV2;
  requestTime?: string;
  receiveWindow?: string;
  stpMode?: SpotSTPModeV2;
  presetTakeProfitPrice?: string;
  executeTakeProfitPrice?: string;
  presetStopLossPrice?: string;
  executeStopLossPrice?: string;
}

export interface SpotCancelandSubmitOrderRequestV2 {
  symbol: string;
  price: string;
  size: string;
  orderId?: string;
  clientOid?: string;
  newClientOid?: string;
  presetTakeProfitPrice?: string;
  executeTakeProfitPrice?: string;
  presetStopLossPrice?: string;
  executeStopLossPrice?: string;
}

export interface SpotCancelOrderRequestV2 {
  symbol: string;
  tpslType?: SpotTPSLTypeV2;
  orderId?: string;
  clientOid?: string;
}

export interface SpotBatchOrderRequestItemV2 {
  symbol?: string;
  side: SpotOrderSideV2;
  orderType: SpotOrderTypeV2;
  force: SpotOrderForceV2;
  price?: string;
  size: string;
  clientOid?: string;
  stpMode?: SpotSTPModeV2;
  presetTakeProfitPrice?: string;
  executeTakeProfitPrice?: string;
  presetStopLossPrice?: string;
  executeStopLossPrice?: string;
}

export interface SpotBatchOrderRequestV2 {
  symbol?: string;
  batchMode?: SpotBatchModeV2;
  orderList: SpotBatchOrderRequestItemV2[];
}

export interface SpotBatchCancelOrderRequestV2 {
  symbol?: string;
  batchMode?: SpotBatchModeV2;
  orderList: {
    symbol?: string;
    orderId?: string;
    clientOid?: string;
  }[];
}

export interface GetSpotOrderInfoRequestV2 {
  orderId?: string;
  clientOid?: string;
  requestTime?: string;
  receiveWindow?: string;
}

export interface GetSpotOpenOrdersRequestV2 {
  symbol?: string;
  startTime?: string;
  endTime?: string;
  idLessThan?: string;
  limit?: string;
  orderId?: string;
  tpslType?: SpotTPSLTypeV2;
  requestTime?: string;
  receiveWindow?: string;
}

export interface GetSpotHistoryOrdersRequestV2 {
  symbol?: string;
  startTime?: string;
  endTime?: string;
  idLessThan?: string;
  limit?: string;
  orderId?: string;
  tpslType?: SpotTPSLTypeV2;
  requestTime?: string;
  receiveWindow?: string;
}

export interface GetSpotFillsRequestV2 {
  symbol: string;
  orderId?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

/**
 *
 * * Spot | Trigger Orders
 *
 */

export type SpotPlanTypeV2 = 'amount' | 'total';

export type SpotTriggerTypeV2 = 'fill_price' | 'mark_price';

export interface SpotPlanOrderRequestV2 {
  symbol: string;
  side: SpotOrderSideV2;
  triggerPrice: string;
  orderType: SpotOrderTypeV2;
  executePrice?: string;
  planType?: SpotPlanTypeV2;
  size: string;
  triggerType: SpotTriggerTypeV2;
  clientOid?: string;
  force?: SpotOrderForceV2;
  stpMode?: SpotSTPModeV2;
}

export interface SpotModifyPlanOrderRequestV2 {
  orderId?: string;
  clientOid?: string;
  triggerPrice: string;
  orderType: SpotOrderTypeV2;
  executePrice?: string;
  size: string;
}

export interface GetSpotCurrentPlanOrdersRequestV2 {
  symbol: string;
  limit?: string;
  idLessThan?: string;
  startTime?: string;
  endTime?: string;
}

export interface GetSpotHistoryPlanOrdersRequestV2 {
  symbol: string;
  startTime: string;
  endTime: string;
  limit?: string;
}

/**
 *
 * * Spot | Account
 *
 */

export type SpotBillGroupTypeV2 =
  | 'deposit'
  | 'withdraw'
  | 'transaction'
  | 'transfer'
  | 'other';

export type SpotBusinessTypeV2 =
  | 'deposit'
  | 'withdraw'
  | 'buy'
  | 'sell'
  | 'deduction of handling fee'
  | 'transfer-in'
  | 'transfer-out'
  | 'rebate rewards'
  | 'airdrop rewards'
  | 'USDT contract rewards'
  | 'mix contract rewards'
  | 'system lock'
  | 'user lock';

export type SpotAccountTypeV2 =
  | 'spot'
  | 'p2p'
  | 'coin_futures'
  | 'usdt_futures'
  | 'usdc_futures'
  | 'crossed_margin'
  | 'isolated_margin';

export interface GetSpotAccountBillsRequestV2 {
  coin?: string;
  groupType?: SpotBillGroupTypeV2;
  businessType?: SpotBusinessTypeV2;
  startTime?: string;
  endTime?: string;
  limit?: string;
  idLessThan?: string;
}

export interface SpotTransferRequestV2 {
  fromType: SpotAccountTypeV2;
  toType: SpotAccountTypeV2;
  amount: string;
  coin: string;
  symbol: string;
  clientOid?: string;
}

export interface SpotSubAccountTransferRequestV2 {
  fromType: SpotAccountTypeV2;
  toType: SpotAccountTypeV2;
  amount: string;
  coin: string;
  symbol?: string;
  clientOid?: string;
  fromUserId: string;
  toUserId: string;
}

export interface SpotWithdrawalRequestV2 {
  coin: string;
  transferType: 'on_chain' | 'internal_transfer';
  address: string;
  chain?: string;
  innerToType?: 'email' | 'mobile' | 'uid';
  areaCode?: string;
  tag?: string;
  size: string;
  remark?: string;
  clientOid?: string;
}

export interface SpotMainSubTransferRecordRequestV2 {
  coin?: string;
  role?: 'initiator' | 'receiver';
  subUid?: string;
  startTime?: string;
  endTime?: string;
  clientOid?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetSpotTransferRecordRequestV2 {
  coin: string;
  fromType: SpotAccountTypeV2;
  startTime?: string;
  endTime?: string;
  clientOid?: string;
  limit?: string;
  idLessThan?: string;
}

export interface GetSpotSubAccountDepositRecordRequestV2 {
  subUid: string;
  coin?: string;
  startTime?: string;
  endTime?: string;
  idLessThan?: string;
  limit?: string;
}

export interface GetSpotWithdrawalRecordRequestV2 {
  coin?: string;
  clientOid?: string;
  startTime: string;
  endTime: string;
  idLessThan?: string;
  orderId?: string;
  limit?: string;
}

export interface GetSpotDepositRecordRequestV2 {
  coin?: string;
  orderId?: string;
  startTime: string;
  endTime: string;
  idLessThan?: string;
  limit?: string;
}
