/* @layer renderer-components @kind data */
import type { StripEdges } from './scroll-strip.type';

const EDGE_EPSILON = 1;

const PAGE_FRACTION = 0.8;

const NO_OVERFLOW: StripEdges = { canScrollBack: false, canScrollForward: false };

const ROOT_CLASS = 'scroll-strip';

const TRACK_CLASS = 'scroll-strip__track';

const LEAST_ITEMS = 2;

export { EDGE_EPSILON, LEAST_ITEMS, NO_OVERFLOW, PAGE_FRACTION, ROOT_CLASS, TRACK_CLASS };
