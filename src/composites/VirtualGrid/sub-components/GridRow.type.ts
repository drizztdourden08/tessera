/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { LayoutRow } from '../behavior/grid-layout.type';

interface GridRowProps {
  at: number;
  row: LayoutRow;
  top?: number;
  children: ReactNode;
}

export type { GridRowProps };
