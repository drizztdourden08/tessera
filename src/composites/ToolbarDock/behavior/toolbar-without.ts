/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { dropToolbarLane } from './drop-toolbar-lane';
import { toolbarPlaceOf } from './toolbar-place-of';
import { toolbarWithLanes } from './toolbar-with-lanes';

const toolbarWithout = (layout: ToolbarLayout, id: string): ToolbarLayout => {
  const found = toolbarPlaceOf(layout, id);
  if (!found) return layout;
  const { side, lane } = found;
  const lanes = layout.sides[side].map((places, index) => (index === lane ? places.filter((place) => place.id !== id) : places));
  const next = toolbarWithLanes(layout, side, lanes);
  return lanes[lane]?.length === 0 ? dropToolbarLane(next, side, lane) : next;
};

export { toolbarWithout };
