/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSpot } from '../ToolbarDock.type';
import { toolbarSideOf } from './toolbar-side-of';
import { toolbarWithSide } from './toolbar-with-side';

const hideToolbar = (layout: ToolbarLayout, id: string): ToolbarLayout => {
  const side = toolbarSideOf(layout, id);
  if (side === null) return layout;
  const spot: ToolbarSpot = { side, index: layout.sides[side].indexOf(id) };
  const next = toolbarWithSide(layout, side, layout.sides[side].filter((other) => other !== id));
  return { ...next, hidden: [...layout.hidden, id], last: { ...layout.last, [id]: spot } };
};

export { hideToolbar };
