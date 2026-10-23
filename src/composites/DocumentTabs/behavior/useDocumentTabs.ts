/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { FocusEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useMoveFocus } from '../../reorder/useMoveFocus';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import type { DocumentTabsProps } from '../DocumentTabs.type';
import { tabbableId } from './tabbable-id';
import { tabKeys } from './tab-keys';
import { useCloseFocus } from './useCloseFocus';
import { useKeepInView } from './useKeepInView';

const useDocumentTabs = ({ tabs, activeId, onMove, onClose }: DocumentTabsProps) => {
  const { documentTabs } = useTesseraStrings();
  const trackRef = useRef<HTMLElement>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const focus = useMoveFocus(trackRef);
  const expectClosed = useCloseFocus(trackRef, tabs);
  useKeepInView(trackRef, activeId);
  const commit = (from: number, to: number): void => {
    const tab = tabs[from];
    if (tab) focus.announce(documentTabs.moved(tab.title, to + 1, tabs.length));
    onMove(from, to);
  };
  const drag = useReorderDrag({ listRef: trackRef, selector: ITEM_SELECTOR, axis: 'horizontal', onDrop: commit });
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
    setFocusedId(event.target.closest<HTMLElement>('[data-reorder-key]')?.dataset.reorderKey ?? null);
  };
  return {
    trackRef,
    drag,
    close,
    message: focus.message,
    tabId: tabbableId(tabs, focusedId, activeId),
    onKeyDown: tabKeys(trackRef, { total: tabs.length, move, close }),
    onFocus,
  };
};

export { useDocumentTabs };
