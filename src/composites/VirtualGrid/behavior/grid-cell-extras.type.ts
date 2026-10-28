/* @layer renderer-components @kind types */
import type { SelectionModel } from '../../selection';
import type { GridReorder } from './useGridReorder.type';

interface GridCellExtrasInput {
  key: string;
  item: number;
  select: SelectionModel;
  moving: GridReorder;
  selecting: boolean;
  hole: boolean;
}

export type { GridCellExtrasInput };
