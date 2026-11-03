/* @layer renderer-components @kind types */
import type { VirtualGridCellBind, VirtualGridTrailing } from '../VirtualGrid.type';

interface GridTrailingProps {
  trailing?: VirtualGridTrailing;
  bind: VirtualGridCellBind;
}

export type { GridTrailingProps };
