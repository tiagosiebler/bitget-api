/**
 *
 * * Common | Notice
 *
 */

export interface AnnouncementV2 {
  annId: string;
  annTitle: string;
  annDesc: string;
  cTime: string;
  language: string;
  annUrl: string;
}

/**
 *
 * * Common | Public
 *
 */

/**
 *
 * * Common | Tax
 *
 */

export interface SpotTransactionRecordV2 {
  id: string;
  coin: string;
  spotTaxType: string;
  amount: string;
  fee: string;
  balance: string;
  ts: string;
}

export interface FuturesTransactionRecordV2 {
  id: string;
  symbol: string;
  marginCoin: string;
  futureTaxType: string;
  amount: string;
  fee: string;
  ts: string;
}

export interface MarginTransactionRecordV2 {
  id: string;
  coin: string;
  marginTaxType: string;
  amount: string;
  fee: string;
  total: string;
  symbol: string;
  ts: string;
}

export interface P2PMerchantOrdersV2 {
  id: string;
  coin: string;
  p2pTaxType: string;
  total: string;
  ts: string;
}

/**
 *
 * * Common | P2P
 *
 */

export interface P2PMerchantV2 {
  registerTime: string;
  nickName: string;
  isOnline: string;
  avgPaymentTime: string;
  avgReleaseTime: string;
  totalTrades: string;
  totalBuy: string;
  totalSell: string;
  totalCompletionRate: string;
  trades30d: string;
  sell30d: string;
  buy30d: string;
  completionRate30d: string;
}

export interface P2PMerchantInfoV2 {
  registerTime: string;
  nickName: string;
  merchantId: string;
  avgPaymentTime: string;
  avgReleaseTime: string;
  totalTrades: string;
  totalBuy: string;
  totalSell: string;
  totalCompletionRate: string;
  trades30d: string;
  sell30d: string;
  buy30d: string;
  completionRate30d: string;
  kycStatus: boolean;
  emailBindStatus: boolean;
  mobileBindStatus: boolean;
  email: string;
  mobile: string;
}

export interface P2PMerchantOrderV2 {
  orderId: string;
  orderNo: string;
  advNo: string;
  side: string;
  count: string;
  coin: string;
  price: string;
  fiat: string;
  withdrawTime: string;
  representTime: string;
  releaseTime: string;
  paymentTime: string;
  amount: string;
  status: string;
  buyerRealName: string;
  sellerRealName: string;
  ctime: string;
  utime: string;
  paymentInfo: {
    paymethodName: string;
    paymethodId: string;
    paymethodInfo: {
      name: string;
      required: string;
      type: string;
      value: string;
    }[];
  };
}

export interface P2PMerchantAdvertismentV2 {
  advId: string;
  advNo: string;
  side: string;
  advSize: string;
  size: string;
  coin: string;
  price: string;
  coinPrecision: string;
  fiat: string;
  fiatPrecision: string;
  fiatSymbol: string;
  status: string;
  hide: string;
  maxTradeAmount: string;
  minTradeAmount: string;
  payDuration: string;
  turnoverNum: string;
  turnoverRate: string;
  label: string | null;
  userLimitList: {
    minCompleteNum: string;
    maxCompleteNum: string;
    placeOrderNum: string;
    allowMerchantPlace: string;
    completeRate30d: string;
    country: string;
  };
  paymentMethodList: {
    paymentMethod: string;
    paymentId: string;
    paymentInfo: {
      name: string;
      required: boolean;
      type: string;
    }[];
  }[];
  merchantCertifiedList: {
    imageUrl: string;
    desc: string;
  }[];
  utime: string;
  ctime: string;
}

/**
 *
 * * Common | Trading insights
 *
 */

export interface SpotWhaleNetFlowV2 {
  volume: string;
  date: string;
}

export interface FuturesActiveBuySellVolumeV2 {
  buyVolume: string;
  sellVolume: string;
  ts: string;
}

export interface FuturesActiveLongShortPositionV2 {
  longPositionRatio: string;
  shortPositionRatio: string;
  longShortPositionRatio: string;
  ts: string;
}

export interface LeveragedLongShortRatioV2 {
  ts: string;
  longShortRatio: string;
}

