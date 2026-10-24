/* @layer renderer-components @kind logic */
import { MAX_PER_SIDE, TOOLBAR_ARROW_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarKeyPick, ToolbarKeyResult } from './toolbar-key.type';
import { toolbarKeyStart } from './toolbar-key-start';

const goToSide = (layout: ToolbarLayout, id: string, pick: ToolbarKeyPick, side: ToolbarSide): ToolbarKeyResult => {
  const others = layout.sides[side].filter((other) => other !== id).length;
  if (pick.kind === 'lane' && pick.side === side) {
    const index = others > 0 && pick.index === 0 ? 1 : 0;
    return { pick: { kind: 'lane', side, index }, note: { kind: 'place', side, index }, end: null };
  }
  if (others >= MAX_PER_SIDE) return { pick, note: { kind: 'full', side }, end: null };
  return { pick: { kind: 'lane', side, index: 0 }, note: { kind: 'place', side, index: 0 }, end: null };
};

const toolbarKeyStep = (layout: ToolbarLayout, id: string, pick: ToolbarKeyPick, key: string): ToolbarKeyResult | null => {
  const side = TOOLBAR_ARROW_SIDES[key];
  if (side) return goToSide(layout, id, pick, side);
  switch (key) {
    case 'Delete': return { pick: { kind: 'basket' }, note: { kind: 'hide' }, end: null };
    case 'Enter': return { pick, note: null, end: 'drop' };
    case 'Escape': return { pick: toolbarKeyStart(layout, id), note: null, end: 'cancel' };
    default: return null;
  }
};

export { toolbarKeyStep };
