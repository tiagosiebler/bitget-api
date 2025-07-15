export interface PlaceStrategyOrderRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  clientOid?: string;
  type?: 'tpsl';
  tpslMode?: 'full' | 'partial';
  qty: string;
  posSide: 'long' | 'short';
  tpTriggerBy?: 'market' | 'mark';
  slTriggerBy?: 'market' | 'mark';
  takeProfit?: string;
  stopLoss?: string;
  tpOrderType?: 'limit' | 'market';
  slOrderType?: 'limit' | 'market';
  tpLimitPrice?: string;
  slLimitPrice?: string;
}

export interface ModifyStrategyOrderRequestV3 {
  orderId?: string;
  clientOid?: string;
  qty: string;
  tpTriggerBy?: 'market' | 'mark';
  slTriggerBy?: 'market' | 'mark';
  takeProfit?: string;
  stopLoss?: string;
  tpOrderType?: 'limit' | 'market';
  slOrderType?: 'limit' | 'market';
  tpLimitPrice?: string;
  slLimitPrice?: string;
}

export interface CancelStrategyOrderRequestV3 {
  orderId?: string;
  clientOid?: string;
}

export interface GetUnfilledStrategyOrdersRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  type?: 'tpsl';
}

export interface GetHistoryStrategyOrdersRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  type?: 'tpsl';
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}
