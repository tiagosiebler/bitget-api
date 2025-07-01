export interface BatchModifyOrderRequestV3 {
  orderId?: string;
  clientOid?: string;
  qty?: string;
  price?: string;
  autoCancel?: 'yes' | 'no';
}

export interface CancelAllOrdersRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol?: string;
}

export interface CancelBatchOrdersRequestV3 {
  orderId?: string;
  clientOid?: string;
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol: string;
}

export interface CloseAllPositionsRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
  posSide?: 'long' | 'short';
}

export interface CancelOrderRequestV3 {
  orderId?: string;
  clientOid?: string;
}

export interface GetMaxOpenAvailableRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol: string;
  orderType: 'limit' | 'market';
  side: 'buy' | 'sell';
  price?: string;
  size?: string;
}

export interface GetOrderInfoRequestV3 {
  orderId?: string;
  clientOid?: string;
}

export interface GetFillsRequestV3 {
  orderId?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}

export interface GetUnfilledOrdersRequestV3 {
  category?:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}

export interface GetHistoryOrdersRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}

export interface GetPositionHistoryRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
  startTime?: string;
  endTime?: string;
  limit?: string;
  cursor?: string;
}

export interface GetCurrentPositionRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
  posSide?: 'long' | 'short';
}

export interface ModifyOrderRequestV3 {
  orderId?: string;
  clientOid?: string;
  qty?: string;
  price?: string;
  autoCancel?: 'yes' | 'no';
}

export interface PlaceBatchOrdersRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol: string;
  qty: string;
  price?: string;
  side: 'buy' | 'sell';
  orderType: 'limit' | 'market';
  timeInForce?: 'ioc' | 'fok' | 'gtc' | 'post_only';
  posSide?: 'long' | 'short';
  clientOid?: string;
  reduceOnly?: 'yes' | 'no';
}

export interface PlaceOrderRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol: string;
  qty: string;
  price?: string;
  side: 'buy' | 'sell';
  orderType: 'limit' | 'market';
  timeInForce?: 'ioc' | 'fok' | 'gtc' | 'post_only';
  posSide?: 'long' | 'short';
  clientOid?: string;
  reduceOnly?: 'yes' | 'no';
  stpMode?: 'none' | 'cancel_taker' | 'cancel_maker' | 'cancel_both';
}
