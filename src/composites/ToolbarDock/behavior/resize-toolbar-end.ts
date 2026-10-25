/* @layer renderer-components @kind logic */
import { SHARE_EPSILON } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarPlace } from '../ToolbarDock.type';
import { mirrorToolbarLane } from './mirror-toolbar-lane';
import { moveToolbarEnd } from './move-toolbar-end';
import { toolbarLaneMetrics } from './toolbar-lane-metrics';
import type { ToolbarGrip, ToolbarMetrics } from './toolbar-resize.type';

const same = (a: readonly ToolbarPlace[], b: readonly ToolbarPlace[]): boolean =>
  a.every((place, at) => Math.abs(place.start - (b[at]?.start ?? 0)) < SHARE_EPSILON && Math.abs(place.size - (b[at]?.size ?? 0)) < SHARE_EPSILON);

const resizeToolbarEnd = (origin: ToolbarLayout, metrics: ToolbarMetrics, grip: ToolbarGrip, px: number): ToolbarLayout => {
  const { id, end } = grip;
  const lane = toolbarLaneMetrics(origin, metrics, id);
  if (!lane) return origin;
  const { side, places, index, span, minShare } = lane;
  const share = px / span;
  const next = end === 'end'
    ? moveToolbarEnd(places, index, share, minShare)
    : mirrorToolbarLane(moveToolbarEnd(mirrorToolbarLane(places), places.length - 1 - index, 1 - share, minShare));
  if (same(places, next)) return origin;
  return { ...origin, sides: { ...origin.sides, [side]: origin.sides[side].map((current, at) => (at === lane.lane ? next : current)) } };
};

export { resizeToolbarEnd };
