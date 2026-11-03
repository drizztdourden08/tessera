/* @layer renderer-components @kind logic */
import type { RowRange, VirtualMetrics } from '../../virtual';
import type { ItemLayout } from './item-layout.type';

const variableRange = (layout: ItemLayout) => (metrics: VirtualMetrics, overscan: number): RowRange => {
  if (layout.count <= 0) return { start: 0, end: 0 };
  const first = layout.indexAt(metrics.top);
  const last = layout.indexAt(metrics.top + Math.max(0, metrics.viewport));
  const start = Math.max(0, first - overscan);
  return { start, end: Math.min(layout.count, Math.max(start, last + 1 + overscan)) };
};

export { variableRange };
