/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarKeyPick } from './toolbar-key.type';
import { toolbarSideOf } from './toolbar-side-of';

const toolbarKeyStart = (layout: ToolbarLayout, id: string): ToolbarKeyPick => {
  const side = toolbarSideOf(layout, id);
  if (side === null) return { kind: 'basket' };
  return { kind: 'lane', side, index: layout.sides[side].indexOf(id) };
};

export { toolbarKeyStart };
