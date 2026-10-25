/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { mirrorToolbarLane } from './mirror-toolbar-lane';
import { toolbarEndBounds } from './toolbar-end-bounds';
import { toolbarLaneMetrics } from './toolbar-lane-metrics';
import type { ToolbarEnd, ToolbarEndRange, ToolbarMetrics } from './toolbar-resize.type';

const toolbarEndRange = (layout: ToolbarLayout, metrics: ToolbarMetrics, id: string, end: ToolbarEnd): ToolbarEndRange | null => {
  const lane = toolbarLaneMetrics(layout, metrics, id);
  if (!lane) return null;
  const { places, index, span, minShare } = lane;
  if (end === 'end') {
    const bounds = toolbarEndBounds(places, index, minShare);
    return bounds && { value: bounds.value * span, min: bounds.lo * span, max: bounds.hi * span, span };
  }
  const bounds = toolbarEndBounds(mirrorToolbarLane(places), places.length - 1 - index, minShare);
  return bounds && { value: (1 - bounds.value) * span, min: (1 - bounds.hi) * span, max: (1 - bounds.lo) * span, span };
};

export { toolbarEndRange };
