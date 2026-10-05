/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { useUnsavedGuard } from '../../../primitives/unsaved-guard/useUnsavedGuard';
import { openChange } from '../../ItemList/behavior/open-change';
import type { ListDetailGuardView, ListDetailMove, ListDetailProps } from '../ListDetail.type';

const useListDetailGuard = <T,>(props: ListDetailProps<T>): ListDetailGuardView<T> => {
  const { list, selectedId, onSelect, dirty = false, onSave, onDiscard } = props;
  const { create, createOpen, onCreateOpenChange, onCreate } = list;
  const [own, setOwn] = useState(false);
  const setOpen = useMemo(() => openChange(createOpen, setOwn, onCreateOpenChange), [createOpen, onCreateOpenChange]);
  const perform = useCallback((move: ListDetailMove) => {
    if (move.kind === 'select') onSelect(move.id);
    else if (move.kind === 'back') onSelect(null);
    else if (create) setOpen(true);
    else onCreate?.();
  }, [onSelect, create, setOpen, onCreate]);
  const guard = useUnsavedGuard<ListDetailMove>({ dirty, onSave, onDiscard, perform });
  const { request } = guard;
  const items = {
    ...list,
    selectedId,
    onSelect: (id: string) => (id === selectedId ? undefined : request({ kind: 'select', id })),
    onCreate: onCreate ? () => request({ kind: 'create' }) : undefined,
    createOpen: createOpen ?? own,
    onCreateOpenChange: (open: boolean) => (open ? request({ kind: 'create' }) : setOpen(false)),
  };
  return { guard, items, back: () => request({ kind: 'back' }) };
};

export { useListDetailGuard };
