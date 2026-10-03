/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { LocationRow } from './data-locations';

type EngineColumn = {
  path: string;
  label: string;
  track?: string;
  align?: 'start' | 'end';
  render?: (row: LocationRow) => ReactNode;
};

export type { EngineColumn };
