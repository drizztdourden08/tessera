/* @layer renderer-components @kind logic */
import { MAX_LANES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide, ToolbarSpot } from '../ToolbarDock.type';
import { insertToolbarLane } from './insert-toolbar-lane';
import { isToolbarSpotKept } from './is-toolbar-spot-kept';
import { toolbarLanesWithout } from './toolbar-lanes-without';
import { toolbarPlaceOf } from './toolbar-place-of';
import { toolbarWithout } from './toolbar-without';

const moveToolbar = (layout: ToolbarLayout, id: string, side: ToolbarSide, index: number): ToolbarLayout => {
  if (!toolbarPlaceOf(layout, id)) return layout;
  const others = toolbarLanesWithout(layout, side, id);
  if (others.length >= MAX_LANES) return layout;
  const lane = Math.max(0, Math.min(Math.trunc(index), others.length));
  if (isToolbarSpotKept(layout, id, side, lane)) return layout;
  const spot: ToolbarSpot = { side, lane, start: 0, size: 1 };
  const emptied = toolbarWithout(layout, id);
  return { ...insertToolbarLane(emptied, side, lane, [{ id, start: 0, size: 1 }]), last: { ...layout.last, [id]: spot } };
};

export { moveToolbar };
