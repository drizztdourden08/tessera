/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualGridCellBind } from '../VirtualGrid.type';

interface GridCellProps {
  bind: VirtualGridCellBind;
  children: ReactNode;
}

export type { GridCellProps };
