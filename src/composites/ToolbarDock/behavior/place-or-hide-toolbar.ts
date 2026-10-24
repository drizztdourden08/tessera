/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { placeToolbar } from './place-toolbar';

const placeOrHideToolbar = (layout: ToolbarLayout, def: ToolbarDefinition): ToolbarLayout => {
  const shown = def.hiddenByDefault ? null : placeToolbar(layout, def.id, def);
  return shown ?? { ...layout, hidden: [...layout.hidden, def.id] };
};

export { placeOrHideToolbar };
