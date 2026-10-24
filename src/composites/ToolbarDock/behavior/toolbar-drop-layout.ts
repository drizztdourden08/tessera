/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { hideToolbar } from './hide-toolbar';
import { moveToolbar } from './move-toolbar';
import type { ToolbarDropTarget } from './toolbar-drag.type';
import { toolbarSideOf } from './toolbar-side-of';

const sameSpot = (layout: ToolbarLayout, id: string, side: ToolbarSide, index: number): boolean => {
  const ids = layout.sides[side];
  return toolbarSideOf(layout, id) === side && ids.indexOf(id) === Math.min(index, ids.length - 1);
};

const toolbarDropLayout = (layout: ToolbarLayout, id: string, target: ToolbarDropTarget): ToolbarLayout => {
  if (target.kind === 'lane') return sameSpot(layout, id, target.side, target.index) ? layout : moveToolbar(layout, id, target.side, target.index);
  if (target.kind === 'basket') return hideToolbar(layout, id);
  return layout;
};

export { toolbarDropLayout };
