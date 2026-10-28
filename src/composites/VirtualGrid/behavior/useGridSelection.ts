/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { EMPTY, noChange } from '../../selection/selection.constants';
import { useSelectionModel } from '../../selection/useSelectionModel';
import { gridKeys } from './grid-keys';
import type { GridSelection, UseGridSelectionInput } from './useGridSelection.type';

const useGridSelection = <T,>(input: UseGridSelectionInput<T>): GridSelection => {
  const { flat, keys, layout, selection, getLabel, holes, focusItem } = input;
  const { order, cells } = useMemo(() => gridKeys(layout, keys), [layout, keys]);
  const indexOfKey = useMemo(() => new Map(keys.map((key, at) => [key, at])), [keys]);
  const holeKeys = useMemo(() => new Set(holes ? flat.flatMap((item, at) => (holes(item, at) ? [keys[at] ?? ''] : [])) : []), [flat, keys, holes]);
  const cellOf = useCallback((key: string) => cells.get(key), [cells]);
  const isHole = useCallback((key: string) => holeKeys.has(key), [holeKeys]);
  const labelOf = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    const item = at === undefined ? undefined : flat[at];
    return item === undefined || at === undefined ? '' : (getLabel?.(item, at) ?? '');
  }, [indexOfKey, flat, getLabel]);
  const focusKey = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    if (at !== undefined) focusItem(at);
  }, [indexOfKey, focusItem]);

  const model = useSelectionModel({
    order, selected: selection?.selected ?? EMPTY, onChange: selection?.onChange ?? noChange, cellOf,
    isHole: holes ? isHole : undefined, labelOf: getLabel ? labelOf : undefined, onFocusKey: focusKey,
  });
  return { model, indexOfKey, holeKeys };
};

export { useGridSelection };
