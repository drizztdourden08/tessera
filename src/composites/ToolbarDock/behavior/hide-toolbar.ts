/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSpot } from '../ToolbarDock.type';
import { toolbarPlaceOf } from './toolbar-place-of';
import { toolbarWithout } from './toolbar-without';

const hideToolbar = (layout: ToolbarLayout, id: string): ToolbarLayout => {
  const found = toolbarPlaceOf(layout, id);
  if (!found) return layout;
  const spot: ToolbarSpot = { side: found.side, lane: found.lane, start: found.place.start, size: found.place.size };
  return { ...toolbarWithout(layout, id), hidden: [...layout.hidden, id], last: { ...layout.last, [id]: spot } };
};

export { hideToolbar };
