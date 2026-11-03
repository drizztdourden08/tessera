/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualGridModel } from '../behavior/useVirtualGrid.type';
import type { VirtualGridCellBind, VirtualGridDensity, VirtualGridSection, VirtualGridTrailing } from '../VirtualGrid.type';

interface GridRowsProps<T> {
  model: VirtualGridModel<T>;
  sections?: readonly VirtualGridSection<T>[];
  getKey: (item: T, index: number) => string;
  renderItem?: (item: T, index: number) => ReactNode;
  renderTile?: (item: T, index: number, cell: VirtualGridCellBind) => ReactNode;
  trailing?: VirtualGridTrailing;
  density?: VirtualGridDensity;
}

export type { GridRowsProps };
