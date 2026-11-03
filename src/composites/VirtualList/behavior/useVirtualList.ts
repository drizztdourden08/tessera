/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { EMPTY } from '../../selection/selection.constants';
import { readHorizontalMetrics } from '../../virtual/read-horizontal-metrics';
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
  const count = items.length;
  const across = axis === 'horizontal';
  const rootRef = useRef<HTMLElement>(null);
  const { keys, indexOfKey, select, onMove, jumpRef } = useListSelection({ items, getKey, getLabel, selection });
  const variable = useVariableWindow({ count, itemSize: sizeOf, itemSizeKey: sizeOfKey, axis });

  const keyAt = useCallback((index: number) => keys[index], [keys]);
  const slice = useVirtualWindow({
    enabled: true, count, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan, sizeKey,
    readMetrics: variable.readMetrics ?? (across ? readHorizontalMetrics : undefined), rangeOf: variable.rangeOf,
  });
  const { bodyRef, indices, metrics, onScroll } = slice;
  const layout = useMemo(() => itemLayout(count, variable.offsets, metrics.rowHeight), [count, variable.offsets, metrics.rowHeight]);
  const spanOf = useCallback((row: number) => ({ top: layout.startOf(row), height: layout.sizeOf(row) }), [layout]);
  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, index: number, page: number) => {
    const to = (across ? nextAcrossIndex : nextIndex)(event.key, index, count, page);
    return to === undefined ? undefined : { index: to, row: to };
  }, [count, across]);
  const { active, activate, jump, navigate } = useVirtualFocus({
    rootRef, bodyRef, cellAttribute: INDEX_ATTRIBUTE, metrics, onScroll, resolve, spanOf, axis, onMove, onActiveChange,
  });
  useEffect(() => {
    jumpRef.current = jump;
  });
  const { scrollToIndex, getRects } = useListScroll({ rootRef, bodyRef, layout, axis, keys, onScroll });
  const moving = useListReorder({
    reorder, items, keys, indexOfKey, selected: selection?.selected ?? EMPTY, layout, axis, rootRef, bodyRef, focusItem: (at) => jumpRef.current(at, at),
  });

  const clamped = Math.min(active, Math.max(0, count - 1));
  const tabbable = indices.includes(clamped) ? clamped : (indices[0] ?? 0);

  return {
    rootRef, bodyRef, indices, tabbable, onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate,
    selecting: selection !== undefined, select, keys, layout, variable: variable.offsets !== undefined, moving, scrollToIndex, getRects,
  };
};

export { useVirtualList };
