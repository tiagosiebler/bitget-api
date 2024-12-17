/**
 *
 * * Spot | Market
 *
 */

export interface SpotCoinChainV2 {
  chain: string;
  needTag: boolean;
  withdrawable: boolean;
  rechargeable: boolean;
  withdrawFee: string;
  extraWithdrawFee: string;
  depositConfirm: string;
  withdrawConfirm: string;
  minDepositAmount: string;
  minWithdrawAmount: string;
  browserUrl: string;
  contractAddress: string;
  withdrawStep: string;
  withdrawMinScale: string;
  congestion: string;
}

export interface SpotCoinInfoV2 {
  coinId: string;
  coin: string;
  transfer: boolean;
  chains: SpotCoinChainV2[];
}

export interface SpotSymbolInfoV2 {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  minTradeAmount: string;
  maxTradeAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  pricePrecision: string;
  quantityPrecision: string;
  quotePrecision: string;
  minTradeUSDT: string;
  status: string;
  buyLimitPriceRatio: string;
  sellLimitPriceRatio: string;
  orderQuantity: string;
  areaSymbol: string;
}

export interface SpotVipFeeRateV2 {
  level: number;
  dealAmount: string;
  assetAmount: string;
  takerFeeRate: string;
  makerFeeRate: string;
  btcWithdrawAmount: string;
  usdtWithdrawAmount: string;
}

export interface SpotTickerV2 {
  symbol: string;
  high24h: string;
  open: string;
  low24h: string;
  lastPr: string;
  quoteVolume: string;
  baseVolume: string;
  usdtVolume: string;
  bidPr: string;
  askPr: string;
  bidSz: string;
  askSz: string;
  openUtc: string;
  ts: string;
  changeUtc24h: string;
  change24h: string;
}

export interface SpotMergeDepthV2 {
  asks: [string, string][];
  bids: [string, string][];
  ts: string;
  scale: string;
  precision: string;
  isMaxPrecision: string;
}

export interface SpotOrderBookDepthV2 {
  asks: [string, string][];
  bids: [string, string][];
  ts: string;
}

export type SpotCandlestickV2 = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface SpotTradeV2 {
  symbol: string;
  tradeId: string;
  side: string;
  price: string;
  size: string;
  ts: string;
}

/**
 *
 * * Spot | Trade
 *
 */

export interface CancelAndSubmitSpotOrderResponseV2 {
  orderId: string;
  clientOid: string | null;
  success: string;
  msg: string | null;
}

export interface SubmitSpotBatchOrdersResponseV2 {
  successList: {
    orderId: string;
    clientOid: string;
  }[];
  failureList: {
    orderId: string;
    clientOid: string;
    errorMsg: string;
    errorCode?: string;
  }[];
}

export interface SpotOrderInfoV2 {
  userId: string;
  symbol: string;
  orderId: string;
  clientOid: string;
  price: string;
  size: string;
  orderType: string;
  side: string;
  status: string;
  priceAvg: string;
  baseVolume: string;
  quoteVolume: string;
  enterPointSource: string;
  feeDetail: {
    BGB?: {
      deduction: boolean;
      feeCoinCode: string;
      totalDeductionFee: string;
      totalFee: string;
    };
    newFees?: {
      c: number;
      d: number;
      deduction: boolean;
      r: string;
      t: string;
      totalDeductionFee: number;
    };
  };
  orderSource: string;
  cancelReason: string;
  cTime: string;
  uTime: string;
}

export interface SpotOpenOrderV2 {
  userId: string;
  symbol: string;
  orderId: string;
  clientOid: string;
  priceAvg: string;
  size: string;
  orderType: string;
  side: string;
  status: string;
  basePrice: string;
  baseVolume: string;
  quoteVolume: string;
  enterPointSource: string;
  orderSource?: string;
  presetTakeProfitPrice: string;
  executeTakeProfitPrice: string;
  presetStopLossPrice: string;
  executeStopLossPrice: string;
  cTime: string;
  uTime?: string;
  tpslType: string;
  triggerPrice: string | null;
}

