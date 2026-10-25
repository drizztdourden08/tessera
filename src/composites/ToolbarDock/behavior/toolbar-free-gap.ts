/* @layer renderer-components @kind logic */
import { MIN_SHARE, SHARE_EPSILON } from '../ToolbarDock.constants';
import type { ToolbarPlace } from '../ToolbarDock.type';
import type { ToolbarGap } from './toolbar-free-gap.type';

const toolbarFreeGap = (lane: readonly ToolbarPlace[]): ToolbarGap | null => {
  let best: ToolbarGap = { start: 0, size: 0 };
  let cursor = 0;
  for (const place of lane) {
    if (place.start - cursor > best.size) best = { start: cursor, size: place.start - cursor };
    cursor = place.start + place.size;
  }
  if (1 - cursor > best.size) best = { start: cursor, size: 1 - cursor };
  return best.size >= MIN_SHARE - SHARE_EPSILON ? best : null;
};

export { toolbarFreeGap };
