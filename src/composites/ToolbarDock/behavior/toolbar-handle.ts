/* @layer renderer-components @kind logic */
import { TOOLBAR_DRAG_ATTRIBUTE } from '../ToolbarDock.constants';
import type { ToolbarDockHandle } from '../ToolbarDock.type';

const toolbarHandle = (id: string, label: string): ToolbarDockHandle => ({ [TOOLBAR_DRAG_ATTRIBUTE]: id, 'aria-label': label });

export { toolbarHandle };
