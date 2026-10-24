/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { INDEX_ATTRIBUTE } from '../VirtualList.constants';
import { nextIndex } from './next-index';
import type { KeyboardEvent } from 'react';
import type { UseVirtualListInput, VirtualListModel } from './useVirtualList.type';

const useVirtualList = <T,>(input: UseVirtualListInput<T>): VirtualListModel => {
  const { items, getKey, overscan, sizeKey, onActiveChange } = input;
  const count = items.length;
  const rootRef = useRef<HTMLElement>(null);

  const keyAt = useCallback((index: number) => {
    const item = items[index];
    return item === undefined ? undefined : getKey(item, index);
  }, [items, getKey]);
  const slice = useVirtualWindow({ enabled: true, count, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan, sizeKey });
  const { bodyRef, indices, metrics, onScroll } = slice;
  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, index: number, page: number) => {
    const to = nextIndex(event.key, index, count, page);
    return to === undefined ? undefined : { index: to, row: to };
  }, [count]);
  const { active, activate, navigate } = useVirtualFocus({ rootRef, bodyRef, cellAttribute: INDEX_ATTRIBUTE, metrics, onScroll, resolve, onActiveChange });

  const clamped = Math.min(active, Math.max(0, count - 1));
  const tabbable = indices.includes(clamped) ? clamped : (indices[0] ?? 0);

  return { rootRef, bodyRef, indices, tabbable, onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate };
};

export { useVirtualList };
