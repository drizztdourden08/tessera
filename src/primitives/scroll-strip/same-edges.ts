/* @layer renderer-components @kind logic */
import type { StripEdges } from './scroll-strip.type';

const sameEdges = (a: StripEdges, b: StripEdges): boolean =>
  a.canScrollBack === b.canScrollBack && a.canScrollForward === b.canScrollForward;

export { sameEdges };
