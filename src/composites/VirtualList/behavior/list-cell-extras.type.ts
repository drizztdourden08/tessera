/* @layer renderer-components @kind types */
import type { SelectionModel } from '../../selection';
import type { ListReorder } from './useListReorder.type';

interface ListCellExtrasInput {
  key: string;
  index: number;
  select: SelectionModel;
  moving: ListReorder;
  selecting: boolean;
}

export type { ListCellExtrasInput };
