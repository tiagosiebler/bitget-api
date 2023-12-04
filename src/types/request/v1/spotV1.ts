import { OrderTimeInForce } from '../shared';

export type WalletType = 'spot' | 'mix_usdt' | 'mix_usd';

export type SpotKlineInterval =
  | '1min' 
  | '5min' 
  | '15min' 
  | '30min' 
  | '1h' 
  | '4h' 
  | '6h' 
  | '12h' 
  | '1day' 
  | '3day' 
  | '1week' 
  | '1M' 
  | '6Hutc' 
  | '12Hutc' 
  | '1Dutc' 
  | '3Dutc' 
  | '1Wutc' 
  | '1Mutc';

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

export interface SpotCandleData {
  open: string;
  high: string;
  low: string;
  close: string;
  quoteVol: string;
  baseVol: string;
  usdtVol: string;
  ts: string;
}