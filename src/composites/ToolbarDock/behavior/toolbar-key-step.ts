/* @layer renderer-components @kind logic */
import { TOOLBAR_ARROW_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarKeyPick, ToolbarKeyResult } from './toolbar-key.type';
import { toolbarKeySlot } from './toolbar-key-slot';
import { toolbarKeyStart } from './toolbar-key-start';
import { toolbarSideStops } from './toolbar-side-stops';

const goToSide = (layout: ToolbarLayout, id: string, pick: ToolbarKeyPick, side: ToolbarSide): ToolbarKeyResult => {
  const stops = toolbarSideStops(layout, id, side);
  const at = pick.kind === 'lane' && pick.side === side ? stops.findIndex((stop) => stop.lane === pick.lane && stop.index === pick.index) : -1;
  const stop = stops[(at + 1) % Math.max(stops.length, 1)];
  if (!stop) return { pick, note: null, end: null };
  return { pick: { kind: 'lane', side, lane: stop.lane, index: stop.index, slot: 0 }, note: { kind: 'place', side, index: stop.index }, end: null };
};

const toolbarKeyStep = (layout: ToolbarLayout, id: string, pick: ToolbarKeyPick, key: string): ToolbarKeyResult | null => {
  const side = TOOLBAR_ARROW_SIDES[key];
  if (side) return goToSide(layout, id, pick, side);
  switch (key) {
    case 'Delete': return { pick: { kind: 'basket' }, note: { kind: 'hide' }, end: null };
    case 'Enter': return { pick, note: null, end: 'drop' };
    case 'Escape': return { pick: toolbarKeyStart(layout, id), note: null, end: 'cancel' };
    default: return toolbarKeySlot(layout, id, pick, key);
  }
};

export { toolbarKeyStep };
