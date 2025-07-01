// Account Management Response Types
export interface AccountSymbolConfigV3 {
  category: string;
  symbol: string;
  marginMode: string;
  leverage: string;
}

export interface AccountCoinConfigV3 {
  coin: string;
  leverage: string;
}

export interface AccountSettingsV3 {
  assetMode: string;
  holdMode: string;
  symbolConfigList: AccountSymbolConfigV3[];
  coinConfigList: AccountCoinConfigV3[];
}

export interface AccountAssetV3 {
  coin: string;
  equity: string;
  usdValue: string;
  balance: string;
  available: string;
  debt: string;
  locked: string;
}

export interface AccountAssetsV3 {
  accountEquity: string;
  usdtEquity: string;
  btcEquity: string;
  unrealisedPnl: string;
  usdtUnrealisedPnl: string;
  btcUnrealizedPnl: string;
  effEquity: string;
  mmr: string;
  imr: string;
  mgnRatio: string;
  positionMgnRatio: string;
  assets: AccountAssetV3[];
}

export interface ConvertRecordV3 {
  fromCoin: string;
  fromCoinSize: string;
  toCoin: string;
  toCoinSize: string;
  price: string;
  ts: string;
}

export interface ConvertRecordsResponseV3 {
  list: ConvertRecordV3[];
  cursor: string;
}

export interface FinancialRecordV3 {
  category: string;
  id: string;
  symbol: string;
  coin: string;
  type: string;
  amount: string;
  fee: string;
  balance: string;
  ts: string;
}

export interface FinancialRecordsResponseV3 {
  list: FinancialRecordV3[];
  cursor: string;
}

export interface PaymentCoinV3 {
  coin: string;
  size: string;
  amount: string;
}
export interface PaymentCoinsResponseV3 {
  paymentCoinList: PaymentCoinV3[];
  maxSelection: string;
}

export interface RepayableCoinV3 {
  coin: string;
  size: string;
  amount: string;
}

export interface RepayableCoinsResponseV3 {
  repayableCoinList: RepayableCoinV3[];
  maxSelection: string;
}

export interface RepayResponseV3 {
  result: string;
  repayAmount: string;
}

// Sub-account Management Response Types

export interface CreateSubAccountApiKeyResponseV3 {
  note: string;
  apiKey: string;
  secret: string;
  type: string;
  permissions: string[];
  ips: string[];
}
export interface SubAccountApiKeyV3 {
  apiKey: string;
  note: string;
  type: string;
  permissions: string[];
  ips: string[];
  ts?: string;
}

export interface GetSubAccountApiKeysResponseV3 {
  items: SubAccountApiKeyV3[];
  hasNext: boolean;
  cursor: string;
}

export interface UpdateSubAccountApiKeyResponseV3 {
  note: string;
  apiKey: string;
  type: string;
  permissions: string[];
  ips: string[];
}

export interface CreateSubAccountResponseV3 {
  username: string;
  subUid: string;
  status: string;
  note: string;
  createdTime: string;
  updatedTime: string;
}

export interface SubAccountV3 {
  subUid: string;
  username: string;
  status: string;
  accountMode: string;
  type: string;
  note: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetSubAccountListResponseV3 {
  list: SubAccountV3[];
  hasNext: boolean;
  cursor: string;
}

// Transfer Response Types

export interface TransferResponseV3 {
  transferId: string;
}

export interface SubTransferRecordV3 {
  transferId: string;
  fromType: string;
  toType: string;
  amount: string;
  coin: string;
  fromUserId: string;
  toUserId: string;
  status: string;
  clientOid: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetSubTransferRecordsResponseV3 {
  items: SubTransferRecordV3[];
  cursor: string;
}

export interface SubAccountTransferResponseV3 {
  transferId: string;
  clientOid: string;
}
