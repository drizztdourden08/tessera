/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { showToolbar } from './show-toolbar';

const canShowToolbar = (layout: ToolbarLayout, id: string, defs: readonly ToolbarDefinition[]): boolean =>
  showToolbar(layout, id, defs) !== layout;

export { canShowToolbar };
