/* @layer renderer-components @kind logic */
import { SHARE_EPSILON } from '../ToolbarDock.constants';
import type { ToolbarPlace } from '../ToolbarDock.type';

const toolbarLaneSlots = (places: readonly ToolbarPlace[], keep?: number): number[] => {
  if (places.length === 0) return [0];
  const found = [0, ...places.map((place) => place.start + place.size), 1];
  if (keep !== undefined) found.push(keep);
  const sorted = found.map((at) => Math.min(Math.max(at, 0), 1)).sort((a, b) => a - b);
  return sorted.filter((at, index) => index === 0 || at - (sorted[index - 1] ?? 0) > SHARE_EPSILON);
};

export { toolbarLaneSlots };
