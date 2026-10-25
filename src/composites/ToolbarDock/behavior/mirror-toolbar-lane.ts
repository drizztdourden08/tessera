/* @layer renderer-components @kind logic */
import type { ToolbarPlace } from '../ToolbarDock.type';

const mirrorToolbarLane = (places: readonly ToolbarPlace[]): ToolbarPlace[] =>
  places.map((place) => ({ id: place.id, start: 1 - place.start - place.size, size: place.size })).reverse();

export { mirrorToolbarLane };
