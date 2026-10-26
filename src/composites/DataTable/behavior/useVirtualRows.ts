/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { detailRange } from './detail-range';
import { flattenRows } from './flatten-rows';
import { useDetailSpan } from './useDetailSpan';
import { INDEX_ATTRIBUTE, NO_ITEMS } from './useVirtualRows.constants';
import type { VirtualMetrics } from '../../virtual';
import type { FlatItem } from './flatten-rows.type';
import type { UseVirtualRowsInput, VirtualRows } from './useVirtualRows.type';

const useVirtualRows = <T,>(input: UseVirtualRowsInput<T>): VirtualRows<T> => {
  const { enabled, nodes, isExpanded, getRowId, rootRef, rowHeight, detailRowId = null } = input;

  const items = useMemo<readonly FlatItem<T>[]>(
    () => (enabled ? flattenRows({ nodes, isExpanded, getRowId }) : NO_ITEMS),
    [enabled, nodes, isExpanded, getRowId],
  );

  const keyAt = useCallback((index: number) => items[index]?.key, [items]);
  const { detail, onDetailHeight } = useDetailSpan({ items, detailRowId, getRowId });
  const count = items.length;
  const rangeOf = useCallback(
    (metrics: VirtualMetrics, overscan: number) => detailRange({ metrics, overscan, count, detail }),
    [count, detail],
  );
  const slice = useVirtualWindow({ enabled, count, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, sizeKey: rowHeight, rangeOf });

  return {
    items, indices: slice.indices, metrics: slice.metrics, bodyRef: slice.bodyRef, onScroll: slice.onScroll,
    onFocus: slice.onFocus, onBlur: slice.onBlur, detail, onDetailHeight,
  };
};

export { useVirtualRows };
