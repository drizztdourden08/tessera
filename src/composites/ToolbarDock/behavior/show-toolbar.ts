/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { placeToolbar } from './place-toolbar';

const showToolbar = (layout: ToolbarLayout, id: string, defs: readonly ToolbarDefinition[]): ToolbarLayout => {
  if (!layout.hidden.includes(id)) return layout;
  return placeToolbar(layout, id, defs.find((def) => def.id === id)) ?? layout;
};

export { showToolbar };
