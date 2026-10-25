/* @layer renderer-components @kind logic */
import type { ToolbarPlace } from '../ToolbarDock.type';
import { mirrorToolbarLane } from './mirror-toolbar-lane';
import { moveToolbarEnd } from './move-toolbar-end';
import type { ToolbarLaneFit } from './toolbar-drop.type';

const total = (places: readonly ToolbarPlace[]): number => places.reduce((sum, place) => sum + place.size, 0);

const toolbarLaneInsert = (others: readonly ToolbarPlace[], place: ToolbarPlace, minShare: number): ToolbarLaneFit => {
  const sorted = [...others].sort((a, b) => a.start - b.start);
  const before = sorted.filter((other) => other.start + other.size / 2 < place.start);
  const after = sorted.slice(before.length);
  const start = Math.max(0, Math.min(Math.max(place.start, total(before)), 1 - total(after) - place.size));
  const lane = [...before, { ...place, start }, ...after];
  const pushed = moveToolbarEnd(lane, before.length, start + place.size, minShare);
  const pulled = moveToolbarEnd(mirrorToolbarLane(pushed), pushed.length - 1 - before.length, 1 - start, minShare);
  return { places: mirrorToolbarLane(pulled), start };
};

export { toolbarLaneInsert };
