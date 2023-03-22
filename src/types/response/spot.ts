export interface CoinBalance {
  coinId: number;
  coinName: string;
  available: string;
  frozen: string;
  lock: string;
  uTime: string;
}

export interface SymbolRules {
  symbol: string;
  symbolName: string;
  baseCoin: string;
  quoteCoin: string;
  minTradeAmount: string;
  maxTradeAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  priceScale: string;
  quantityScale: string;
  status: string;
}

export interface SpotOrderResult {
  orderId: string;
  clientOrderId: string;
}

export interface SpotPlanOrder {
  orderId: string;
  clientOid: string;
  symbol: string;
  size: string;
  executePrice: string;
  triggerPrice: string;
  status: string;
  orderType: string;
  side: string;
  triggerType: string;
  enterPointSource: string;
  cTime: number;
}
