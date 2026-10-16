/* @layer renderer-components @kind logic */
import type { StripMetrics } from './scroll-strip.type';

const metricsOf = (node: HTMLElement): StripMetrics => ({
  scrollLeft: node.scrollLeft,
  scrollWidth: node.scrollWidth,
  clientWidth: node.clientWidth,
});

export { metricsOf };
