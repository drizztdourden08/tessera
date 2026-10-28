/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { noChange } from '../../selection/selection.constants';
import { scrollTopForSpan } from '../../virtual/scroll-top-for-span';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { useVirtualWindow } from '../../virtual/useVirtualWindow';
import { INDEX_ATTRIBUTE } from '../Tree.constants';
import type { KeyTarget } from '../../virtual/virtual-focus.type';
import type { ScrollAlign } from '../../virtual';
import { selectionModeOf } from './selection-mode-of';
import { tabbableOf } from './tabbable-of';
import { treeKeyMove } from './tree-key-move';
import { useTreeSelect } from './useTreeSelect';
import { SIDEWAYS } from './useTreeNav.constants';
import type { TreeNav, TreeNavInput } from './useTreeNav.type';

const useTreeNav = <T,>(input: TreeNavInput<T>): TreeNav => {
  const { rows, keys, indexOfKey, getLabel, selection, rowSize, overscan } = input;
  const rootRef = useRef<HTMLElement>(null);
  const jumpRef = useRef<(index: number, row: number) => void>(noChange);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keyAt = useCallback((index: number) => keys[index], [keys]);
  const slice = useVirtualWindow({
    enabled: true, count: rows.length, keyAt, rootRef, indexAttribute: INDEX_ATTRIBUTE, overscan, sizeKey: rowSize,
  });
  const mode = selectionModeOf(selection);
  const select = useTreeSelect({ rows, keys, indexOfKey, getLabel, selection, jumpRef });

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
  const activeAt = activeKey === null ? undefined : indexOfKey.get(activeKey);

  return {
    rootRef, bodyRef: slice.bodyRef, indices: slice.indices, metrics: slice.metrics, mode, select, pick, scrollToKey, navigate,
    tabbable: tabbableOf(slice.indices, activeAt, selection?.selected, indexOfKey),
    onScroll: slice.onScroll, onFocus: slice.onFocus, onBlur: slice.onBlur, activate: setActiveKey, jump: jumpTo,
  };
};

export { useTreeNav };
