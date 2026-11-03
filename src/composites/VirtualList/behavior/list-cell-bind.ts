/* @layer renderer-components @kind logic */
import { MARQUEE_KEY_ATTRIBUTE } from '../../marquee';
import { CELL_CLASS, INDEX_ATTRIBUTE, ITEM_CLASS } from '../VirtualList.constants';
import type { VirtualListCellBind } from '../VirtualList.type';
import type { ListCellBindInput } from './list-cell-bind.type';

const listCellBind = (input: ListCellBindInput): VirtualListCellBind => {
  const { index, count, itemKey, tabbable, selected, current, bare, extras, onActivate, onKeyDown } = input;
  const choosing = selected !== undefined;
  return {
    role: choosing ? 'option' : 'listitem',
    className: bare ? CELL_CLASS : ITEM_CLASS,
    tabIndex: tabbable ? 0 : -1,
    'aria-posinset': index + 1,
    'aria-setsize': count,
    'aria-selected': selected,
    'aria-current': current ? true : undefined,
    [INDEX_ATTRIBUTE]: index,
    [MARQUEE_KEY_ATTRIBUTE]: choosing ? itemKey : undefined,
    onFocus: () => onActivate(index),
    onKeyDown,
    ...extras,
  };
};

export { listCellBind };