export interface SpotFillV2 {
  userId: string;
  symbol: string;
  orderId: string;
  tradeId: string;
  orderType: string;
  side: string;
  priceAvg: string;
  size: string;
  amount: string;
  feeDetail: {
    deduction: string;
    feeCoin: string;
    totalDeductionFee: string;
    totalFee: string;
  };
  tradeScope: string;
  cTime: string;
  uTime: string;
}

/**
 *
 * * Spot | Trigger Orders
 *
 */

export interface SpotCurrentPlanOrderV2 {
  orderId: string;
  clientOid: string;
  symbol: string;
  size: string;
  executePrice: string;
  triggerPrice: string;
  status: string;
  orderType: string;
  side: string;
  planType: string;
  triggerType: string;
  enterPointSource: string;
  uTime: string;
  cTime: string;
}

export interface SpotHistoryPlanOrderV2 {
  orderId: string;
  clientOid: string;
  symbol: string;
  size: string;
  executePrice: string;
  triggerPrice: string;
  status: string;
  orderType: string;
  side: string;
  planType: string;
  triggerType: string;
  enterPointSource: string;
  uTime: string;
  cTime: string;
}

export interface SpotPlanSubOrderV2 {
  orderId: string;
  price: string;
  type: string;
  status: string;
}

export interface SpotCancelPlanOrdersV2 {
  successList: {
    orderId: string;
    clientOid: string;
  }[];
  failureList: {
    orderId: string;
    clientOid: string;
    errorMsg: string;
  }[];
}

/**
 *
 * * Spot | Account
 *
 */

export interface SpotAccountInfoV2 {
  userId: string;
  inviterId: string;
  ips: string;
  authorities: string[];
  parentId: number;
  traderType: string;
  channelCode: string;
  channel: string;
  regisTime: string;
}

export interface SpotAccountAssetV2 {
  coin: string;
  available: string;
  frozen: string;
  locked: string;
  limitAvailable: string;
  uTime: string;
}

export interface SpotSubAccountAssetV2 {
  coin: string;
  available: string;
  limitAvailable: string;
  frozen: string;
  locked: string;
  uTime: string;
}
export interface SpotSubAccountAssetsV2 {
  userId: number;
  assetsList: SpotSubAccountAssetV2[];
}

export interface SpotAccountBillV2 {
  cTime: string;
  coin: string;
  groupType: string;
  businessType: string;
  size: string;
  balance: string;
  fees: string;
  billId: string;
}

export interface SpotMainSubTransferRecordV2 {
  coin: string;
  status: string;
  toType: string;
  fromType: string;
  size: string;
  ts: string;
  clientOid: string;
  transferId: string;
  fromUserId: string;
  toUserId: string;
}

export interface SpotTransferRecordV2 {
  coin: string;
  status: string;
  toType: string;
  toSymbol: string;
  fromType: string;
  fromSymbol: string;
  size: string;
  ts: string;
  clientOid: string;
  transferId: string;
}

export interface SpotDepositAddressV2 {
  address: string;
  chain: string;
  coin: string;
  tag: string;
  url: string;
}

export interface SpotSubAccountDepositRecordV2 {
  orderId: string;
  tradeId: string;
  coin: string;
  size: string;
  status: string;
  toAddress: string;
  dest: string;
  chain: string;
  fromAddress: string;
  clientOid?: string;
  confirm?: string;
  tag?: string;
  cTime: string;
  uTime: string;
}

export interface SpotWithdrawalRecordV2 {
  orderId: string;
  tradeId: string;
  coin: string;
  dest: string;
  clientOid: string;
  type: string;
  tag: string;
  size: string;
  fee: string;
  status: string;
  toAddress: string;
  fromAddress: string;
  confirm: string;
  chain: string;
  cTime: string;
  uTime: string;
}

export interface SpotDepositRecordV2 {
  orderId: string;
  tradeId: string;
  coin: string;
  type: string;
  size: string;
  status: string;
  toAddress: string;
  dest: string;
  chain: string;
  fromAddress: string;
  cTime: string;
  uTime: string;
}
