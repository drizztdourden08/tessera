/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { itemOfKey } from '../../reorder/item-of-key';
import { mainOf } from '../../reorder/main-of';
import type { ClosedTab, DocumentTab } from '../DocumentTabs.type';

const useCloseFocus = (trackRef: RefObject<HTMLElement | null>, tabs: readonly DocumentTab[]): ((id: string) => void) => {
  const closing = useRef<ClosedTab | null>(null);
  useLayoutEffect(() => {
    const gone = closing.current;
    if (!gone || tabs.some((tab) => tab.id === gone.id)) return;
    closing.current = null;
    if (document.activeElement && document.activeElement !== document.body) return;
    const neighbour = tabs[Math.min(gone.index, tabs.length - 1)];
    if (neighbour) mainOf(itemOfKey(trackRef.current, neighbour.id))?.focus();
  });
  return (id) => {
    closing.current = { id, index: tabs.findIndex((tab) => tab.id === id) };
  };
};

export { useCloseFocus };
