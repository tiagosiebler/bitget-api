import { OrderTimeInForce } from './shared';

export type WalletType = 'spot' | 'mix_usdt' | 'mix_usd';

export interface NewWalletTransfer {
  fromType: WalletType;
  toType: WalletType;
  amount: string;
  coin: string;
  clientOid?: string;
}

export interface NewSpotOrder {
  symbol: string;
  side: 'buy' | 'sell';
  orderType: 'limit' | 'market';
  force: OrderTimeInForce;
  price?: string;
  quantity: string;
  clientOrderId?: string;
}

export type NewBatchSpotOrder = Omit<NewSpotOrder, 'symbol'>;

export interface NewSpotSubTransfer {
  fromType: WalletType;
  toType: WalletType;
  amount: string;
  coin: string;
  clientOid: string;
  fromUserId: string;
  toUserId: string;
}

export interface NewSpotWithdraw {
  coin: string;
  address: string;
  chain: string;
  tag?: string;
  amount: string;
  remark?: string;
  clientOid?: string;
}
