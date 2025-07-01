export interface GetPublicFillsRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol?: string;
  limit?: string;
}

export interface GetCandlesRequestV3 {
  category: 'SPOT' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  interval:
    | '1m'
    | '3m'
    | '5m'
    | '15m'
    | '30m'
    | '1H'
    | '4H'
    | '6H'
    | '12H'
    | '1D';
  startTime?: string;
  endTime?: string;
  type?: 'MARKET' | 'MARK' | 'INDEX';
  limit?: string;
}

export interface GetHistoryCandlesRequestV3 {
  category: 'SPOT' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  interval:
    | '1m'
    | '3m'
    | '5m'
    | '15m'
    | '30m'
    | '1H'
    | '4H'
    | '6H'
    | '12H'
    | '1D';
  startTime?: string;
  endTime?: string;
  type?: 'MARKET' | 'MARK' | 'INDEX';
  limit?: string;
}

export interface GetContractsOiRequestV3 {
  symbol?: string;
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
}

export interface GetCurrentFundingRateRequestV3 {
  symbol: string;
}

export interface GetHistoryFundingRateRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  cursor?: string;
  limit?: string;
}

export interface GetMarginLoansRequestV3 {
  coin: string;
}

export interface GetOpenInterestRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
}

export interface GetPositionTierRequestV3 {
  category: 'MARGIN' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
  coin?: string;
}

export interface GetRiskReserveRequestV3 {
  category: 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
}

export interface GetInstrumentsRequestV3 {
  category:
    | 'SPOT'
    | 'MARGIN'
    | 'USDT-FUTURES'
    | 'COIN-FUTURES'
    | 'USDC-FUTURES';
  symbol?: string;
}

export interface GetOrderBookRequestV3 {
  category: 'SPOT' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol: string;
  limit?: string;
}

export interface GetTickersRequestV3 {
  category: 'SPOT' | 'USDT-FUTURES' | 'COIN-FUTURES' | 'USDC-FUTURES';
  symbol?: string;
}
