/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { CELL_ATTRIBUTE, DEFAULT_COLUMNS, DEFAULT_OVERSCAN, ROW_ATTRIBUTE } from '../VirtualGrid.constants';
import { gridRows } from './grid-rows';
import { nextCell } from './next-cell';
import { useGridColumns } from './useGridColumns';
import type { KeyboardEvent } from 'react';
import type { UseVirtualGridInput, VirtualGridModel } from './useVirtualGrid.type';

const useVirtualGrid = <T,>(input: UseVirtualGridInput<T>): VirtualGridModel => {
  const { items, getKey, overscan = DEFAULT_OVERSCAN, sizeKey, onActiveChange } = input;
  const count = items.length;
  const rootRef = useRef<HTMLElement>(null);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const rowCount = gridRows(count, columns);

  const keyAt = useCallback((row: number) => {
    const item = items[row * columns];
    return item === undefined ? undefined : `row-${getKey(item, row * columns)}`;
  }, [items, getKey, columns]);
  const slice = useVirtualWindow({ enabled: true, count: rowCount, keyAt, rootRef, indexAttribute: ROW_ATTRIBUTE, overscan, sizeKey });
  const { bodyRef, indices, metrics, onScroll } = slice;
  useGridColumns({ rootRef, bodyRef, fallbackTile: metrics.rowHeight, refitKey: `${sizeKey}-${rowCount}`, onColumns: setColumns });
  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, index: number, page: number) => {
    const to = nextCell(event.key, event.ctrlKey || event.metaKey, { active: index, count, columns, page });
    return to === undefined ? undefined : { index: to, row: Math.floor(to / columns) };
  }, [count, columns]);
  const { active, activate, navigate } = useVirtualFocus({ rootRef, bodyRef, cellAttribute: CELL_ATTRIBUTE, metrics, onScroll, resolve, onActiveChange });

  const clamped = Math.min(active, Math.max(0, count - 1));
  const shown = indices.includes(Math.floor(clamped / columns));
  const tabbable = shown ? clamped : (indices[0] ?? 0) * columns;

  return {
    rootRef, bodyRef, rows: indices, rowCount, columns, tabbable, onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate,
  };
};

export { useVirtualGrid };
