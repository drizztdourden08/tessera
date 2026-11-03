/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { EMPTY } from '../../selection/selection.constants';
import { measureInScroller } from '../../virtual/measure-in-scroller';
import { readHorizontalMetrics } from '../../virtual/read-horizontal-metrics';
import { readVirtualMetrics } from '../../virtual/read-virtual-metrics';
import { useScrollParent } from '../../virtual/useScrollParent';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { INDEX_ATTRIBUTE } from '../VirtualList.constants';
import { itemLayout } from './item-layout';
import { nextAcrossIndex } from './next-across-index';
import { nextIndex } from './next-index';
import { useListReorder } from './useListReorder';
import { useListScroll } from './useListScroll';
import { useListSelection } from './useListSelection';
import { useVariableWindow } from './useVariableWindow';
import type { KeyboardEvent } from 'react';
import type { UseVirtualListInput, VirtualListModel } from './useVirtualList.type';

const useVirtualList = <T,>(input: UseVirtualListInput<T>): VirtualListModel => {
  const { items, getKey, overscan, sizeKey, axis = 'vertical', selection, getLabel, onActiveChange, sizeOf, sizeOfKey, reorder } = input;
  const { scrollParent, initialFocusIndex } = input;
  const count = items.length;
  const across = axis === 'horizontal';
  const rootRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);
  const { keys, indexOfKey, select, onMove, jumpRef } = useListSelection({ items, getKey, getLabel, selection });
  const variable = useVariableWindow({ count, itemSize: sizeOf, itemSizeKey: sizeOfKey, axis });

  const baseRead = variable.readMetrics ?? (across ? readHorizontalMetrics : readVirtualMetrics);
  const readMetrics = useMemo(() => measureInScroller(baseRead, scrollerRef), [baseRead]);

  const keyAt = useCallback((index: number) => keys[index], [keys]);
  const slice = useVirtualWindow({
    enabled: true, count, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan, sizeKey,
    readMetrics, rangeOf: variable.rangeOf,
  });
  const { bodyRef, indices, metrics, onScroll } = slice;
  useScrollParent({ option: scrollParent, rootRef, scrollerRef, onChange: onScroll });
  const layout = useMemo(() => itemLayout(count, variable.offsets, metrics.rowHeight), [count, variable.offsets, metrics.rowHeight]);
  const spanOf = useCallback((row: number) => ({ top: layout.startOf(row), height: layout.sizeOf(row) }), [layout]);
  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, index: number, page: number) => {
    const to = (across ? nextAcrossIndex : nextIndex)(event.key, index, count, page);
    return to === undefined ? undefined : { index: to, row: to };
  }, [count, across]);
  const { active, activate, jump, navigate } = useVirtualFocus({
    rootRef, bodyRef, cellAttribute: INDEX_ATTRIBUTE, metrics, onScroll, resolve, spanOf, axis, onMove, onActiveChange, scrollerRef, initialIndex: initialFocusIndex,
  });
  useEffect(() => {
    jumpRef.current = jump;
  });
  const { scrollToIndex, getRects } = useListScroll({ rootRef, scrollerRef, bodyRef, layout, axis, keys, onScroll });
  const moving = useListReorder({
    reorder, items, keys, indexOfKey, selected: selection?.selected ?? EMPTY, layout, axis, rootRef, scrollerRef, bodyRef, focusItem: (at) => jumpRef.current(at, at),
  });

  const clamped = Math.min(active, Math.max(0, count - 1));
  const tabbable = indices.includes(clamped) ? clamped : (indices[0] ?? 0);

  return {
    rootRef, bodyRef, indices, tabbable, onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate,
    selecting: selection !== undefined, select, keys, layout, variable: variable.offsets !== undefined, moving, scrollToIndex, getRects,
  };
};

export { useVirtualList };
