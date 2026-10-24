/* @layer renderer-components @kind logic */
import { MAX_PER_SIDE, TOOLBAR_END, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarDefinition, ToolbarLayout, ToolbarSpot } from '../ToolbarDock.type';
import { toolbarInsertedAt } from './toolbar-inserted-at';
import { toolbarWithSide } from './toolbar-with-side';

const candidates = (layout: ToolbarLayout, id: string, def: ToolbarDefinition | undefined): ToolbarSpot[] => {
  const last = layout.last[id];
  const wanted: ToolbarSpot[] = last ? [last] : [];
  if (def) wanted.push({ side: def.defaultSide, index: TOOLBAR_END });
  const rest = TOOLBAR_SIDES.map((side) => ({ side, index: TOOLBAR_END }));
  return [...wanted, ...rest].filter((spot) => layout.sides[spot.side].length < MAX_PER_SIDE);
};

const placeToolbar = (layout: ToolbarLayout, id: string, def: ToolbarDefinition | undefined): ToolbarLayout | null => {
  const spot = candidates(layout, id, def)[0];
  if (!spot) return null;
  const next = toolbarWithSide(layout, spot.side, toolbarInsertedAt(layout.sides[spot.side], id, spot.index));
  return { ...next, hidden: layout.hidden.filter((other) => other !== id) };
};

export { placeToolbar };
