/* @layer renderer-components @kind hook */
import { useState, useRef } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import type { ItemListProps, ItemListView } from '../ItemList.type';
import { focusRow } from './focus-row';
import { isTextEntry } from './is-text-entry';
import { isUndoKey } from './is-undo-key';
import { listKey } from './list-key';
import { rowButtons } from './row-buttons';
import { tabRow } from './tab-row';
import { useItemListDeletes } from './useItemListDeletes';
import { useItemListRemoval } from './useItemListRemoval';
import { useItemListRows } from './useItemListRows';

const useItemList = <T,>(props: ItemListProps<T>): ItemListView<T> => {
  const { selectedId = null, onSelect, onActivate, onRename, deleteKey = false } = props;
  const [query, setQuery] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);
  const deletes = useItemListDeletes(props);
  const rows = useItemListRows(props, query, deletes, renamingId);
  const { order, rowIds } = rows;
  const removal = useItemListRemoval(props, deletes, rows, listRef);
  const tabId = tabRow(rowIds, focusedId, selectedId);
  const { remove } = removal;

  const endRename = (id: string, name: string | null) => {
    setRenamingId(null);
    if (name !== null) onRename?.(id, name);
    focusRow(listRef.current, order.filter((other) => !deletes.pending.includes(other)).indexOf(id));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isUndoKey(event) && !isTextEntry(event.target) && removal.restoreLatest()) {
      event.preventDefault();
      return;
    }
    listKey({
      event, buttons: rowButtons(listRef.current), rowIds, rename: onRename && setRenamingId,
      remove: deleteKey && remove ? (id) => remove(id, 'key') : undefined, onSelect, onActivate,
    });
  };

  const onFocus = (event: FocusEvent<HTMLElement>) => {
    const id = rowIds[rowButtons(listRef.current).findIndex((button) => button === event.target)];
    if (id !== undefined) setFocusedId(id);
  };

  return {
    ...rows, query, setQuery, pending: deletes.pending, hoverId: deletes.hoverId, removal, onMouseOver: deletes.onMouseOver,
    onMouseLeave: deletes.onMouseLeave, renamingId, tabId, startRename: setRenamingId, endRename, listRef, onKeyDown, onFocus,
  };
};

export { useItemList };
