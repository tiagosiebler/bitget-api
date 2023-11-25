import {
  FuturesHoldMode,
  FuturesHoldSide,
  FuturesMarginMode,
} from '../request';

export interface FuturesMarketTrade {
  tradeId: string;
  price: string;
  size: string;
  side: 'buy' | 'sell';
  timestamp: string;
  symbol: string;
}

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
  limitOpenTime: string;
  maintainTime: string;
  makerFeeRate: string;
  maxOrderNum: string;
  maxPositionNum: string;
  minTradeNum: string;
  minTradeUSDT: string;
  offTime: string;
  openCostUpRatio: string;
  priceEndStep: string;
  pricePlace: string;
  quoteCoin: string;
  sellLimitPriceRatio: string;
  sizeMultiplier: string;
  supportMarginCoins: string[];
  symbol: string;
  symbolName: string;
  symbolStatus: string;
  symbolType: string;
  takerFeeRate: string;
  volumePlace: string;
}

export interface FuturesPosition {
  marginCoin: string;
  symbol: string;
  holdSide: FuturesHoldSide;
  openDelegateCount: string;
  margin: string;
  available: string;
  locked: string;
  total: string;
  leverage: number;
  achievedProfits: string;
  averageOpenPrice: string;
  marginMode: FuturesMarginMode;
  holdMode: FuturesHoldMode;
  unrealizedPL: string;
  liquidationPrice: string;
  keepMarginRate: string;
  marketPrice: string;
  cTime: string;
}
