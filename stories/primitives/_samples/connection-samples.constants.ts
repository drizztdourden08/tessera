/* @layer stories @kind data */
import { defineStatuses } from '../../../src/primitives';
import type { ConnectionPhase, ConnectionRow } from './ConnectionCard.type';

const CONNECTION_PHASES = defineStatuses({
  idle: { label: 'Not connected', tone: 'neutral' },
  connecting: { label: 'Connecting to the room', tone: 'info', pulse: true },
  live: { label: 'Live, watching as Ana', tone: 'success' },
  reconnecting: { label: 'Reconnecting', tone: 'warning', pulse: true },
  closed: { label: 'The room closed the connection', tone: 'neutral' },
  failed: { label: 'Live view failed', tone: 'danger' },
  auth: { label: 'This room has a password', tone: 'warning' },
});

const RETRY_WAIT_MS = 4000;

const TRY_MS = 1200;

const MAX_TRIES = 3;

const CONNECTION_ROWS: readonly ConnectionRow[] = [
  { phase: 'idle', detail: 'Live data shows while the room is hosting.' },
  { phase: 'connecting', detail: 'ws://localhost:38281' },
  { phase: 'live', detail: 'for 42 min' },
  { phase: 'reconnecting', detail: 'Lost the room 4 s ago', retry: { waitMs: 12000, attempt: 2, attempts: 5 } },
  { phase: 'closed', retry: {} },
  { phase: 'failed', detail: 'connect ECONNREFUSED 127.0.0.1:38281', retry: {} },
  { phase: 'auth', detail: 'Enter it to watch. It is not stored.', auth: true },
];

const RECONNECT_DETAIL: Partial<Record<ConnectionPhase, string>> = {
  connecting: 'ws://localhost:38281',
  reconnecting: 'Lost the room',
  failed: 'connect ECONNREFUSED 127.0.0.1:38281',
};

export { CONNECTION_PHASES, CONNECTION_ROWS, MAX_TRIES, RECONNECT_DETAIL, RETRY_WAIT_MS, TRY_MS };
