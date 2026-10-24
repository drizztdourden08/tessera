/* @layer renderer-components @kind logic */
import { TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

const toolbarSideOf = (layout: ToolbarLayout, id: string): ToolbarSide | null =>
  TOOLBAR_SIDES.find((side) => layout.sides[side].includes(id)) ?? null;

export { toolbarSideOf };
