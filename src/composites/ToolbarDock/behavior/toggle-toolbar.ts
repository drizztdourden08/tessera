/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { hideToolbar } from './hide-toolbar';
import { isToolbarShown } from './is-toolbar-shown';
import { showToolbar } from './show-toolbar';

const toggleToolbar = (layout: ToolbarLayout, id: string, defs: readonly ToolbarDefinition[]): ToolbarLayout =>
  isToolbarShown(layout, id) ? hideToolbar(layout, id) : showToolbar(layout, id, defs);

export { toggleToolbar };
