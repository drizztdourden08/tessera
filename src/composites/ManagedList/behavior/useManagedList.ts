/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { MOVE_KEYS } from '../ManagedList.constants';
import type { ManagedListProps, ManagedListView } from '../ManagedList.type';
import { focusRow } from './focus-row';
import { groupItems } from './group-items';
import { matchName } from './match-name';
import { rowButtons } from './row-buttons';

const useManagedList = <T,>(props: ManagedListProps<T>): ManagedListView<T> => {
  const { items, getId, getName, groupBy, onSelect, onRename } = props;
  const [query, setQuery] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);
  const shown = useMemo(() => (query ? items.filter((item) => matchName(getName(item), query)) : items), [items, getName, query]);
  const groups = useMemo(() => groupItems(shown, groupBy), [shown, groupBy]);
  const rowIds = useMemo(() => groups.flatMap((group) => group.items.map(getId)).filter((id) => id !== renamingId), [groups, getId, renamingId]);

  const startRename = useCallback((id: string) => setRenamingId(id), []);
  const endRename = useCallback((id: string, name: string | null) => {
    setRenamingId(null);
    if (name !== null) onRename?.(id, name);
    focusRow(listRef.current, groups.flatMap((group) => group.items.map(getId)).indexOf(id));
  }, [groups, getId, onRename]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    const buttons = rowButtons(listRef.current);
    const index = buttons.indexOf(event.target as HTMLElement);
    const id = rowIds[index];
    if (id === undefined) return;
    if (event.key === 'F2' && onRename) {
      event.preventDefault();
      setRenamingId(id);
      return;
    }
    const move = MOVE_KEYS[event.key];
    if (!move) return;
    event.preventDefault();
    const next = move(index, rowIds.length - 1);
    buttons[next]?.focus();
    onSelect?.(rowIds[next] ?? id);
  }, [rowIds, onRename, onSelect]);

  return { query, setQuery, shown, groups, renamingId, startRename, endRename, listRef, onKeyDown };
};

export { useManagedList };
