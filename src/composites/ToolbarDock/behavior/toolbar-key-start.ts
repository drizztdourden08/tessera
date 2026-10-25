/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarKeyPick } from './toolbar-key.type';
import { toolbarPickSlots } from './toolbar-pick-slots';
import { toolbarPlaceOf } from './toolbar-place-of';

const toolbarKeyStart = (layout: ToolbarLayout, id: string): ToolbarKeyPick => {
  const found = toolbarPlaceOf(layout, id);
  if (found === null) return { kind: 'basket' };
  const { side, lane, place } = found;
  if ((layout.sides[side][lane]?.length ?? 0) <= 1) return { kind: 'lane', side, lane: 'new', index: lane, slot: 0 };
  const slots = toolbarPickSlots(layout, id, side, lane);
  const slot = Math.max(0, slots.findIndex((at) => Math.abs(at - place.start) < 1e-9));
  return { kind: 'lane', side, lane, index: lane, slot };
};

export { toolbarKeyStart };
