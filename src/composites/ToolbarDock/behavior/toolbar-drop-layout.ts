/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { hideToolbar } from './hide-toolbar';
import { moveToolbar } from './move-toolbar';
import type { ToolbarDropTarget } from './toolbar-drag.type';

const toolbarDropLayout = (layout: ToolbarLayout, id: string, target: ToolbarDropTarget): ToolbarLayout => {
  if (target.kind === 'lane') return moveToolbar(layout, id, target.side, target.index);
  if (target.kind === 'basket') return hideToolbar(layout, id);
  return layout;
};

export { toolbarDropLayout };
