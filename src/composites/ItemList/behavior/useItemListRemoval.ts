/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import { ROW_SELECTOR, UNDO_SELECTOR } from '../ItemList.constants';
import type { ItemListProps } from '../ItemList.type';
import { focusIfLost } from './focus-if-lost';
import { focusInRow } from './focus-in-row';
import { holdsFocus } from './holds-focus';
import type { ItemListDeleteFrom, ItemListDeletes, ItemListRemoval, ItemListRowOrder } from './item-list-deletes.type';
import { nearRow } from './near-row';
import { openConfirm } from './open-confirm';
import { withoutId } from './without-id';

const useItemListRemoval = <T,>(
  props: ItemListProps<T>,
  deletes: ItemListDeletes,
  rows: ItemListRowOrder,
  listRef: RefObject<HTMLElement | null>,
): ItemListRemoval => {
  const { onDelete, undoDelete, onSelect, onActivate } = props;
  const { order, rowIds } = rows;

  const remove = (id: string, from: ItemListDeleteFrom) => {
    if (undoDelete === undefined) {
      openConfirm(listRef.current, id);
      return;
    }
    const next = nearRow(order, withoutId(rowIds, id), id);
    deletes.start(id);
    if (from === 'button' || next === undefined) {
      focusInRow(listRef.current, id, UNDO_SELECTOR);
      return;
    }
    if (!onActivate) onSelect?.(next);
    focusInRow(listRef.current, next, ROW_SELECTOR);
  };

  const restore = (id: string) => {
    const focused = holdsFocus(listRef.current, id);
    deletes.restore(id);
    if (focused) focusInRow(listRef.current, id, ROW_SELECTOR);
  };

  const commit = (id: string) => {
    const focused = holdsFocus(listRef.current, id);
    const next = nearRow(order, rowIds, id);
    deletes.commit(id);
    if (focused && next !== undefined) focusInRow(listRef.current, next, ROW_SELECTOR);
  };

  const confirmed = (id: string) => {
    const next = nearRow(order, rowIds, id);
    onDelete?.(id);
    focusIfLost(listRef.current, next);
  };

  const kept = (id: string) => focusIfLost(listRef.current, id);

  return { remove: onDelete ? remove : undefined, restore, commit, confirmed, kept };
};

export { useItemListRemoval };
