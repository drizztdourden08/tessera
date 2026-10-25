/* @layer renderer-components @kind logic */
import { MAX_LANES, SHARE_EPSILON, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarDefinition, ToolbarLayout, ToolbarPlace, ToolbarSide, ToolbarSpot } from '../ToolbarDock.type';
import { insertToolbarLane } from './insert-toolbar-lane';
import type { Opening } from './place-toolbar.type';
import { toolbarFreeGap } from './toolbar-free-gap';
import { toolbarWithLanes } from './toolbar-with-lanes';

const isClear = (lane: readonly ToolbarPlace[], start: number, size: number): boolean =>
  lane.every((place) => place.start >= start + size - SHARE_EPSILON || place.start + place.size <= start + SHARE_EPSILON);

const lastOpening = (layout: ToolbarLayout, spot: ToolbarSpot | undefined): Opening | null => {
  if (!spot) return null;
  const { side, start, size } = spot;
  const lanes = layout.sides[side];
  const existing = lanes[spot.lane];
  if (existing && isClear(existing, start, size)) return { side, lane: spot.lane, fresh: false, start, size };
  if (lanes.length >= MAX_LANES) return null;
  return { side, lane: Math.min(spot.lane, lanes.length), fresh: true, start, size };
};

const sideOpening = (layout: ToolbarLayout, side: ToolbarSide, wanted: number | undefined): Opening | null => {
  const lanes = layout.sides[side];
  if (lanes.length < MAX_LANES) return { side, lane: lanes.length, fresh: true, start: 0, size: 1 };
  let best: Opening | null = null;
  for (const [lane, places] of lanes.entries()) {
    const gap = toolbarFreeGap(places);
    if (gap && (best === null || gap.size > best.size)) best = { side, lane, fresh: false, start: gap.start, size: gap.size };
  }
  return best && wanted !== undefined ? { ...best, size: Math.min(best.size, wanted) } : best;
};

const withPlace = (layout: ToolbarLayout, id: string, open: Opening): ToolbarLayout => {
  const place: ToolbarPlace = { id, start: open.start, size: open.size };
  const placed = open.fresh
    ? insertToolbarLane(layout, open.side, open.lane, [place])
    : toolbarWithLanes(layout, open.side, layout.sides[open.side].map((lane, index) => (index === open.lane ? [...lane, place].sort((a, b) => a.start - b.start) : lane)));
  return { ...placed, hidden: layout.hidden.filter((other) => other !== id) };
};

const placeToolbar = (layout: ToolbarLayout, id: string, def: ToolbarDefinition | undefined): ToolbarLayout | null => {
  const last = layout.last[id];
  const recalled = lastOpening(layout, last);
  if (recalled) return withPlace(layout, id, recalled);
  const order = def ? [def.defaultSide, ...TOOLBAR_SIDES] : TOOLBAR_SIDES;
  for (const side of order) {
    const open = sideOpening(layout, side, last?.size);
    if (open) return withPlace(layout, id, open);
  }
  return null;
};

export { placeToolbar };
