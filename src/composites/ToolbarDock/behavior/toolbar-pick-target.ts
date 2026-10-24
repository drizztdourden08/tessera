/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarDropTarget, ToolbarFrame } from './toolbar-drag.type';
import type { ToolbarKeyPick } from './toolbar-key.type';
import { toolbarZones } from './toolbar-zones';

const toolbarPickTarget = (frame: ToolbarFrame, layout: ToolbarLayout, id: string, pick: ToolbarKeyPick): ToolbarDropTarget => {
  if (pick.kind === 'basket') return { kind: 'basket' };
  const zone = toolbarZones(frame, layout, id).find((candidate) => candidate.side === pick.side);
  if (!zone) return { kind: 'none' };
  return { kind: 'lane', side: pick.side, index: pick.index, rect: zone.slots[pick.index] ?? zone.held };
};

export { toolbarPickTarget };
