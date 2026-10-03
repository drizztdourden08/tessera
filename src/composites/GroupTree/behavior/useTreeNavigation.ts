/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { selectionKey } from './selection-key';
import { treeMove } from './tree-move';
import type { TreeMove, TreeRow } from '../GroupTree.type';
import type { TreeNavigation, TreeNavigationInput } from './useTreeNavigation.type';

const useTreeNavigation = <T,>(input: TreeNavigationInput<T>): TreeNavigation<T> => {
  const { rows, expansion, selectedKey, onSelect, onActivate } = input;
  const listRef = useRef<HTMLDivElement>(null);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const has = (key: string | null | undefined): key is string => rows.some((row) => row.key === key);
  const fallback = rows.find((row) => selectionKey(row) === selectedKey)?.key ?? rows[0]?.key ?? null;
  const activeKey = has(focusedKey) ? focusedKey : fallback;

  const focusRow = useCallback((key: string) => {
    setFocusedKey(key);
    listRef.current?.querySelector<HTMLElement>(`[data-tree-key="${CSS.escape(key)}"]`)?.focus();
  }, []);

  const choose = useCallback((row: TreeRow<T>) => {
    setFocusedKey(row.key);
    onSelect?.(selectionKey(row), row.kind === 'item' ? row.item : undefined);
    if (row.kind === 'group') expansion.toggle(row.key);
  }, [expansion, onSelect]);

  const apply = (move: TreeMove, pressed: string): void => {
    if (move.kind === 'expand' || move.kind === 'collapse') {
      expansion.setExpanded(move.key, move.kind === 'expand');
      return;
    }
    const row = move.kind === 'none' ? undefined : rows[move.index];
    if (!row) return;
    if (move.kind === 'focus') {
      focusRow(row.key);
      return;
    }
    choose(row);
    if (pressed === 'Enter' && row.kind === 'item') onActivate?.(row.item);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    const move = treeMove(event.key, rows, rows.findIndex((row) => row.key === activeKey));
    if (move.kind === 'none') return;
    event.preventDefault();
    apply(move, event.key);
  };

  return { listRef, activeKey, choose, onKeyDown };
};

export { useTreeNavigation };
