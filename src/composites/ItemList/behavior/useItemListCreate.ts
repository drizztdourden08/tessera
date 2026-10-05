/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import type { ItemListCreateView, ItemListProps, ItemListView } from '../ItemList.type';
import { closeOnEscape } from './close-on-escape';
import { focusLost } from './focus-lost';
import { openChange } from './open-change';
import { settleCreate } from './settle-create';

const useItemListCreate = <T,>(props: ItemListProps<T>, view: ItemListView<T>): ItemListCreateView => {
  const { create, onCreate, createOpen, onCreateOpenChange, selectedId = null } = props;
  const { rowIds, listRef } = view;
  const [own, setOwn] = useState(false);
  const open = (createOpen ?? own) && create !== undefined;
  const newRef = useRef<HTMLButtonElement>(null);
  const slotRef = useRef<HTMLElement>(null);
  const selected = useRef(selectedId);
  selected.current = selectedId;
  const openedWith = useRef<string | null>(null);
  const wasOpen = useRef(false);
  const closing = useRef(false);

  const setOpen = useMemo(() => openChange(createOpen, setOwn, onCreateOpenChange), [createOpen, onCreateOpenChange]);
  const openForm = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => {
    closing.current = true;
    setOpen(false);
  }, [setOpen]);
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => closeOnEscape(event, close), [close]);

  useEffect(() => {
    if (!open) return;
    openedWith.current = selected.current;
    const slot = slotRef.current;
    if (slot && !slot.contains(ownerDocumentOf(slot).activeElement)) tabbablesIn(slot)[0]?.focus();
  }, [open]);

  useEffect(() => {
    const was = wasOpen.current;
    wasOpen.current = open;
    if (open || !was) return;
    const asked = closing.current;
    closing.current = false;
    if (!asked && !focusLost(ownerDocumentOf(listRef.current))) return;
    settleCreate({ rowIds, openedWith: openedWith.current, selectedId, list: listRef.current, newButton: newRef.current });
  }, [open, rowIds, selectedId, listRef]);

  return { open, onNew: create ? openForm : onCreate, close, newRef, slotRef, onKeyDown };
};

export { useItemListCreate };
