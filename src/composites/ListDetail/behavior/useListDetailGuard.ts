/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { useUnsavedGuard } from '../../../primitives/unsaved-guard/useUnsavedGuard';
import { openChange } from '../../ItemList/behavior/open-change';
import type { ListDetailGuardView, ListDetailMove, ListDetailProps } from '../ListDetail.type';
import { guardGroups } from './guard-groups';

const useListDetailGuard = <T,>(props: ListDetailProps<T>): ListDetailGuardView<T> => {
  const { list, selectedId, onSelect, dirty = false, onSave, onDiscard } = props;
  const { create, createOpen, onCreateOpenChange, onCreate, onActivate } = list;
  const [own, setOwn] = useState(false);
  const setOpen = useMemo(() => openChange(createOpen, setOwn, onCreateOpenChange), [createOpen, onCreateOpenChange]);
  const perform = useCallback((move: ListDetailMove) => {
    if (move.kind === 'select') {
      onSelect(move.id);
      if (move.activate) onActivate?.(move.id);
    } else if (move.kind === 'back') onSelect(null);
    else if (move.kind === 'run') move.run();
    else if (create) setOpen(true);
    else onCreate?.();
  }, [onSelect, onActivate, create, setOpen, onCreate]);
  const guard = useUnsavedGuard<ListDetailMove>({ dirty, onSave, onDiscard, perform });
  const { request } = guard;
  const pick = (id: string) => (id === selectedId ? undefined : request({ kind: 'select', id }));
  const activate = (id: string) => (id === selectedId ? onActivate?.(id) : request({ kind: 'select', id, activate: true }));
  const items = {
    ...list,
    selectedId,
    onSelect: onActivate ? undefined : pick,
    onActivate: onActivate && activate,
    groups: guardGroups(list.groups, request),
    onCreate: onCreate ? () => request({ kind: 'create' }) : undefined,
    createOpen: createOpen ?? own,
    onCreateOpenChange: (open: boolean) => (open ? request({ kind: 'create' }) : setOpen(false)),
  };
  return { guard, items, back: () => request({ kind: 'back' }) };
};

export { useListDetailGuard };
