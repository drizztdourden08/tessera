/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import type { ManagedListCreateView, ManagedListProps, ManagedListView } from '../ManagedList.type';
import { closeOnEscape } from './close-on-escape';
import { settleCreate } from './settle-create';

const useManagedCreate = <T,>(props: ManagedListProps<T>, view: ManagedListView<T>): ManagedListCreateView => {
  const { create, onCreate, selectedId = null } = props;
  const { rowIds, listRef } = view;
  const [open, setOpen] = useState(false);
  const newRef = useRef<HTMLButtonElement>(null);
  const slotRef = useRef<HTMLElement>(null);
  const openedWith = useRef<string | null>(null);
  const settling = useRef(false);

  const openForm = useCallback(() => {
    openedWith.current = selectedId;
    setOpen(true);
  }, [selectedId]);
  const close = useCallback(() => {
    settling.current = true;
    setOpen(false);
  }, []);
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => closeOnEscape(event, close), [close]);

  useEffect(() => {
    const slot = slotRef.current;
    if (open && slot && !slot.contains(ownerDocumentOf(slot).activeElement)) tabbablesIn(slot)[0]?.focus();
  }, [open]);

  useEffect(() => {
    if (open || !settling.current) return;
    settling.current = false;
    settleCreate({ rowIds, openedWith: openedWith.current, selectedId, list: listRef.current, newButton: newRef.current });
  }, [open, rowIds, selectedId, listRef]);

  return { open: open && create !== undefined, onNew: create ? openForm : onCreate, close, newRef, slotRef, onKeyDown };
};

export { useManagedCreate };
