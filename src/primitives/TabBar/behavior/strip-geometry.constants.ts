/* @layer renderer-components @kind data */
import type { StripEdges } from './strip-geometry.type';

const EDGE_EPSILON = 1;

const PAGE_FRACTION = 0.8;

const NO_OVERFLOW: StripEdges = { canScrollBack: false, canScrollForward: false };

export { EDGE_EPSILON, PAGE_FRACTION, NO_OVERFLOW };
