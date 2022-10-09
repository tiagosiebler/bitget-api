import { numberInString, OrderSide } from '../shared';

export type OrderTypeSpot = 'LIMIT' | 'MARKET' | 'LIMIT_MAKER';
export type OrderTimeInForce = 'GTC' | 'FOK' | 'IOC';

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
  side: string;
  orderType: string;
  force: string;
  price?: string;
  quantity: string;
  clientOrderId?: string;
}

export type NewBatchSpotOrder = Omit<NewSpotOrder, 'symbol'>;
