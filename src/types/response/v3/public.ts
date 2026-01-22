export interface PublicFillV3 {
  execId: string;
  price: string;
  size: string;
  side: 'sell' | 'buy';
  ts: string;
}

export interface CandlestickV3 extends Array<string> {
  0: string; // timestamp
  1: string; // open price
  2: string; // high price
  3: string; // low price
  4: string; // close price
  5: string; // volume
  6: string; // turnover
}

export interface ContractOiV3 {
  symbol: string;
  notionalValue: string;
  totalNotionalValue: string;
}

export interface CurrentFundingRateV3 {
  symbol: string;
  fundingRate: string;
  fundingRateInterval: string;
  nextUpdate: string;
  minFundingRate: string;
  maxFundingRate: string;
}

export interface DiscountRateTierV3 {
  tierStartValue: string;
  discountRate: string;
}

export interface DiscountRateV3 {
  coin: string;
  list: DiscountRateTierV3[];
}

export interface HistoryFundingRateV3 {
  symbol: string;
  fundingRate: string;
  fundingRateTimestamp: string;
}

export interface MarginLoanV3 {
  dailyInterest: string;
  annualInterest: string;
  limit: string;
}

export interface OpenInterestItemV3 {
  symbol: string;
  openInterest: string;
}

export interface OpenInterestV3 {
  list: OpenInterestItemV3[];
  ts: string;
}

export interface PositionTierV3 {
  tier: string;
  minTierValue: string;
  maxTierValue: string;
  leverage: string;
  mmr: string;
}

export interface RiskReserveRecordV3 {
  balance: string;
  amount: string;
  ts: string;
}

export interface RiskReserveV3 {
  coin: string;
  riskReserveRecords: RiskReserveRecordV3[];
}

export interface InstrumentV3 {
  symbol: string;
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  baseCoin: string;
  quoteCoin: string;
  buyLimitPriceRatio: string;
  sellLimitPriceRatio: string;
  feeRateUpRatio: string;
  minOrderQty: string;
  maxOrderQty: string;
  maxMarketOrderQty: string;
  pricePrecision: string;
  quantityPrecision: string;
  quotePrecision: string;
  minOrderAmount: string;
  maxSymbolOrderNum: string;
  maxProductOrderNum: string;
  status:
    | 'listed'
    | 'online'
    | 'limit_open'
    | 'limit_close'
    | 'offline'
    | 'restrictedAPI';
  offTime: string;
  limitOpenTime: string;
  maintainTime: string;
  areaSymbol?: string;

  // Futures specific fields
  makerFeeRate?: string;
  takerFeeRate?: string;
  openCostUpRatio?: string;
  priceMultiplier?: string;
  quantityMultiplier?: string;
  symbolType?: 'perpetual' | 'delivery';
  maxPositionNum?: string;
  deliveryTime?: string;
  deliveryStartTime?: string;
  deliveryPeriod?: string;
  launchTime?: string;
  fundInterval?: string;
  minLeverage?: string;
  maxLeverage?: string;

  // Margin specific fields
  isIsolatedBaseBorrowable?: 'YES' | 'NO';
  isIsolatedQuotedBorrowable?: 'YES' | 'NO';
  warningRiskRatio?: string;
  liquidationRiskRatio?: string;
  maxCrossedLeverage?: string;
  maxIsolatedLeverage?: string;
  userMinBorrow?: string;
}

export interface OrderBookV3 {
  a: string[][]; // asks - [price, size]
  b: string[][]; // bids - [price, size]
  ts: string;
}

export interface TickerV3 {
  category: 'SPOT' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  lastPrice: string;
  openPrice24h: string;
  highPrice24h: string;
  lowPrice24h: string;
  ask1Price: string;
  bid1Price: string;
  bid1Size: string;
  ask1Size: string;
  price24hPcnt: string;
  volume24h: string;
  turnover24h: string;

  // Futures specific fields
  indexPrice?: string;
  markPrice?: string;
  fundingRate?: string;
  openInterest?: string;
  deliveryStartTime?: string;
  deliveryTime?: string;
  deliveryStatus?: string;
}

export interface ProofOfReservesV3 {
  merkleRootHash: string;
  totalReserveRatio: string;
  list: {
    coin: string;
    userAssets: string;
    platformAssets: string;
    reserveRatio: string;
  }[];
}

export interface IndexComponentV3 {
  exchange: string;
  spotPair: string;
  equivalentPrice: string;
  weight: string;
}

export interface IndexPriceComponentsV3 {
  symbol: string;
  componentList: IndexComponentV3[];
}
