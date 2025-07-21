export interface WSAPIPlaceOrderRequestV3 {
  symbol: string;
  orderType: 'limit' | 'market';
  qty: string;
  price?: string;
  side: 'buy' | 'sell';
  posSide?: 'long' | 'short';
  timeInForce?: 'gtc' | 'ioc' | 'fok' | 'post_only';
  reduceOnly?: 'YES' | 'NO'; // Note: reduceOnly is not supported for batch place WS API. Might be supported starting late Q4 2025, but not supported yet.
  clientOid?: string;
  stpMode?: 'none' | 'cancel_taker' | 'cancel_maker' | 'cancel_both';
  tpTriggerBy?: 'market' | 'mark';
  slTriggerBy?: 'market' | 'mark';
  takeProfit?: string;
  stopLoss?: string;
  tpOrderType?: 'limit' | 'market';
  slOrderType?: 'limit' | 'market';
  tpLimitPrice?: string;
  slLimitPrice?: string;
}
