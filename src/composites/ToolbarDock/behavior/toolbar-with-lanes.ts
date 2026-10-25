/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';

const toolbarWithLanes = (layout: ToolbarLayout, side: ToolbarSide, lanes: ToolbarPlace[][]): ToolbarLayout => ({
  ...layout,
  sides: { ...layout.sides, [side]: lanes },
});

export { toolbarWithLanes };
