/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { EMPTY, noChange } from '../../selection/selection.constants';
import { useSelectionModel } from '../../selection/useSelectionModel';
import type { SelectionModel } from '../../selection';
import type { TreeSelectInput } from './useTreeNav.type';

const useTreeSelect = <T,>(input: TreeSelectInput<T>): SelectionModel => {
  const { rows, keys, indexOfKey, getLabel, selection, jumpRef } = input;
  const labelOf = useCallback((key: string) => {
    const row = rows[indexOfKey.get(key) ?? -1];
    return row ? getLabel(row.item) : '';
  }, [indexOfKey, rows, getLabel]);
  const focusKey = useCallback((key: string) => {
    const at = indexOfKey.get(key);
    if (at !== undefined) jumpRef.current(at, at);
  }, [indexOfKey, jumpRef]);
  return useSelectionModel({
    order: keys, selected: selection?.selected ?? EMPTY, onChange: selection?.onChange ?? noChange, labelOf, onFocusKey: focusKey,
  });
};

export { useTreeSelect };
