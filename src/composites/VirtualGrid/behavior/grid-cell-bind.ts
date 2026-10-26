/* @layer renderer-components @kind logic */
import { MARQUEE_KEY_ATTRIBUTE } from '../../marquee';
import { BARE_CELL_CLASS, CELL_ATTRIBUTE, CELL_CLASS, KIND_ATTRIBUTE } from '../VirtualGrid.constants';
import type { VirtualGridCellBind } from '../VirtualGrid.type';
import type { GridCellBindInput } from './grid-cell-bind.type';

const gridCellBind = (input: GridCellBindInput): VirtualGridCellBind => {
  const { index, column, itemKey, tabbable, bare, onActivate, onNavigate } = input;
  return {
    role: 'gridcell',
    className: bare ? BARE_CELL_CLASS : CELL_CLASS,
    tabIndex: tabbable ? 0 : -1,
    'aria-colindex': column + 1,
    [CELL_ATTRIBUTE]: index,
    [KIND_ATTRIBUTE]: 'tile',
    [MARQUEE_KEY_ATTRIBUTE]: itemKey,
    onFocus: () => onActivate(index),
    onKeyDown: (event) => onNavigate(event, index),
  };
};

export { gridCellBind };
