/* @layer renderer-components @kind logic */
import { normalizeCorners } from './normalize-corners';
import { toolbarCornerCandidates } from './toolbar-corner-candidates';
import { toolbarLaneMetrics } from './toolbar-lane-metrics';
import type { ToolbarGrip, ToolbarMetrics } from './toolbar-resize.type';
import type { ToolbarLayout } from '../ToolbarDock.type';

const toolbarCornerReach = (origin: ToolbarLayout, metrics: ToolbarMetrics, grip: ToolbarGrip, count: number): number | null => {
  const layout = normalizeCorners(origin);
  const lane = toolbarLaneMetrics(layout, metrics, grip.id);
  if (!lane) return null;
  const scene = toolbarCornerCandidates(layout, metrics, { side: lane.side, lane: lane.lane, end: grip.end });
  if (!scene || count < 1 || count > scene.candidates.length) return null;
  const sum = scene.candidates.slice(0, count).reduce((total, candidate) => total + candidate.thickness, 0);
  return grip.end === 'start' ? -sum : lane.span + sum;
};

export { toolbarCornerReach };
