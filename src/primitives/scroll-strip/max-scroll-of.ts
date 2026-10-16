/* @layer renderer-components @kind logic */
import type { StripMetrics } from './scroll-strip.type';

const maxScrollOf = (metrics: StripMetrics): number =>
  Math.max(metrics.scrollWidth - metrics.clientWidth, 0);

export { maxScrollOf };
