export interface PlaceStrategyOrderResponseV3 {
  orderId: string;
  clientOid: string;
}

export interface ModifyStrategyOrderResponseV3 {
  orderId: string;
  clientOid: string;
}

export interface StrategyOrderV3 {
  orderId: string;
  clientOid: string;
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  qty: string;
  posSide: 'long' | 'short';
  tpTriggerBy: 'market' | 'mark';
  slTriggerBy: 'market' | 'mark';
  takeProfit: string;
  stopLoss: string;
  tpOrderType: 'limit' | 'market';
  slOrderType: 'limit' | 'market';
  tpLimitPrice: string;
  slLimitPrice: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetHistoryStrategyOrdersResponseV3 {
  list: StrategyOrderV3[];
  cursor?: string;
}