export interface MarginLoanGrowthRateV2 {
  ts: string;
  growthRate: string;
}

export interface IsolatedMarginBorrowingRatioV2 {
  ts: string;
  borrowRate: string;
}

export interface FuturesLongShortRatioV2 {
  longRatio: string;
  shortRatio: string;
  longShortRatio: string;
  ts: string;
}

export interface SpotFundFlowV2 {
  whaleBuyVolume: string;
  dolphinBuyVolume: string;
  fishBuyVolume: string;
  whaleSellVolume: string;
  dolphinSellVolume: string;
  fishSellVolume: string;
  whaleBuyRatio: string;
  dolphinBuyRatio: string;
  fishBuyRatio: string;
  whaleSellRatio: string;
  dolphinSellRatio: string;
  fishSellRatio: string;
}

export interface FuturesActiveLongShortAccountV2 {
  longAccountRatio: string;
  shortAccountRatio: string;
  longShortAccountRatio: string;
  ts: string;
}

/**
 *
 * * Common | Virtual Subaccount
 *
 */

export interface CreateVirtualSubAccountV2 {
  failureList: {
    subaAccountName: string;
  }[];
  successList: {
    subaAccountUid: string;
    subaAccountName: string;
    status: string;
    label: string;
    permList: string[];
    cTime: string;
    uTime: string;
  }[];
}

export interface CreateVirtualSubAccountAndApiKeyV2 {
  subAccountUid: string;
  subAccountName: string;
  label: string;
  subAccountApiKey: string;
  secretKey: string;
  permList: string[];
  ipList: string[];
}

export interface VirtualSubAccountV2 {
  subAccountUid: string;
  subAccountName: string;
  status: string;
  permList: string[];
  label: string;
  accountType: string;
  bindingTime: string;
  cTime: string;
  uTime: string;
}

export interface CreateVirtualSubAccountApiKeyV2 {
  subAccountUid: string;
  label: string;
  subAccountApiKey: string;
  secretKey: string;
  permList: string[];
  ipList: string[];
}

export interface ModifyVirtualSubAccountApiKeyV2 {
  subAccountUid: string;
  label: string;
  subAccountApiKey: string;
  secretKey: string;
  permList: string[];
  ipList: string[];
}

export interface SubAccountApiKeyItemV2 {
  subAccountUid: string;
  label: string;
  subAccountApiKey: string;
  permList: string[];
  ipList: string[];
}

/**
 *
 * * Common | Assets
 *
 */

export interface FundingAssetV2 {
  coin: string;
  available: string;
  frozen: string;
  usdtValue: string;
}

export interface BotAssetV2 {
  coin: string;
  available: string;
  equity: string;
  bonus: string;
  frozen: string;
  usdtValue: string;
}

/**
 *
 * * Common | Convert
 *
 */

export interface ConvertCurrencyV2 {
  coin: string;
  available: string;
  maxAmount: string;
  minAmount: string;
}

export interface ConvertQuotedPriceV2 {
  fee: string;
  fromCoinSize: string;
  fromCoin: string;
  cnvtPrice: string;
  toCoinSize: string;
  toCoin: string;
  traceId: string;
}

export interface ConvertTradeResponseV2 {
  ts: string;
  cnvtPrice: string;
  toCoinSize: string;
  toCoin: string;
}

export interface ConvertRecordV2 {
  id: string;
  ts: string;
  cnvtPrice: string;
  fee: string;
  fromCoinSize: string;
  fromCoin: string;
  toCoinSize: string;
  toCoin: string;
}

/**
 *
 * * Common | BGB Convert
 *
 */

export interface BGBConvertCoinV2 {
  coin: string;
  available: string;
  bgbEstAmount: string;
  precision: string;
  feeDetail: {
    feeRate: string;
    fee: string;
  }[];
  cTime: string;
}

export interface ConvertBGBResponseV2 {
  orderList: {
    coin: string;
    orderId: string;
  }[];
}

export interface BGBConvertHistoryV2 {
  orderId: string;
  fromCoin: string;
  fromAmount: string;
  fromCoinPrice: string;
  toCoin: string;
  toAmount: string;
  toCoinPrice: string;
  feeDetail: {
    feeCoin: string;
    fee: string;
  }[];
  status: string;
  ctime: string;
}
