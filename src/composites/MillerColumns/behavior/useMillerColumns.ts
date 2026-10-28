/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { isElement } from '../../../primitives/dom/is-element';
import { COLUMN_ATTRIBUTE } from '../MillerColumns.constants';
import type { VirtualListHandle } from '../../VirtualList';
import type { MillerColumnsProps } from '../MillerColumns.type';
import { columnsOf } from './columns-of';
import { nextPath } from './next-path';
import { usePath } from './usePath';
import type { MillerColumnsModel } from './useMillerColumns.type';

interface Wanted {
  column: number;
  index: number;
}

const useMillerColumns = <T,>(props: MillerColumnsProps<T>): MillerColumnsModel<T> => {
  const { items, getKey, getChildren, selection, path, defaultPath, onPathChange, onOpen } = props;
  const [current, setPath] = usePath(path, defaultPath, onPathChange);
  const columns = useMemo(() => columnsOf(items, current, getKey, getChildren), [items, current, getKey, getChildren]);
  const rootRef = useRef<HTMLElement>(null);
  const handles = useRef<(VirtualListHandle | null)[]>([]);
  const wanted = useRef<Wanted | null>(null);

  useEffect(() => {
    const want = wanted.current;
    if (!want) return;
    const row = rootRef.current
      ?.querySelector(`[${COLUMN_ATTRIBUTE}="${want.column}"]`)
      ?.querySelector<HTMLElement>(`[aria-posinset="${want.index + 1}"]`);
    if (row) {
      wanted.current = null;
      row.focus();
    } else handles.current[want.column]?.scrollToIndex(want.index);
  });

  const attach = useCallback((index: number) => (handle: VirtualListHandle | null) => {
    handles.current[index] = handle;
  }, []);

  const changeAt = useCallback((column: number, next: ReadonlySet<string>) => {
    selection.onChange(next);
    setPath(nextPath(current, column, next));
  }, [selection, setPath, current]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    const row = event.target;
    if (!isElement(row) || row.getAttribute('role') !== 'option') return;
    const column = Number(row.closest(`[${COLUMN_ATTRIBUTE}]`)?.getAttribute(COLUMN_ATTRIBUTE));
    const item = columns[column]?.items[Number(row.getAttribute('aria-posinset')) - 1];
    if (item === undefined) return;
    const first = getChildren(item)?.[0];
    if (event.key === 'ArrowRight' && first !== undefined) {
      event.preventDefault();
      selection.onChange(new Set([getKey(first)]));
      setPath([...current.slice(0, column), getKey(item), getKey(first)]);
      wanted.current = { column: column + 1, index: 0 };
    } else if (event.key === 'ArrowLeft' && column > 0) {
      const parent = current[column - 1];
      if (parent === undefined) return;
      event.preventDefault();
      selection.onChange(new Set([parent]));
      setPath(current.slice(0, column));
      wanted.current = { column: column - 1, index: Math.max(0, columns[column - 1]?.items.findIndex((entry) => getKey(entry) === parent) ?? 0) };
    } else if (event.key === 'Enter' && getChildren(item) === undefined) {
      event.preventDefault();
      onOpen?.(item);
    }
  };

  return { rootRef, columns, path: current, attach, changeAt, onKeyDown };
};

export { useMillerColumns };
