/* @layer renderer-components @kind logic */
import type { VirtualMetrics } from './virtual.type';

const sameMetrics = (a: VirtualMetrics, b: VirtualMetrics): boolean =>
  a.top === b.top && a.viewport === b.viewport && a.rowHeight === b.rowHeight && a.head === b.head;

export { sameMetrics };
