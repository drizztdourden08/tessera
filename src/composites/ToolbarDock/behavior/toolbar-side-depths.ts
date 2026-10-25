/* @layer renderer-components @kind logic */
import { TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarFrame } from './toolbar-drag.type';
import { toolbarLanesWithout } from './toolbar-lanes-without';

const toolbarSideDepths = (frame: ToolbarFrame, layout: ToolbarLayout, id: string): Record<ToolbarSide, number> =>
  Object.fromEntries(
    TOOLBAR_SIDES.map((side) => [side, toolbarLanesWithout(layout, side, id).length * frame.thickness[side]]),
  ) as Record<ToolbarSide, number>;

export { toolbarSideDepths };
