/* @layer renderer-components @kind logic */
import { MAX_PER_SIDE } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide, ToolbarSpot } from '../ToolbarDock.type';
import { toolbarInsertedAt } from './toolbar-inserted-at';
import { toolbarSideOf } from './toolbar-side-of';
import { toolbarWithSide } from './toolbar-with-side';

const moveToolbar = (layout: ToolbarLayout, id: string, side: ToolbarSide, index: number): ToolbarLayout => {
  const from = toolbarSideOf(layout, id);
  if (from === null) return layout;
  const others = layout.sides[side].filter((other) => other !== id);
  if (others.length >= MAX_PER_SIDE) return layout;
  const ids = toolbarInsertedAt(others, id, index);
  const spot: ToolbarSpot = { side, index: ids.indexOf(id) };
  const kept = layout.last[id];
  if (from === side && layout.sides[side].indexOf(id) === spot.index && kept?.side === side && kept.index === spot.index) return layout;
  const emptied = from === side ? layout : toolbarWithSide(layout, from, layout.sides[from].filter((other) => other !== id));
  return { ...toolbarWithSide(emptied, side, ids), last: { ...layout.last, [id]: spot } };
};

export { moveToolbar };
