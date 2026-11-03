/* @layer renderer-components @kind types */
import type { LayoutRow } from '../behavior/grid-layout.type';
import type { GridRowsProps } from './GridRows.type';

interface GridTilesProps<T> extends Omit<GridRowsProps<T>, 'sections'> {
  row: LayoutRow;
}

export type { GridTilesProps };
