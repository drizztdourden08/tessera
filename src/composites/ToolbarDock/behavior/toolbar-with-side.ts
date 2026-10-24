/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

const toolbarWithSide = (layout: ToolbarLayout, side: ToolbarSide, ids: string[]): ToolbarLayout => ({
  ...layout,
  sides: { ...layout.sides, [side]: ids },
});

export { toolbarWithSide };
