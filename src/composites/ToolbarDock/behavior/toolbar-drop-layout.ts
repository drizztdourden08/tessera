/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { hideToolbar } from './hide-toolbar';
import { moveToolbar } from './move-toolbar';
import type { ToolbarDropTarget } from './toolbar-drag.type';
import { toolbarPlaceOf } from './toolbar-place-of';

const sameSpot = (layout: ToolbarLayout, id: string, side: ToolbarSide, index: number): boolean => {
  const found = toolbarPlaceOf(layout, id);
  const lanes = layout.sides[side];
  return found !== null && found.side === side && lanes[found.lane]?.length === 1 && found.lane === Math.min(index, lanes.length - 1);
};

const toolbarDropLayout = (layout: ToolbarLayout, id: string, target: ToolbarDropTarget): ToolbarLayout => {
  if (target.kind === 'lane') return sameSpot(layout, id, target.side, target.index) ? layout : moveToolbar(layout, id, target.side, target.index);
  if (target.kind === 'basket') return hideToolbar(layout, id);
  return layout;
};

export { toolbarDropLayout };
