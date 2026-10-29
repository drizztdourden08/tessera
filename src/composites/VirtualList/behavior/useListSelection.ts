/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef } from 'react';
import { EMPTY, noChange } from '../../selection/selection.constants';
import { useSelectionModel } from '../../selection/useSelectionModel';
import type { KeyboardEvent } from 'react';
import type { KeyTarget } from '../../virtual/virtual-focus.type';
import type { ListSelection, UseListSelectionInput } from './useListSelection.type';

const useListSelection = <T,>(input: UseListSelectionInput<T>): ListSelection => {
  const { items, getKey, getLabel, selection } = input;
  const jumpRef = useRef<(index: number, row: number) => void>(noChange);
  const keys = useMemo(() => items.map(getKey), [items, getKey]);
  const indexOfKey = useMemo(() => new Map(keys.map((key, at) => [key, at])), [keys]);
  const labelOf = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    const item = at === undefined ? undefined : items[at];
    return item === undefined || at === undefined ? '' : (getLabel?.(item, at) ?? '');
  }, [indexOfKey, items, getLabel]);
  const focusKey = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    if (at !== undefined) jumpRef.current(at, at);
  }, [indexOfKey]);

  const select = useSelectionModel({
    order: keys, selected: selection?.selected ?? EMPTY, onChange: selection?.onChange ?? noChange,
    labelOf: getLabel ? labelOf : undefined, onFocusKey: focusKey,
  });
  const onMove = useCallback((event: KeyboardEvent<HTMLElement>, target: KeyTarget, from: number) => {
    const start = keys[from];
    const end = keys[target.index];
    if (selection && event.shiftKey && start !== undefined && end !== undefined) select.step(start, end, event.ctrlKey || event.metaKey);
  }, [keys, selection, select]);
  return { keys, select, onMove, jumpRef };
};

export { useListSelection };
