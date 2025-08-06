// Account Management Request Types

export interface SetLeverageRequestV3 {
  category: 'MARGIN' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
  leverage: string;
  coin?: string;
  posSide?: 'long' | 'short';
}

export interface GetConvertRecordsRequestV3 {
  fromCoin: string;
  toCoin: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}

export interface GetFinancialRecordsRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  coin?: string;
  type?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}

export interface RepayRequestV3 {
  repayableCoinList: string[];
  paymentCoinList: string[];
}

// Sub-account Management Request Types

export interface CreateSubAccountApiKeyRequestV3 {
  subUid: string;
  note: string;
  type: 'read_write' | 'read_only';
  passphrase: string;
  permissions: string[];
  ips: string[];
}

export interface DeleteSubAccountApiKeyRequestV3 {
  apiKey: string;
}

export interface GetSubAccountApiKeysRequestV3 {
  subUid: string;
  limit?: string;
  cursor?: string;
}

export interface UpdateSubAccountApiKeyRequestV3 {
  apiKey: string;
  passphrase: string;
  type?: 'read_write' | 'read_only';
  permissions?: string[];
  ips?: string[];
}

export interface CreateSubAccountRequestV3 {
  username: string;
  accountMode?: 'classic' | 'unified';
  note?: string;
}

export interface FreezeSubAccountRequestV3 {
  subUid: string;
  operation: 'freeze' | 'unfreeze';
}

export interface GetSubAccountListRequestV3 {
  limit?: string;
  cursor?: string;
}

// Transfer Request Types

export interface TransferRequestV3 {
  fromType:
    | 'spot'
    | 'p2p'
    | 'coin-futures'
    | 'usdt-futures'
    | 'usdc-futures'
    | 'crossed-margin'
    | 'isolated-margin'
    | 'uta';
  toType:
    | 'spot'
    | 'p2p'
    | 'coin-futures'
    | 'usdt-futures'
    | 'usdc-futures'
    | 'crossed-margin'
    | 'isolated-margin'
    | 'uta';
  amount: string;
  coin: string;
  symbol?: string;
}

export interface GetTransferableCoinsRequestV3 {
  fromType:
    | 'spot'
    | 'p2p'
    | 'coin-futures'
    | 'usdt-futures'
    | 'usdc-futures'
    | 'crossed-margin'
    | 'isolated-margin'
    | 'uta';
  toType:
    | 'spot'
    | 'p2p'
    | 'coin-futures'
    | 'usdt-futures'
    | 'usdc-futures'
    | 'crossed-margin'
    | 'isolated-margin'
    | 'uta';
}

export interface GetSubTransferRecordsRequestV3 {
  subUid?: string;
  role?: 'initiator' | 'receiver';
  coin?: string;
  startTime?: string;
  endTime?: string;
  clientOid?: string;
  limit?: string;
  cursor?: string;
}

export interface SubAccountTransferRequestV3 {
  fromType:
    | 'spot'
    | 'p2p'
    | 'usdt_futures'
    | 'coin_futures'
    | 'usdc_futures'
    | 'crossed_margin'
    | 'uta';
  toType:
    | 'spot'
    | 'p2p'
    | 'usdt_futures'
    | 'coin_futures'
    | 'usdc_futures'
    | 'crossed_margin'
    | 'uta';
  amount: string;
  coin: string;
  fromUserId: string;
  toUserId: string;
  clientOid: string;
}

export interface GetSubUnifiedAssetsRequestV3 {
  subUid?: string;
  cursor?: string;
  limit?: string;
}

export interface GetFeeRateRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol: string;
}

export interface GetFundingAssetsRequestV3 {
  coin?: string;
}

export interface SwitchDeductRequestV3 {
  deduct: 'on' | 'off';
}

// Deposit Request Types

export interface GetDepositAddressRequestV3 {
  coin: string;
  chain?: string;
  size?: string;
}

export interface GetSubDepositAddressRequestV3 {
  subUid: string;
  coin: string;
  chain?: string;
  size?: string;
}

export interface GetDepositRecordsRequestV3 {
  coin?: string;
  orderId?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  cursor?: string;
}

export interface GetSubDepositRecordsRequestV3 {
  coin?: string;
  subUid: string;
  startTime: string;
  endTime: string;
  limit?: string;
  cursor?: string;
}

// Withdraw Request Types

export interface WithdrawRequestV3 {
  coin: string;
  chain?: string;
  transferType: 'on_chain' | 'internal_transfer';
  address: string;
  innerToType?: 'uid' | 'email' | 'mobile';
  areaCode?: string;
  tag?: string;
  size: string;
  remark?: string;
  clientOid?: string;
  memberCode?: 'bithumb' | 'korbit' | 'coinone';
  identityType?: 'company' | 'user';
  companyName?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetWithdrawRecordsRequestV3 {
  coin?: string;
  orderId?: string;
  clientOid?: string;
  startTime: string;
  endTime: string;
  limit?: string;
  cursor?: string;
}

export interface SetDepositAccountRequestV3 {
  coin: string;
  accountType: 'funding' | 'unified' | 'otc';
}
