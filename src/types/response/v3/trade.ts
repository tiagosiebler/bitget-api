export interface BatchModifyOrderResponseV3 {
  orderId: string;
  clientOid: string;
}

export interface CancelAllOrdersResponseV3 {
  list: {
    orderId: string;
    clientOid: string;
    code: string;
    msg: string;
  }[];
}

export interface CancelBatchOrdersResponseV3 {
  orderId: string;
  clientOid: string;
  code?: string;
  msg?: string;
}

export interface CloseAllPositionsResponseV3 {
  list: {
    orderId: string;
    clientOid: string;
    code: string;
    msg: string;
  }[];
}

export interface CancelOrderResponseV3 {
  orderId: string;
  clientOid: string;
}

export interface GetMaxOpenAvailableResponseV3 {
  available: string;
  maxOpen: string;
  buyOpenCost: string;
  sellOpenCost: string;
  maxBuyOpen: string;
  maxSellOpen: string;
}

export interface FeeDetailV3 {
  feeCoin: string;
  fee: string;
}

export interface OrderInfoV3 {
  orderId: string;
  clientOid: string;
  category: string;
  symbol: string;
  orderType: string;
  side: string;
  price: string;
  qty: string;
  amount: string;
  cumExecQty: string;
  cumExecValue: string;
  avgPrice: string;
  timeInForce: string;
  orderStatus: string;
  posSide: string;
  holdMode: string;
  reduceOnly: string;
  feeDetail: FeeDetailV3[];
  cancelReason: string;
  execType: string;
  stpMode?: string;
  createdTime: string;
  updatedTime: string;
}

export interface FillV3 {
  execId: string;
  orderId: string;
  category: string;
  symbol: string;
  orderType: string;
  side: string;
  execPrice: string;
  execQty: string;
  execValue: string;
  tradeScope: string;
  feeDetail: FeeDetailV3[];
  execPnl?: string;
  tradeSide?: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetFillsResponseV3 {
  list: FillV3[];
  cursor: string;
}

export interface UnfilledOrderV3 {
  orderId: string;
  clientOid: string;
  category: string;
  symbol: string;
  orderType: string;
  side: string;
  price: string;
  qty: string;
  amount: string;
  cumExecQty: string;
  cumExecValue: string;
  avgPrice: string;
  timeInForce: string;
  orderStatus: string;
  posSide: string;
  holdMode: string;
  reduceOnly: string;
  feeDetail: FeeDetailV3[];
  stpMode?: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetUnfilledOrdersResponseV3 {
  list: UnfilledOrderV3[];
  cursor: string;
}

export interface HistoryOrderV3 {
  orderId: string;
  clientOid: string;
  category: string;
  symbol: string;
  orderType: string;
  side: string;
  price: string;
  qty: string;
  amount: string;
  cumExecQty: string;
  cumExecValue: string;
  avgPrice: string;
  timeInForce: string;
  orderStatus: string;
  posSide: string;
  holdMode: string;
  reduceOnly: string;
  feeDetail: FeeDetailV3[];
  cancelReason: string;
  execType: string;
  stpMode?: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetHistoryOrdersResponseV3 {
  list: HistoryOrderV3[];
  cursor: string;
}

export interface PositionHistoryV3 {
  positionId: string;
  category: string;
  symbol: string;
  marginCoin: string;
  holdMode: string;
  posSide: string;
  marginMode: string;
  openPriceAvg: string;
  closePriceAvg: string;
  openTotalPos: string;
  closeTotalPos: string;
  cumRealisedPnl: string;
  netProfit: string;
  totalFunding: string;
  openFeeTotal: string;
  closeFeeTotal: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetPositionHistoryResponseV3 {
  list: PositionHistoryV3[];
  cursor: string;
}

export interface CurrentPositionV3 {
  category: string;
  symbol: string;
  marginCoin: string;
  holdMode: string;
  posSide: string;
  marginMode: string;
  positionBalance: string;
  available: string;
  frozen: string;
  total: string;
  leverage: string;
  curRealisedPnl: string;
  avgPrice: string;
  positionStatus: string;
  unrealisedPnl: string;
  liquidationPrice: string;
  mmr: string;
  profitRate: string;
  markPrice: string;
  breakEvenPrice: string;
  totalFunding: string;
  openFeeTotal: string;
  closeFeeTotal: string;
  createdTime: string;
  updatedTime: string;
}

export interface GetCurrentPositionResponseV3 {
  list: CurrentPositionV3[];
}

export interface ModifyOrderResponseV3 {
  orderId: string;
  clientOid: string;
}

export interface PlaceBatchOrdersResponseV3 {
  orderId: string;
  clientOid: string;
  code?: string;
  msg?: string;
}

export interface PlaceOrderResponseV3 {
  orderId: string;
  clientOid: string;
}
