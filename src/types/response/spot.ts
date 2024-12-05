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

export interface SpotMarketTrade {
  symbol: string;
  tradeId: string;
  side: 'buy' | 'sell';
  fillPrice: string;
  fillQuantity: string;
  fillTime: string;
}

export interface SpotAccountAsset {
  coin: string;
  available: string;
  frozen: string;
  locked: string;
  limitAvailable: string;
  uTime: string;
}

export interface SpotAccountBill {
  cTime: string;
  coino: string;
  groupType: string;
  businessType:
    | 'SMALL_EXCHANGE_USER_IN'
    | 'SMALL_EXCHANGE_USER_OUT'
    | 'AIRDROP_REWARD'
    | 'WITHDRAW'
    | string; // TODO: complete list of possible values here?
  size: string;
  balance: string;
  fees: string;
  billd: string;
}
