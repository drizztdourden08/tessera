/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { applyToolbarTake } from './apply-toolbar-take';
import { normalizeCorners } from './normalize-corners';
import { toolbarCornerCandidates } from './toolbar-corner-candidates';
import type { ToolbarCornerCandidate } from './toolbar-corner.type';
import { toolbarLaneMetrics } from './toolbar-lane-metrics';
import type { ToolbarGrip, ToolbarMetrics } from './toolbar-resize.type';

const crossed = (candidates: readonly ToolbarCornerCandidate[], over: number): number => {
  let count = 0;
  let reached = 0;
  for (const { thickness } of candidates) {
    if (over <= reached + thickness / 2) break;
    reached += thickness;
    count += 1;
  }
  return count;
};

const takeToolbarCorner = (origin: ToolbarLayout, metrics: ToolbarMetrics, grip: ToolbarGrip, px: number): ToolbarLayout => {
  const layout = normalizeCorners(origin);
  const lane = toolbarLaneMetrics(layout, metrics, grip.id);
  if (!lane) return origin;
  const start = grip.end === 'start';
  const over = start ? -px : px - lane.span;
  const onEdge = lane.index === (start ? 0 : lane.places.length - 1);
  if (!onEdge || !(over > 0)) return origin;
  const scene = toolbarCornerCandidates(layout, metrics, { side: lane.side, lane: lane.lane, end: grip.end });
  if (!scene) return origin;
  for (let count = crossed(scene.candidates, over); count >= 1; count -= 1) {
    const next = applyToolbarTake(scene, metrics, count, px);
    if (next) return next;
  }
  return origin;
};

export { takeToolbarCorner };
