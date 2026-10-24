/* @layer renderer-components @kind logic */
import { TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarSide } from '../ToolbarDock.type';

const isToolbarSide = (raw: unknown): raw is ToolbarSide => TOOLBAR_SIDES.some((side) => side === raw);

export { isToolbarSide };
