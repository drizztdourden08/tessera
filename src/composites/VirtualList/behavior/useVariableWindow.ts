/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { itemLayout } from './item-layout';
import { itemOffsets } from './item-offsets';
import { variableMetrics } from './variable-metrics';
import { variableRange } from './variable-range';
import type { UseVariableWindowInput, VariableWindow } from './useVariableWindow.type';

const useVariableWindow = (input: UseVariableWindowInput): VariableWindow => {
  const { count, itemSize, itemSizeKey, axis } = input;
  const pinned = useMemo(() => itemSize, [count, itemSizeKey, itemSizeKey === undefined ? itemSize : undefined]);
  const offsets = useMemo(() => (pinned ? itemOffsets(count, pinned) : undefined), [pinned, count]);
  return useMemo(() => {
    if (!offsets) return {};
    const layout = itemLayout(count, offsets, 0);
    return { offsets, readMetrics: variableMetrics(layout, axis), rangeOf: variableRange(layout) };
  }, [offsets, count, axis]);
};

export { useVariableWindow };
