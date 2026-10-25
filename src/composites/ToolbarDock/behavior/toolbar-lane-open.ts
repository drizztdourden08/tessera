/* @layer renderer-components @kind logic */
import { MAX_LANES } from '../ToolbarDock.constants';
import type { ToolbarPlace } from '../ToolbarDock.type';
import type { ToolbarDropSpot } from './toolbar-drop.type';

const toolbarLaneOpen = (lanes: readonly ToolbarPlace[][], spot: ToolbarDropSpot): ToolbarPlace[] | null => {
  const { lane, index } = spot;
  if (typeof lane === 'number') return lanes[lane] ?? null;
  return lanes.length < MAX_LANES && index <= lanes.length ? [] : null;
};

export { toolbarLaneOpen };
