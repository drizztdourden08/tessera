/* @layer renderer-components @kind types */
import type { VirtualMetrics } from '../../virtual';
import type { FlatItem } from './flatten-rows.type';

interface DetailSpan {
  at: number;
  height: number;
}

interface DetailRangeInput {
  metrics: VirtualMetrics;
  overscan: number;
  count: number;
  detail: DetailSpan;
}

interface UseDetailSpanInput<T> {
  items: readonly FlatItem<T>[];
  detailRowId: string | null;
  getRowId: (row: T) => string;
}

interface DetailSpanState {
  detail: DetailSpan;
  onDetailHeight: (height: number) => void;
}

export type { DetailRangeInput, DetailSpan, DetailSpanState, UseDetailSpanInput };
