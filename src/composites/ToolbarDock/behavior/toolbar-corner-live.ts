/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarCornerSession } from './toolbar-corner.type';
import type { ToolbarGrip } from './toolbar-resize.type';

const toolbarCornerLive = (held: ToolbarCornerSession | null, layout: ToolbarLayout, grip: ToolbarGrip): ToolbarCornerSession | null => {
  if (held?.id !== grip.id || held.end !== grip.end) return null;
  return held.result === layout || JSON.stringify(held.result) === JSON.stringify(layout) ? held : null;
};

export { toolbarCornerLive };
