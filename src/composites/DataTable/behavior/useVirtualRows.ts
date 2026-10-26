/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { flattenRows } from './flatten-rows';
import { INDEX_ATTRIBUTE, NO_ITEMS } from './useVirtualRows.constants';
import type { FlatItem } from './flatten-rows.type';
import type { UseVirtualRowsInput, VirtualRows } from './useVirtualRows.type';

const useVirtualRows = <T,>(input: UseVirtualRowsInput<T>): VirtualRows<T> => {
  const { enabled, nodes, isExpanded, getRowId, rootRef } = input;

  const items = useMemo<readonly FlatItem<T>[]>(
    () => (enabled ? flattenRows({ nodes, isExpanded, getRowId }) : NO_ITEMS),
    [enabled, nodes, isExpanded, getRowId],
  );

  const keyAt = useCallback((index: number) => items[index]?.key, [items]);
  const slice = useVirtualWindow({ enabled, count: items.length, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE });

  return { items, indices: slice.indices, metrics: slice.metrics, bodyRef: slice.bodyRef, onScroll: slice.onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur };
};

export { useVirtualRows };
