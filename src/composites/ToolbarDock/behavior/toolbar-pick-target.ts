/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarDropTarget, ToolbarFrame } from './toolbar-drag.type';
import type { ToolbarKeyPick } from './toolbar-key.type';
import { toolbarLaneTarget } from './toolbar-lane-target';
import { toolbarPickSlots } from './toolbar-pick-slots';

const toolbarPickTarget = (frame: ToolbarFrame, layout: ToolbarLayout, id: string, pick: ToolbarKeyPick): ToolbarDropTarget => {
  if (pick.kind === 'basket') return { kind: 'basket' };
  const { side, lane, index, slot } = pick;
  const slots = toolbarPickSlots(layout, id, side, lane);
  const at = slots[Math.min(Math.max(slot, 0), slots.length - 1)] ?? 0;
  return toolbarLaneTarget(frame, layout, id, { side, lane, index, at });
};

export { toolbarPickTarget };
