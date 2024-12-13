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

export interface SubaccountsListV2 {
  hasNextPage: boolean;
  idLessThan: number;
  subList: {
    subUid: string;
    subaccountName: string;
    status: string;
    permList: string[];
    label: string;
    language: string;
    cTime: string;
    uTime: string;
  }[];
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

export interface SubaccountSpotAssetsV2 {
  assetsList: {
    coin: string;
    available: string;
    frozen: string;
    locked: string;
    uTime: string;
  }[];
}

export interface SubaccountFutureAssetsV2 {
  assetsList: {
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
  }[];
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

export interface SubaccountWithdrawalV2 {
  resultList: {
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
  }[];
  endId: string;
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
