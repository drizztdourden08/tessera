/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { FocusEvent, PointerEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useMoveFocus } from '../../reorder/useMoveFocus';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import type { DocumentTabsProps } from '../DocumentTabs.type';
import { keyOf } from './key-of';
import { tabContextMenu } from './tab-context-menu';
import { tabbableId } from './tabbable-id';
import { tabKeys } from './tab-keys';
import { useCloseFocus } from './useCloseFocus';
import { useKeepInView } from './useKeepInView';

const useDocumentTabs = ({ tabs, activeId, onMove, onClose, onTabContextMenu }: DocumentTabsProps) => {
  const { documentTabs } = useTesseraStrings();
  const listRef = useRef<HTMLElement>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [liveId, setLiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const focus = useMoveFocus(listRef);
  const expectClosed = useCloseFocus(listRef, tabs);
  useKeepInView(listRef, activeId);
  const commit = (from: number, to: number): void => {
    const tab = tabs[from];
    if (tab) focus.announce(documentTabs.moved(tab.title, to + 1, tabs.length));
    onMove(from, to);
  };
  const drag = useReorderDrag({ listRef, selector: ITEM_SELECTOR, axis: 'horizontal', onDrop: commit });
  const move = (from: number, to: number): void => {
    const tab = tabs[from];
    if (tab) focus.expect(tab.id);
    commit(from, to);
  };
  const close = (id: string): void => {
    expectClosed(id);
    onClose(id);
  };
  const onFocus = (event: FocusEvent<HTMLElement>): void => {
    const key = keyOf(event.target);
    setFocusedId(key);
    setLiveId(key);
  };
  return {
    listRef,
    drag,
    close,
    message: focus.message,
    tabId: tabbableId(tabs, focusedId, activeId),
    liveId,
    hoverId,
    onKeyDown: tabKeys(listRef, { total: tabs.length, move, close, menu: onTabContextMenu }),
    onContextMenu: tabContextMenu(listRef, onTabContextMenu),
    onFocus,
    onBlur: (): void => setLiveId(null),
    onPointerOver: (event: PointerEvent<HTMLElement>): void => setHoverId(keyOf(event.target)),
    onPointerLeave: (): void => setHoverId(null),
  };
};

export { useDocumentTabs };
