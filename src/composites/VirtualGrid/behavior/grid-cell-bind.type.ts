/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { VirtualGridCellBind } from '../VirtualGrid.type';

interface GridCellBindInput {
  index: number;
  column: number;
  itemKey: string;
  tabbable: boolean;
  bare: boolean;
  extras?: Partial<VirtualGridCellBind>;
  onActivate: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { GridCellBindInput };
