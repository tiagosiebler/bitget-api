export interface FuturesAccount {
  marginCoin: string;
  locked: number;
  available: number;
  crossMaxAvailable: number;
  fixedMaxAvailable: number;
  maxTransferOut: number;
  equity: number;
  usdtEquity: number;
  btcEquity: number;
  crossRiskRate: number;
  crossMarginLeverage: number;
  fixedLongLeverage: number;
  fixedShortLeverage: number;
  marginMode: string;
  holdMode: string;
}

export interface FuturesSymbolRule {
  baseCoin: string;
  buyLimitPriceRatio: string;
  feeRateUpRatio: string;
  makerFeeRate: string;
  minTradeNum: string;
  openCostUpRatio: string;
  priceEndStep: string;
  pricePlace: string;
  quoteCoin: string;
  sellLimitPriceRatio: string;
  sizeMultiplier: string;
  supportMarginCoins: string[];
  symbol: string;
  takerFeeRate: string;
  volumePlace: string;
}
