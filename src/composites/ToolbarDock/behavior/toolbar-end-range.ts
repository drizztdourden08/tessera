/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { mirrorToolbarLane } from './mirror-toolbar-lane';
import { normalizeCorners } from './normalize-corners';
import { toolbarCornerCandidates } from './toolbar-corner-candidates';
import { toolbarEndBounds } from './toolbar-end-bounds';
import { toolbarLaneMetrics } from './toolbar-lane-metrics';
import type { ToolbarEnd, ToolbarEndRange, ToolbarMetrics } from './toolbar-resize.type';

const toolbarEndRange = (layout: ToolbarLayout, metrics: ToolbarMetrics, id: string, end: ToolbarEnd): ToolbarEndRange | null => {
  const lane = toolbarLaneMetrics(layout, metrics, id);
  if (!lane) return null;
  const { places, index, span, minShare } = lane;
  const onEdge = index === (end === 'start' ? 0 : places.length - 1);
  const scene = onEdge ? toolbarCornerCandidates(normalizeCorners(layout), metrics, { side: lane.side, lane: lane.lane, end }) : null;
  const reach = scene ? scene.candidates.reduce((sum, candidate) => sum + candidate.thickness, 0) : 0;
  if (end === 'end') {
    const bounds = toolbarEndBounds(places, index, minShare);
    return bounds && { value: bounds.value * span, min: bounds.lo * span, max: bounds.hi * span + reach, span };
  }
  const bounds = toolbarEndBounds(mirrorToolbarLane(places), places.length - 1 - index, minShare);
  return bounds && { value: (1 - bounds.value) * span, min: (1 - bounds.hi) * span - reach, max: (1 - bounds.lo) * span, span };
};

export { toolbarEndRange };
