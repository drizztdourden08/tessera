/* @layer renderer-components @kind util */
import type { ToolbarMenuSide } from '../../Toolbar/Toolbar.type';
import type { ToolbarSide } from '../ToolbarDock.type';

const toolbarMenuSide = (side: ToolbarSide): ToolbarMenuSide => (side === 'right' ? 'left' : 'right');

export { toolbarMenuSide };
