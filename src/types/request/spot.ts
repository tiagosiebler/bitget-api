import { OrderTimeInForce } from './shared';

export interface GetHistoricTradesParams {
  symbol: string;
  limit?: string;
  tradeId?: string;
  startTime?: string;
  endTime?: string;
}

export type WalletType = 'spot' | 'mix_usdt' | 'mix_usd';

export interface NewWalletTransfer {
  fromType: WalletType;
  toType: WalletType;
  amount: string;
  coin: string;
  clientOid?: string;
}

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

export interface CancelSpotOrderV2 {
  symbol: string;
  orderId?: string;
  clientOid?: string;
}

export interface BatchCancelSpotOrderV2 {
  symbol: string;
  orderIds?: string[];
  clientOids?: string[];
}

export interface NewSpotPlanOrder {
  symbol: string;
  side: 'buy' | 'sell';
  triggerPrice: number;
  executePrice?: number;
  size: number;
  triggerType: 'fill_price' | 'market_price';
  orderType: 'limit' | 'market';
  clientOid?: string;
  timeInForceValue?: string;
}

export interface NewSpotPlanOrder {
  symbol: string;
  side: 'buy' | 'sell';
  triggerPrice: number;
  executePrice?: number;
  size: number;
  triggerType: 'fill_price' | 'market_price';
  orderType: 'limit' | 'market';
  clientOid?: string;
  timeInForceValue?: string;
}

export interface ModifySpotPlanOrder {
  orderId?: string;
  clientOid?: string;
  triggerPrice: number;
  executePrice?: number;
  size?: string;
  orderType: 'limit' | 'market';
}

export interface CancelSpotPlanOrderParams {
  orderId?: string;
  clientOid?: string;
}

export interface GetSpotPlanOrdersParams {
  symbol: string;
  pageSize: string;
  lastEndId?: string;
}

export interface GetHistoricPlanOrdersParams {
  symbol: string;
  pageSize: string;
  lastEndId?: string;
  startTime: string;
  endTime: string;
}
