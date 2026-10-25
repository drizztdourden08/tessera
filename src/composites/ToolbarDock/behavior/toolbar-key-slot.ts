/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarKeyPick, ToolbarKeyResult } from './toolbar-key.type';
import { toolbarPickSlots } from './toolbar-pick-slots';

const toolbarKeyJump = (key: string, slot: number, last: number): number | null => {
  switch (key) {
    case 'PageUp': return Math.max(slot - 1, 0);
    case 'PageDown': return Math.min(slot + 1, last);
    case 'Home': return 0;
    case 'End': return last;
    default: return null;
  }
};

const toolbarKeySlot = (layout: ToolbarLayout, id: string, pick: ToolbarKeyPick, key: string): ToolbarKeyResult | null => {
  if (pick.kind !== 'lane') return null;
  const count = toolbarPickSlots(layout, id, pick.side, pick.lane).length;
  const slot = toolbarKeyJump(key, pick.slot, count - 1);
  if (slot === null) return null;
  return { pick: { ...pick, slot }, note: { kind: 'slot', slot: slot + 1, count }, end: null };
};

export { toolbarKeySlot };
