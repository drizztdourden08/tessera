/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { DEFAULT_COLUMNS, DEFAULT_OVERSCAN, ROW_ATTRIBUTE } from '../VirtualGrid.constants';
import { gridFixedColumns } from './grid-fixed-columns';
import { gridHeights } from './grid-heights';
import { gridLayout } from './grid-layout';
import { gridSections } from './grid-sections';
import { hasTrailing } from './has-trailing';
import { readGridMetrics } from './read-grid-metrics';
import { readMeasuredMetrics } from './read-measured-metrics';
import { rowOfStop } from './row-of-stop';
import { rowRange } from './row-range';
import { useGridAnchor } from './useGridAnchor';
import { useGridCollapsed } from './useGridCollapsed';
import { useGridEnds } from './useGridEnds';
import { useGridColumns } from './useGridColumns';
import { useGridFocus } from './useGridFocus';
import { useGridDropData } from './useGridDropData';
import { useGridInteraction } from './useGridInteraction';
import { useGridMeasure } from './useGridMeasure';
import { useGridOffsets } from './useGridOffsets';
import { useGridScroll } from './useGridScroll';
import type { VirtualMetrics } from '../../virtual';
import type { UseVirtualGridInput, VirtualGridModel } from './useVirtualGrid.type';

const useVirtualGrid = <T,>(input: UseVirtualGridInput<T>): VirtualGridModel<T> => {
  const { items, sections, getKey, overscan = DEFAULT_OVERSCAN, sizeKey, onActiveChange, trailing, onWheelSize } = input;
  const closing = hasTrailing(trailing);
  const rootRef = useRef<HTMLElement>(null);
  const [measured, setColumns] = useState(DEFAULT_COLUMNS);
  const fixed = gridFixedColumns(input.columns);
  const columns = fixed ?? measured;
  const tileWidth = useRef(0);
  const { set: collapsed, setCollapsed } = useGridCollapsed(input);
  const { flat, shapes, keys } = useMemo(() => gridSections(items, sections, collapsed, closing), [items, sections, collapsed, closing]);
  const layout = useMemo(() => gridLayout(shapes, columns), [shapes, columns]);
  const { rows: placed } = layout;

  const keyAt = useCallback((row: number) => {
    const entry = placed[row];
    if (!entry) return undefined;
    if (entry.kind === 'header') return `section-${keys[entry.section]}`;
    const item = flat[entry.first];
    return item === undefined ? 'row-trailing' : `row-${getKey(item, entry.first)}`;
  }, [placed, keys, flat, getKey]);
  const measuring = input.rowHeight === 'measured';
  const { offsets, record } = useGridOffsets({ enabled: measuring, layout, keyAt });
  const rangeOf = useCallback((metrics: VirtualMetrics, over: number) => rowRange({
    rows: placed, heights: gridHeights(metrics, offsets), scrollTop: metrics.top, viewport: metrics.viewport, overscan: over,
  }), [placed, offsets]);
  const slice = useVirtualWindow({
    enabled: true, count: placed.length, keyAt, rootRef, indexAttribute: ROW_ATTRIBUTE, overscan, sizeKey,
    readMetrics: measuring ? readMeasuredMetrics : readGridMetrics, rangeOf,
  });
  const { bodyRef, indices, metrics, onScroll } = slice;
  const heights = useMemo(() => gridHeights(metrics, offsets), [metrics, offsets]);
  useGridMeasure({ enabled: measuring, bodyRef, drawn: indices.join(','), keyAt, record });
  useGridAnchor({ rootRef, rows: placed, heights, onScroll });
  const fit = useCallback((count: number, tile: number) => {
    tileWidth.current = tile;
    setColumns(count);
  }, []);
  useGridColumns({ rootRef, bodyRef, fallbackTile: metrics.rowHeight, refitKey: `${sizeKey}-${layout.tileRows}`, onColumns: fit });

  const touch = useGridInteraction({ ...input, flat, layout, heights, columns, sectionKeys: keys, rootRef, bodyRef, tileWidth });
  const dropData = useGridDropData({ sections, announce: touch.moving.announce });
  const follow = useGridEnds({ rootRef, items: flat.length, onActiveChange, onWheelSize });
  const { active, activate, jump, navigate } = useGridFocus({ layout, heights, rootRef, bodyRef, metrics, onScroll, onMove: touch.onMove, onActiveChange: follow });
  useEffect(() => {
    touch.jumpRef.current = jump;
  });

  const clamped = Math.min(active, Math.max(0, layout.stops - 1));
  const shown = indices.includes(rowOfStop(layout, clamped));
  const tabbable = shown ? clamped : (placed[indices[0] ?? 0]?.stop ?? 0);

  const scrollToIndex = useGridScroll({ rootRef, layout, heights, onScroll });

  return {
    rootRef, bodyRef, flat, layout, heights, measured: measuring, rows: indices, columns, fixed: fixed !== undefined, sectionKeys: keys, collapsed, setCollapsed, tabbable, onScroll,
    onFocus: slice.onFocus, onBlur: slice.onBlur, activate, navigate, scrollToIndex, getRects: touch.getRects,
    selecting: touch.selecting, reordering: touch.moving.active, announcing: touch.moving.active || dropData.active, message: touch.moving.message,
    into: touch.moving.into ?? dropData.hot, dropOf: dropData.dropOf, ghost: touch.moving.ghost,
    extrasOf: touch.extrasOf, cellKeys: (event, stop, item) => touch.cellKeys(event, stop, item, navigate),
  };
};

export { useVirtualGrid };
