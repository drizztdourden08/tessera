/* @layer renderer-components @kind logic */
import { SHARE_EPSILON } from '../ToolbarDock.constants';
import type { ToolbarPlace } from '../ToolbarDock.type';

const clamped = (place: ToolbarPlace): ToolbarPlace => {
  const size = Math.min(place.size, 1);
  return { id: place.id, start: Math.min(Math.max(place.start, 0), 1 - size), size };
};

const packed = (places: readonly ToolbarPlace[], total: number): ToolbarPlace[] => {
  let cursor = 0;
  return places.map((place) => {
    const size = place.size / total;
    const next = { id: place.id, start: cursor, size };
    cursor += size;
    return next;
  });
};

const fitToolbarLane = (places: readonly ToolbarPlace[]): ToolbarPlace[] => {
  const sorted = places.map(clamped).sort((a, b) => a.start - b.start);
  const total = sorted.reduce((sum, place) => sum + place.size, 0);
  if (total > 1 + SHARE_EPSILON) return packed(sorted, total);
  let cursor = 0;
  const pushed = sorted.map((place) => {
    const start = place.start < cursor - SHARE_EPSILON ? cursor : place.start;
    cursor = start + place.size;
    return { ...place, start };
  });
  let limit = 1;
  const pulled: ToolbarPlace[] = [];
  for (const place of pushed.reverse()) {
    const start = place.start + place.size > limit + SHARE_EPSILON ? Math.max(0, limit - place.size) : place.start;
    pulled.unshift({ ...place, start });
    limit = start;
  }
  return pulled;
};

export { fitToolbarLane };
