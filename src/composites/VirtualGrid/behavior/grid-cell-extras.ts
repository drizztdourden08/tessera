/* @layer renderer-components @kind logic */
import type { VirtualGridCellBind } from '../VirtualGrid.type';
import type { GridCellExtrasInput } from './grid-cell-extras.type';

const gridCellExtras = (input: GridCellExtrasInput): Partial<VirtualGridCellBind> => {
  const { key, item, select, moving, selecting, hole } = input;
  if (hole) return {};
  const dragged = moving.extrasOf(item, key);
  if (!selecting) return dragged;
  return {
    ...dragged,
    'aria-selected': select.isSelected(key),
    onClick: (event) => {
      if (!moving.swallowClick()) select.click(key, event);
    },
    onMouseDown: (event) => {
      if (event.shiftKey) event.preventDefault();
    },
  };
};

export { gridCellExtras };
