/* @layer renderer-components @kind logic */
import type { StripEdges } from './strip-geometry.type';

const sameEdges = (a: StripEdges, b: StripEdges): boolean =>
  a.canScrollBack === b.canScrollBack && a.canScrollForward === b.canScrollForward;

export { sameEdges };
