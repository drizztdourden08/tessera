/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef } from 'react';
import { bodyOrigin } from '../../virtual/body-origin';
import { readHorizontalMetrics } from '../../virtual/read-horizontal-metrics';
import { scrollTopForSpan } from '../../virtual/scroll-top-for-span';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { INDEX_ATTRIBUTE } from '../VirtualList.constants';
import { listRects } from './list-rects';
import { nextAcrossIndex } from './next-across-index';
import { nextIndex } from './next-index';
import { useListSelection } from './useListSelection';
import type { KeyboardEvent } from 'react';
import type { ScrollAlign } from '../../virtual';
import type { UseVirtualListInput, VirtualListModel } from './useVirtualList.type';

const useVirtualList = <T,>(input: UseVirtualListInput<T>): VirtualListModel => {
  const { items, getKey, overscan, sizeKey, axis = 'vertical', selection, getLabel, onActiveChange } = input;
  const count = items.length;
  const across = axis === 'horizontal';
  const rootRef = useRef<HTMLElement>(null);
  const { keys, select, onMove, jumpRef } = useListSelection({ items, getKey, getLabel, selection });

  const keyAt = useCallback((index: number) => keys[index], [keys]);
  const slice = useVirtualWindow({
    enabled: true, count, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan, sizeKey, readMetrics: across ? readHorizontalMetrics : undefined,
  });
  const { bodyRef, indices, metrics, onScroll } = slice;
  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, index: number, page: number) => {
    const to = (across ? nextAcrossIndex : nextIndex)(event.key, index, count, page);
    return to === undefined ? undefined : { index: to, row: to };
  }, [count, across]);
  const { active, activate, jump, navigate } = useVirtualFocus({
    rootRef, bodyRef, cellAttribute: INDEX_ATTRIBUTE, metrics, onScroll, resolve, axis, onMove, onActiveChange,
  });
  useEffect(() => {
    jumpRef.current = jump;
  });

  const clamped = Math.min(active, Math.max(0, count - 1));
  const tabbable = indices.includes(clamped) ? clamped : (indices[0] ?? 0);

  const scrollToIndex = useCallback((index: number, align: ScrollAlign = 'nearest') => {
    const root = rootRef.current;
    if (!root) return;
    const span = { top: index * metrics.rowHeight, height: metrics.rowHeight };
    const place = { ...span, viewport: across ? root.clientWidth : root.clientHeight, scrollTop: across ? root.scrollLeft : root.scrollTop };
    if (across) root.scrollLeft = scrollTopForSpan(place, align);
    else root.scrollTop = scrollTopForSpan(place, align);
    onScroll();
  }, [rootRef, metrics, across, onScroll]);

  const getRects = useCallback(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return [];
    const cross = across ? body.clientHeight : body.clientWidth;
    return listRects({ count, size: metrics.rowHeight, cross, axis, origin: bodyOrigin(root, body), keyOf: (at) => keys[at] ?? '' });
  }, [rootRef, bodyRef, count, metrics, across, axis, keys]);

  return {
    rootRef, bodyRef, indices, tabbable, onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate,
    selecting: selection !== undefined, select, keys, scrollToIndex, getRects,
  };
};

export { useVirtualList };
