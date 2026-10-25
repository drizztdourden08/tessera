/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { hideToolbar } from './hide-toolbar';
import { isSameToolbarSides } from './is-same-toolbar-sides';
import type { ToolbarDropTarget } from './toolbar-drag.type';

const toolbarDropLayout = (layout: ToolbarLayout, id: string, target: ToolbarDropTarget): ToolbarLayout => {
  if (target.kind === 'lane') return isSameToolbarSides(layout, target.next) ? layout : target.next;
  if (target.kind === 'basket') return hideToolbar(layout, id);
  return layout;
};

export { toolbarDropLayout };
