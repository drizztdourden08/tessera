/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { isElement } from '../../../primitives/dom/is-element';
import { COLUMN_ATTRIBUTE } from '../MillerColumns.constants';
import type { VirtualListHandle } from '../../VirtualList';
import type { MillerColumnsProps } from '../MillerColumns.type';
import { columnsOf } from './columns-of';
import { millerIntentOf } from './miller-intent-of';
import { nextPath } from './next-path';
import { usePath } from './usePath';
import type { MillerColumnsModel, Wanted } from './useMillerColumns.type';

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
    const intent = millerIntentOf({ key: event.key, column, item, path: current, columns, getKey, getChildren });
    if (!intent) return;
    event.preventDefault();
    if (intent.kind === 'open') {
      onOpen?.(item);
      return;
    }
    selection.onChange(new Set([intent.selected]));
    setPath(intent.path);
    wanted.current = intent.wanted;
  };

  return { rootRef, columns, path: current, attach, changeAt, onKeyDown };
};

export { useMillerColumns };
