import {
  MarginType,
  WsAccountSnapshotUMCBL,
  WsBaseEvent,
  WSPositionSnapshotUMCBL,
  WsSnapshotAccountEvent,
  WsSnapshotChannelEvent,
  WsSnapshotPositionsEvent,
} from '../types';

/** TypeGuard: event has a string "action" property */
function isWsEvent(event: unknown): event is WsBaseEvent {
  return (
    typeof event === 'object' &&
    event &&
    typeof event['action'] === 'string' &&
    event['data']
  );
}

/** TypeGuard: event has "action === snapshot" */
function isWsSnapshotEvent(event: unknown): event is WsBaseEvent<'snapshot'> {
  return isWsEvent(event) && event.action === 'snapshot';
}

/** TypeGuard: event has a string channel name */
function isWsChannelEvent(event: WsBaseEvent): event is WsSnapshotChannelEvent {
  if (
    typeof event['arg'] === 'object' &&
    event.arg &&
    typeof event?.arg['channel'] === 'string'
  ) {
    return true;
  }
  return false;
}

/** TypeGuard: event is an account update (balance) */
export function isWsAccountSnapshotEvent(
  event: unknown,
): event is WsSnapshotAccountEvent {
  return (
    isWsSnapshotEvent(event) &&
    isWsChannelEvent(event) &&
    event.arg.channel === 'account' &&
    Array.isArray(event.data)
  );
}

/** TypeGuard: event is a positions update */
export function isWsPositionsSnapshotEvent(
  event: unknown,
): event is WsSnapshotPositionsEvent {
  return (
    isWsSnapshotEvent(event) &&
    isWsChannelEvent(event) &&
    event.arg.channel === 'positions' &&
    Array.isArray(event.data)
  );
}

/** TypeGuard: event is a UMCBL account update (balance) */
export function isWsFuturesAccountSnapshotEvent(
  event: unknown,
): event is WsAccountSnapshotUMCBL {
  return isWsAccountSnapshotEvent(event) && event.arg.instType === 'umcbl';
}

/** TypeGuard: event is a UMCBL positions update */
export function isWsFuturesPositionsSnapshotEvent(
  event: unknown,
): event is WSPositionSnapshotUMCBL {
  return isWsPositionsSnapshotEvent(event) && event.arg.instType === 'umcbl';
}

/**
 * Simple guard for non-TypeScript users, throw a runtime error if value doesn't match type
 */
export function assertMarginType(marginType: string): marginType is MarginType {
  if (marginType !== 'isolated' && marginType !== 'crossed') {
    throw new Error(`MarginType should be one of: crossed | isolated`);
  }
  return true;
}
