/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { CELL_ATTRIBUTE, DEFAULT_COLUMNS, DEFAULT_OVERSCAN, ROW_ATTRIBUTE } from '../VirtualGrid.constants';
import { gridHeights } from './grid-heights';
import { gridLayout } from './grid-layout';
import { gridSections } from './grid-sections';
import { itemOfStop } from './item-of-stop';
import { nextCell } from './next-cell';
import { readGridMetrics } from './read-grid-metrics';
import { rowOfStop } from './row-of-stop';
import { rowPlace } from './row-place';
import { rowRange } from './row-range';
import { scrollOffset } from './scroll-offset';
import { useGridCollapsed } from './useGridCollapsed';
import { useGridColumns } from './useGridColumns';
import { useGridRects } from './useGridRects';
import type { KeyboardEvent } from 'react';
import type { ScrollAlign, VirtualMetrics } from '../../virtual';
import type { UseVirtualGridInput, VirtualGridModel } from './useVirtualGrid.type';

const useVirtualGrid = <T,>(input: UseVirtualGridInput<T>): VirtualGridModel<T> => {
  const { items, sections, getKey, overscan = DEFAULT_OVERSCAN, sizeKey, onActiveChange } = input;
  const rootRef = useRef<HTMLElement>(null);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const tileWidth = useRef(0);
  const { set: collapsed, setCollapsed } = useGridCollapsed(input);
  const { flat, shapes, keys } = useMemo(() => gridSections(items, sections, collapsed), [items, sections, collapsed]);
  const layout = useMemo(() => gridLayout(shapes, columns), [shapes, columns]);
  const { rows: placed } = layout;

  const keyAt = useCallback((row: number) => {
    const entry = placed[row];
    if (!entry) return undefined;
    if (entry.kind === 'header') return `section-${keys[entry.section]}`;
    const item = flat[entry.first];
    return item === undefined ? undefined : `row-${getKey(item, entry.first)}`;
  }, [placed, keys, flat, getKey]);
  const rangeOf = useCallback((metrics: VirtualMetrics, over: number) => rowRange({
    rows: placed, heights: gridHeights(metrics), scrollTop: metrics.top, viewport: metrics.viewport, overscan: over,
  }), [placed]);
  const slice = useVirtualWindow({
    enabled: true, count: placed.length, keyAt, rootRef, indexAttribute: ROW_ATTRIBUTE, overscan, sizeKey, readMetrics: readGridMetrics, rangeOf,
  });
  const { bodyRef, indices, metrics, onScroll } = slice;
  const heights = useMemo(() => gridHeights(metrics), [metrics]);
  const fit = useCallback((count: number, tile: number) => {
    tileWidth.current = tile;
    setColumns(count);
  }, []);
  useGridColumns({ rootRef, bodyRef, fallbackTile: metrics.rowHeight, refitKey: `${sizeKey}-${layout.tileRows}`, onColumns: fit });

  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, stop: number, page: number) => {
    const to = nextCell(event.key, layout, stop, { ctrl: event.ctrlKey || event.metaKey, page });
    return to === undefined ? undefined : { index: to, row: rowOfStop(layout, to) };
  }, [layout]);
  const spanOf = useCallback((row: number) => {
    const entry = placed[row];
    return entry ? rowPlace(entry, heights) : { top: 0, height: 0 };
  }, [placed, heights]);
  const follow = useCallback((stop: number) => {
    const item = itemOfStop(layout, stop);
    if (item >= 0) onActiveChange?.(item);
  }, [layout, onActiveChange]);
  const { active, activate, navigate } = useVirtualFocus({
    rootRef, bodyRef, cellAttribute: CELL_ATTRIBUTE, metrics, onScroll, resolve, spanOf, onActiveChange: follow,
  });

  const clamped = Math.min(active, Math.max(0, layout.stops - 1));
  const shown = indices.includes(rowOfStop(layout, clamped));
  const tabbable = shown ? clamped : (placed[indices[0] ?? 0]?.stop ?? 0);

  const scrollToIndex = useCallback((index: number, align: ScrollAlign = 'nearest') => {
    const root = rootRef.current;
    if (!root) return;
    root.scrollTop = scrollOffset({ layout, heights, index, viewport: root.clientHeight, scrollTop: root.scrollTop, align });
    onScroll();
  }, [layout, heights, onScroll]);

  const getRects = useGridRects({ rootRef, bodyRef, tileWidth, layout, heights, flat, getKey });

  return {
    rootRef, bodyRef, flat, layout, rows: indices, columns, sectionKeys: keys, collapsed, setCollapsed, tabbable, onScroll,
    onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate, scrollToIndex, getRects,
  };
};

export { useVirtualGrid };
