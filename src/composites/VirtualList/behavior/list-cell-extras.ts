/* @layer renderer-components @kind logic */
import { clickHandlers } from '../../virtual';
import type { VirtualListCellBind } from '../VirtualList.type';
import type { ListCellExtrasInput } from './list-cell-extras.type';

const listCellExtras = (input: ListCellExtrasInput): Partial<VirtualListCellBind> => {
  const { key, index, select, moving, selecting } = input;
  const dragged = moving.extrasOf(index, key);
  if (!selecting) return dragged;
  return {
    ...dragged,
    ...clickHandlers(select, key, moving.swallowClick),
  };
};

export { listCellExtras };
