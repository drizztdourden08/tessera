/* @layer renderer-components @kind types */
import type { RowRange, VirtualAxis, VirtualMetrics } from '../../virtual';

interface UseVariableWindowInput {
  count: number;
  itemSize?: (index: number) => number;
  itemSizeKey?: string;
  axis: VirtualAxis;
}

interface VariableWindow {
  offsets?: readonly number[];
  readMetrics?: (root: HTMLElement, body: HTMLElement, before: VirtualMetrics) => VirtualMetrics;
  rangeOf?: (metrics: VirtualMetrics, overscan: number) => RowRange;
}

export type { UseVariableWindowInput, VariableWindow };
