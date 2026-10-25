/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { ToolbarPlace } from '../ToolbarDock.type';
import { toolbarEndBounds } from './toolbar-end-bounds';

const moveToolbarEnd = (places: readonly ToolbarPlace[], index: number, share: number, minShare: number): ToolbarPlace[] => {
  const bounds = toolbarEndBounds(places, index, minShare);
  if (!bounds) return [...places];
  let cursor = clampNumber(share, bounds.lo, bounds.hi);
  return places.map((place, at) => {
    if (at < index) return place;
    if (at === index) return { ...place, size: cursor - place.start };
    const start = Math.max(place.start, cursor);
    cursor = start + place.size;
    return start === place.start ? place : { ...place, start };
  });
};

export { moveToolbarEnd };
