/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { StatusKey } from '../../../src/primitives';
import type { CONNECTION_PHASES } from './connection-samples.constants';

type ConnectionPhase = StatusKey<typeof CONNECTION_PHASES>;

interface ConnectionRetry {
  waitMs?: number;
  attempt?: number;
  attempts?: number;
}

interface ConnectionRow {
  phase: ConnectionPhase;
  detail?: string;
  retry?: ConnectionRetry;
  auth?: boolean;
}

interface ConnectionCardProps {
  phase: ConnectionPhase;
  detail?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

export type { ConnectionCardProps, ConnectionPhase, ConnectionRetry, ConnectionRow };
