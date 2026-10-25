/* @layer renderer-components @kind logic */
import { MAX_LANES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarStop } from './toolbar-key.type';
import { toolbarLanesWithout } from './toolbar-lanes-without';

const toolbarSideStops = (layout: ToolbarLayout, id: string, side: ToolbarSide): ToolbarStop[] => {
  const count = toolbarLanesWithout(layout, side, id).length;
  const fresh: ToolbarStop[] = count < MAX_LANES ? Array.from({ length: count + 1 }, (_, index) => ({ lane: 'new', index })) : [];
  const joined: ToolbarStop[] = Array.from({ length: count }, (_, index) => ({ lane: index, index }));
  return [...fresh, ...joined];
};

export { toolbarSideStops };
