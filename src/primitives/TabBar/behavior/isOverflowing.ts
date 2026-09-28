/* @layer renderer-components @kind logic */
import { EDGE_EPSILON } from './strip-geometry.constants';
import { maxScrollOf } from './maxScrollOf';
import type { StripMetrics } from './strip-geometry.type';

const isOverflowing = (metrics: StripMetrics): boolean => maxScrollOf(metrics) > EDGE_EPSILON;

export { isOverflowing };
