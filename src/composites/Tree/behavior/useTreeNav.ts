/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { EMPTY, noChange } from '../../selection/selection.constants';
import { useSelectionModel } from '../../selection/useSelectionModel';
import { scrollTopForSpan } from '../../virtual/scroll-top-for-span';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { INDEX_ATTRIBUTE } from '../Tree.constants';
import type { KeyTarget } from '../../virtual/virtual-focus.type';
import type { ScrollAlign } from '../../virtual';
import { firstSelectedAt } from './first-selected-at';
import { treeKeyMove } from './tree-key-move';
import type { TreeNav, TreeNavInput } from './useTreeNav.type';

const SIDEWAYS = new Set(['ArrowLeft', 'ArrowRight']);

const useTreeNav = <T,>(input: TreeNavInput<T>): TreeNav => {
  const { rows, keys, indexOfKey, getLabel, selection, rowSize, overscan } = input;
  const rootRef = useRef<HTMLElement>(null);
  const jumpRef = useRef<(index: number, row: number) => void>(noChange);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keyAt = useCallback((index: number) => keys[index], [keys]);
  const slice = useVirtualWindow({
    enabled: true, count: rows.length, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan, sizeKey: rowSize,
  });
  const mode = selection ? (selection.mode ?? 'multiple') : 'none';

  const labelOf = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    const row = at === undefined ? undefined : rows[at];
    return row ? getLabel(row.item) : '';
  }, [indexOfKey, rows, getLabel]);
  const focusKey = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    if (at !== undefined) jumpRef.current(at, at);
  }, [indexOfKey]);
  const select = useSelectionModel({
    order: keys, selected: selection?.selected ?? EMPTY, onChange: selection?.onChange ?? noChange, labelOf, onFocusKey: focusKey,
  });

  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, index: number, page: number) => {
    const move = treeKeyMove(event.key, rows, index, page);
    return move.kind === 'focus' ? { index: move.index, row: move.index } : undefined;
  }, [rows]);
  const onMove = useCallback((event: KeyboardEvent<HTMLElement>, target: KeyTarget, from: number) => {
    if (mode !== 'multiple' || !event.shiftKey || SIDEWAYS.has(event.key)) return;
    const start = keys[from];
    const end = keys[target.index];
    if (start !== undefined && end !== undefined) select.step(start, end, event.ctrlKey || event.metaKey);
  }, [mode, keys, select]);
  const { jump, navigate } = useVirtualFocus({
    rootRef, bodyRef: slice.bodyRef, cellAttribute: INDEX_ATTRIBUTE, metrics: slice.metrics, onScroll: slice.onScroll, resolve, onMove,
  });
  useEffect(() => {
    jumpRef.current = jump;
  });

  const activeAt = activeKey === null ? undefined : indexOfKey.get(activeKey);
  const base = activeAt ?? firstSelectedAt(selection?.selected, indexOfKey) ?? 0;
  const tabbable = slice.indices.includes(base) ? base : (slice.indices[0] ?? 0);

  const scrollToKey = useCallback((key: string, align: ScrollAlign = 'nearest') => {
    const root = rootRef.current;
    const at = indexOfKey.get(key);
    if (!root || at === undefined) return;
    const height = slice.metrics.rowHeight;
    root.scrollTop = scrollTopForSpan({ top: at * height, height, viewport: root.clientHeight, scrollTop: root.scrollTop }, align);
    slice.onScroll();
  }, [indexOfKey, slice]);

  const pick = useCallback((key: string) => selection?.onChange(new Set([key])), [selection]);
  const jumpTo = useCallback((index: number) => jump(index, index), [jump]);

  return {
    rootRef, bodyRef: slice.bodyRef, indices: slice.indices, metrics: slice.metrics, tabbable, mode, select, pick,
    onScroll: slice.onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate: setActiveKey, jump: jumpTo, navigate, scrollToKey,
  };
};

export { useTreeNav };
