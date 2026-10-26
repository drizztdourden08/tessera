/* @layer renderer-components @kind util */
import type { MenuSide } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarMenuSide, ToolbarOrientation } from '../Toolbar.type';

const toolMenuSide = (orientation: ToolbarOrientation, menuSide: ToolbarMenuSide): MenuSide => (orientation === 'horizontal' ? 'below' : menuSide);

export { toolMenuSide };
