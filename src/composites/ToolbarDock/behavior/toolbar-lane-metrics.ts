/* @layer renderer-components @kind logic */
import { MIN_BAR_PX } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarLaneMetrics } from './toolbar-lane-metrics.type';
import { toolbarPlaceOf } from './toolbar-place-of';
import type { ToolbarMetrics } from './toolbar-resize.type';

const toolbarLaneMetrics = (layout: ToolbarLayout, metrics: ToolbarMetrics, id: string): ToolbarLaneMetrics | null => {
  const found = toolbarPlaceOf(layout, id);
  if (!found) return null;
  const places = layout.sides[found.side][found.lane] ?? [];
  const span = metrics.spans[found.side][found.lane] ?? 0;
  if (!(span > 0)) return null;
  return { side: found.side, lane: found.lane, places, index: places.indexOf(found.place), span, minShare: Math.min(MIN_BAR_PX / span, 1) };
};

export { toolbarLaneMetrics };
