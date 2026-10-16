/* @layer renderer-components @kind logic */
import { EDGE_EPSILON, NO_OVERFLOW } from './scroll-strip.constants';
import { isOverflowing } from './is-overflowing';
import { maxScrollOf } from './max-scroll-of';
import type { StripEdges, StripMetrics } from './scroll-strip.type';

const edgesForMetrics = (metrics: StripMetrics): StripEdges => {
  if (!isOverflowing(metrics)) return NO_OVERFLOW;
  return {
    canScrollBack: metrics.scrollLeft > EDGE_EPSILON,
    canScrollForward: metrics.scrollLeft < maxScrollOf(metrics) - EDGE_EPSILON,
  };
};

export { edgesForMetrics };
