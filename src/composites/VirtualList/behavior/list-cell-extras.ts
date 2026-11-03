/* @layer renderer-components @kind logic */
import type { VirtualListCellBind } from '../VirtualList.type';
import type { ListCellExtrasInput } from './list-cell-extras.type';

const listCellExtras = (input: ListCellExtrasInput): Partial<VirtualListCellBind> => {
  const { key, index, select, moving, selecting } = input;
  const dragged = moving.extrasOf(index, key);
  if (!selecting) return dragged;
  return {
    ...dragged,
    onClick: (event) => {
      if (!moving.swallowClick()) select.click(key, event);
    },
    onMouseDown: (event) => {
      if (event.shiftKey) event.preventDefault();
    },
  };
};

export { listCellExtras };
