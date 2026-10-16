/* @layer renderer-components @kind logic */
import { EDGE_EPSILON } from './scroll-strip.constants';
import { maxScrollOf } from './max-scroll-of';
import type { StripMetrics } from './scroll-strip.type';

const isOverflowing = (metrics: StripMetrics): boolean => maxScrollOf(metrics) > EDGE_EPSILON;

export { isOverflowing };
