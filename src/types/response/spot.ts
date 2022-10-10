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
