/* @layer renderer-components @kind logic */
import { clickHandlers } from '../../virtual';
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
    ...clickHandlers(select, key, moving.swallowClick),
  };
};

export { gridCellExtras };
