/* @layer renderer-components @kind logic */
import { SHARE_EPSILON } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide, ToolbarSpot } from '../ToolbarDock.type';
import { toolbarPlaceOf } from './toolbar-place-of';

const isFull = (spot: ToolbarSpot): boolean => Math.abs(spot.start) < SHARE_EPSILON && Math.abs(spot.size - 1) < SHARE_EPSILON;

const isAt = (spot: ToolbarSpot, side: ToolbarSide, lane: number): boolean => spot.side === side && spot.lane === lane && isFull(spot);

const isToolbarSpotKept = (layout: ToolbarLayout, id: string, side: ToolbarSide, lane: number): boolean => {
  const found = toolbarPlaceOf(layout, id);
  const kept = layout.last[id];
  if (!found || !kept) return false;
  const alone = layout.sides[side][lane]?.length === 1;
  return alone && isAt({ side: found.side, lane: found.lane, ...found.place }, side, lane) && isAt(kept, side, lane);
};

export { isToolbarSpotKept };
