/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { FocusEvent } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useMoveFocus } from '../../reorder/useMoveFocus';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import type { ReorderListProps } from '../ReorderList.type';
import { reorderKeys } from './reorder-keys';
import { tabbableId } from './tabbable-id';

const useReorderList = ({ items, selectedId, onMove, onRename, onActivate }: ReorderListProps) => {
  const { reorderList } = useTesseraStrings();
  const listRef = useRef<HTMLElement>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const focus = useMoveFocus(listRef);
  const commit = (from: number, to: number): void => {
    const item = items[from];
    if (item) focus.announce(reorderList.moved(item.label, to + 1, items.length));
    onMove(from, to);
  };
  const drag = useReorderDrag({ listRef, selector: ITEM_SELECTOR, onDrop: commit });
  const move = (from: number, to: number): void => {
    const item = items[from];
    if (item) focus.expect(item.id);
    commit(from, to);
  };
  const startRename = onRename && setRenamingId;
  const endRename = (id: string, name: string | null): void => {
    const active = ownerDocumentOf(listRef.current).activeElement;
    if (active instanceof HTMLInputElement && listRef.current?.contains(active)) focus.expect(id);
    setRenamingId(null);
    if (name !== null) onRename?.(id, name);
  };
  const onFocus = (event: FocusEvent<HTMLElement>): void => {
    setFocusedId(event.target.closest<HTMLElement>('[data-reorder-key]')?.dataset.reorderKey ?? null);
  };
  return {
    listRef,
    drag,
    message: focus.message,
    renamingId,
    startRename,
    endRename,
    tabId: tabbableId(items, focusedId, selectedId),
    onKeyDown: reorderKeys(listRef, { items, move, rename: startRename, activate: onActivate }),
    onFocus,
  };
};

export { useReorderList };
