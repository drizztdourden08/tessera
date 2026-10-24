/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { scrollTopToShow } from '../../virtual/scroll-top-to-show';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { INDEX_ATTRIBUTE } from '../VirtualList.constants';
import { nextIndex } from './next-index';
import type { KeyboardEvent } from 'react';
import type { UseVirtualListInput, VirtualListModel } from './useVirtualList.type';

const useVirtualList = <T,>(input: UseVirtualListInput<T>): VirtualListModel => {
  const { items, getKey, overscan, onActiveChange } = input;
  const count = items.length;
  const rootRef = useRef<HTMLElement>(null);
  const pending = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const keyAt = useCallback((index: number) => {
    const item = items[index];
    return item === undefined ? undefined : getKey(item, index);
  }, [items, getKey]);
  const slice = useVirtualWindow({ enabled: true, count, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan });
  const { bodyRef, indices, metrics, onScroll } = slice;

  useLayoutEffect(() => {
    const target = pending.current;
    if (target === null) return;
    const node = bodyRef.current?.querySelector<HTMLElement>(`[${INDEX_ATTRIBUTE}="${target}"]`);
    if (!node) return;
    pending.current = null;
    node.focus({ preventScroll: true });
  });

  const activate = useCallback((index: number) => {
    if (index === active) return;
    setActive(index);
    onActiveChange?.(index);
  }, [active, onActiveChange]);

  const navigate = useCallback((event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.target !== event.currentTarget) return;
    const root = rootRef.current;
    const viewport = root?.clientHeight ?? metrics.viewport;
    const page = Math.max(1, Math.floor(viewport / metrics.rowHeight) - 1);
    const to = nextIndex(event.key, index, count, page);
    if (to === undefined) return;
    event.preventDefault();
    if (to === index) return;
    pending.current = to;
    activate(to);
    if (!root) return;
    root.scrollTop = scrollTopToShow({ index: to, rowHeight: metrics.rowHeight, viewport, scrollTop: root.scrollTop });
    onScroll();
  }, [count, metrics, activate, onScroll]);

  const clamped = Math.min(active, Math.max(0, count - 1));
  const tabbable = indices.includes(clamped) ? clamped : (indices[0] ?? 0);

  return { rootRef, bodyRef, indices, tabbable, onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate };
};

export { useVirtualList };
