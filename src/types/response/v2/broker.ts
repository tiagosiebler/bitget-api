/**
 *
 * * Broker | Subaccount
 *
 */

export interface CreateSubaccountResponseV2 {
  subUid: string;
  subaccountName: string;
  status: string;
  permList: string[];
  label: string;
  cTime: string;
}

export interface BrokerSubaccountV2 {
  subUid: string;
  subaccountName: string;
  status: string;
  permList: string[];
  label: string;
  language: string;
  cTime: string;
  uTime: string;
}

export interface ModifySubaccountResponseV2 {
  subUid: string;
  subaccountName: string;
  status: string;
  permList: string[];
  label: string;
  language: string;
  cTime: string;
  uTime: string;
}

export interface SubaccountEmailV2 {
  subUid: string;
  subaccountName: string;
  subaccountEmail: string;
  cTime: string;
  uTime: string;
}

export interface BrokerSubaccountSpotAssetV2 {
  coin: string;
  available: string;
  frozen: string;
  locked: string;
  uTime: string;
}

export interface BrokerSubaccountFutureAssetV2 {
  marginCoin: string;
  available: string;
  frozen: string;
  locked: string;
  crossedMaxAvailable: string;
  isolatedMaxAvailable: string;
  maxTransferOut: string;
  accountEquity: string;
  usdtEquity: string;
  btcEquity: string;
  uTime: string;
}

export interface CreateSubaccountDepositAddressV2 {
  subUid: string;
  coin: string;
  address: string;
  chain: string;
  tag: string;
  url: string;
  cTime: string;
}

export interface SubaccountDepositV2 {
  orderId: string;
  txId: string;
  coin: string;
  type: string;
  dest: string;
  amount: string;
  status: string;
  fromAddress: string;
  toAddress: string;
  fee: string;
  chain: string;
  confirm: string;
  tag: string;
  cTime: string;
  uTime: string;
}

export interface BrokerSubaccountWithdrawalV2 {
  orderId: string;
  txId: string;
  coin: string;
  type: string;
  dest: string;
  amount: string;
  status: string;
  fromAddress: string;
  toAddress: string;
  fee: string;
  chain: string;
  confirm: string;
  tag: string;
  userId: string;
  cTime: string;
  uTime: string;
}

/**
 *
 *  Broker | Api Key
 *
 */

export interface CreateSubaccountApiKeyResponseV2 {
  subUid: string;
  apiKey: string;
  secretKey: string;
  label: string;
  ipList: string[];
  permType: string;
  permList: string[];
}

export interface SubaccountApiKeyV2 {
  subUid: string;
  label: string;
  apiKey: string;
  secretKey: string;
  permType: string;
  permList: string[];
  ipList: string[];
}

export interface ModifySubaccountApiKeyResponseV2 {
  subUid: string;
  apiKey: string;
  label: string;
  ipList: string[];
  permType: string;
  permList: string[];
}

/**
 *
 * * Broker | All Sub-accounts Deposit and Withdrawal Records
 *
 */

export interface AllSubDepositWithdrawalRecordV2 {
  uid: string;
  txId: string;
  type: 'deposit' | 'withdrawal';
  subType: 'onchain' | 'internal' | 'fast';
  coin: string;
  amount: string;
  status: 'pending' | 'fail' | 'success';
  ts: string;
}

/**
 *
 * * Broker | Subaccounts
 *
 */

export interface BrokerSubaccountInfoV2 {
  uid: string;
  asset: string;
  firstTimeDeposit: string;
  firstTimeTrade: string;
  registerTime: string;
}

/**
 *
 * * Broker | Commissions
 *
 */

export interface BrokerCommissionV2 {
  uid: string;
  coin: string;
  symbol: string;
  dealtAmount: string;
  totalFee: string;
  deductedFee: string;
  paidFee: string;
  markUpFee: string;
  totalCommission: string;
}

/**
 *
 * * Broker | Trade Volume
 *
 */

export interface BrokerTradeVolumeV2 {
  uid: string;
  volume: string;
  spotVolume: string;
  futureVolume: string;
}
