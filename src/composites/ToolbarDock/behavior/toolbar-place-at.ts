/* @layer renderer-components @kind logic */
import { MIN_BAR_PX } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarPlace } from '../ToolbarDock.type';
import { insertToolbarLane } from './insert-toolbar-lane';
import { toolbarDropLaneValue } from './toolbar-drop-lane-value';
import { toolbarDropSize } from './toolbar-drop-size';
import type { ToolbarDropSpot, ToolbarPlacement } from './toolbar-drop.type';
import { toolbarLaneInsert } from './toolbar-lane-insert';
import { toolbarLaneOpen } from './toolbar-lane-open';
import { toolbarPlaceOf } from './toolbar-place-of';
import type { ToolbarMetrics } from './toolbar-resize.type';
import { toolbarWithLanes } from './toolbar-with-lanes';
import { toolbarWithout } from './toolbar-without';

const withPlaces = (without: ToolbarLayout, spot: ToolbarDropSpot, places: ToolbarPlace[]): ToolbarLayout => {
  const { side, lane, index } = spot;
  if (typeof lane !== 'number') return insertToolbarLane(without, side, index, places);
  return toolbarWithLanes(without, side, without.sides[side].map((current, position) => (position === lane ? places : current)));
};

const toolbarPlaceAt = (layout: ToolbarLayout, metrics: ToolbarMetrics, id: string, spot: ToolbarDropSpot): ToolbarPlacement | null => {
  const found = toolbarPlaceOf(layout, id);
  if (!found) return null;
  const { side, lane, index, at } = spot;
  const without = toolbarWithout(layout, id);
  const others = toolbarLaneOpen(without.sides[side], spot);
  const span = toolbarDropLaneValue(layout, id, spot, metrics.spans[side]) ?? 0;
  const size = others && span > 0 ? toolbarDropSize(found.place, metrics.spans[found.side][found.lane] ?? 0, span, others) : null;
  if (!others || size === null) return null;
  const fit = toolbarLaneInsert(others, { id, start: at, size }, Math.min(MIN_BAR_PX / span, 1));
  const target = typeof lane === 'number' ? lane : index;
  const placed = withPlaces(without, spot, fit.places);
  const next = { ...placed, last: { ...layout.last, [id]: { side, lane: target, start: fit.start, size } } };
  return { layout: next, lane: target, start: fit.start, size, span };
};

export { toolbarPlaceAt };
