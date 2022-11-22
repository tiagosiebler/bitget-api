export interface WsBaseEvent<TAction = 'snapshot' | string, TData = unknown> {
  action: TAction;
  arg: unknown;
  data: TData[];
}

export interface WsSnapshotChannelEvent extends WsBaseEvent<'snapshot'> {
  arg: {
    instType: string;
    channel: string;
    instId: string;
  };
}

export interface WsSnapshotAccountEvent extends WsBaseEvent<'snapshot'> {
  arg: {
    instType: string;
    channel: 'account';
    instId: string;
  };
}

export interface WsSnapshotPositionsEvent extends WsBaseEvent<'snapshot'> {
  arg: {
    instType: string;
    channel: 'positions';
    instId: string;
  };
}

export interface WsAccountSnapshotUMCBL extends WsBaseEvent<'snapshot'> {
  arg: {
    instType: 'umcbl';
    channel: 'account';
    instId: string;
  };
  data: WsAccountSnapshotDataUMCBL[];
}

export interface WsAccountSnapshotDataUMCBL {
  marginCoin: string;
  locked: string;
  available: string;
  maxOpenPosAvailable: string;
  maxTransferOut: string;
  equity: string;
  usdtEquity: string;
}

export interface WSPositionSnapshotUMCBL extends WsBaseEvent<'snapshot'> {
  arg: {
    instType: 'umcbl';
    channel: 'positions';
    instId: string;
  };
  data: WsPositionSnapshotDataUMCBL[];
}

export interface WsPositionSnapshotDataUMCBL {
  posId: string;
  instId: string;
  instName: string;
  marginCoin: string;
  margin: string;
  marginMode: string;
  holdSide: string;
  holdMode: string;
  total: string;
  available: string;
  locked: string;
  averageOpenPrice: string;
  leverage: number;
  achievedProfits: string;
  upl: string;
  uplRate: string;
  liqPx: string;
  keepMarginRate: string;
  marginRate: string;
  cTime: string;
  uTime: string;
  markPrice: string;
}
