/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { NO_DELETES } from '../ItemList.constants';
import type { ItemListProps } from '../ItemList.type';
import type { ItemListDeletes, ItemListDeleteState } from './item-list-deletes.type';
import { pruneDeletes } from './prune-deletes';
import { rowIdOf } from './row-id-of';
import { withoutId } from './without-id';

const useItemListDeletes = <T,>(props: ItemListProps<T>): ItemListDeletes => {
  const { items, getId, onDelete } = props;
  const [own, setState] = useState<ItemListDeleteState>(NO_DELETES);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const present = useMemo(() => new Set(items.map(getId)), [items, getId]);
  const state = pruneDeletes(own, present);
  if (state !== own) setState(state);
  const last = useRef({ pending: state.pending, onDelete });
  last.current.pending = state.pending;
  last.current.onDelete = onDelete;

  useEffect(() => {
    const latest = last.current;
    return () => latest.pending.forEach((id) => latest.onDelete?.(id));
  }, []);

  const start = useCallback((id: string) => {
    last.current.pending = [...withoutId(last.current.pending, id), id];
    setState((current) => ({ ...current, pending: [...withoutId(current.pending, id), id] }));
  }, []);
  const restore = useCallback((id: string) => {
    last.current.pending = withoutId(last.current.pending, id);
    setState((current) => ({ ...current, pending: withoutId(current.pending, id) }));
  }, []);
  const commit = useCallback((id: string) => {
    const latest = last.current;
    if (!latest.pending.includes(id)) return;
    latest.pending = withoutId(latest.pending, id);
    latest.onDelete?.(id);
    setState((current) => ({ pending: withoutId(current.pending, id), done: [...current.done, id] }));
  }, []);
  const onMouseOver = useCallback((event: MouseEvent<HTMLElement>) => setHoverId(rowIdOf(event.target)), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);

  return { ...state, hoverId, start, restore, commit, onMouseOver, onMouseLeave };
};

export { useItemListDeletes };
