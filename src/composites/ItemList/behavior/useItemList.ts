/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import type { ItemListProps, ItemListView } from '../ItemList.type';
import { focusRow } from './focus-row';
import { groupItems } from './group-items';
import { listKey } from './list-key';
import { matchesText } from '../../../data/text/matches-text';
import { rowButtons } from './row-buttons';
import { tabRow } from './tab-row';

const useItemList = <T,>(props: ItemListProps<T>): ItemListView<T> => {
  const { items, getId, getName, groupBy, selectedId = null, onSelect, onActivate, onRename } = props;
  const [query, setQuery] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);
  const shown = useMemo(() => (query ? items.filter((item) => matchesText(getName(item), query)) : items), [items, getName, query]);
  const groups = useMemo(() => groupItems(shown, groupBy), [shown, groupBy]);
  const rowIds = useMemo(() => groups.flatMap((group) => group.items.map(getId)).filter((id) => id !== renamingId), [groups, getId, renamingId]);
  const tabId = tabRow(rowIds, focusedId, selectedId);

  const startRename = useCallback((id: string) => setRenamingId(id), []);
  const endRename = useCallback((id: string, name: string | null) => {
    setRenamingId(null);
    if (name !== null) onRename?.(id, name);
    focusRow(listRef.current, groups.flatMap((group) => group.items.map(getId)).indexOf(id));
  }, [groups, getId, onRename]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => listKey({
    event, buttons: rowButtons(listRef.current), rowIds, rename: onRename && startRename, onSelect, onActivate,
  }), [rowIds, onRename, startRename, onSelect, onActivate]);

  const onFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    const id = rowIds[rowButtons(listRef.current).findIndex((button) => button === event.target)];
    if (id !== undefined) setFocusedId(id);
  }, [rowIds]);

  return { query, setQuery, shown, groups, rowIds, renamingId, tabId, startRename, endRename, listRef, onKeyDown, onFocus };
};

export { useItemList };
