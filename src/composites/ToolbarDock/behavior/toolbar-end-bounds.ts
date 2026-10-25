/* @layer renderer-components @kind logic */
import type { ToolbarPlace } from '../ToolbarDock.type';
import type { ToolbarEndBounds } from './toolbar-resize.type';

const toolbarEndBounds = (places: readonly ToolbarPlace[], index: number, minShare: number): ToolbarEndBounds | null => {
  const place = places[index];
  if (!place) return null;
  const value = place.start + place.size;
  const following = places.slice(index + 1).reduce((sum, next) => sum + next.size, 0);
  return { value, lo: Math.min(place.start + minShare, value), hi: Math.max(1 - following, value) };
};

export { toolbarEndBounds };
