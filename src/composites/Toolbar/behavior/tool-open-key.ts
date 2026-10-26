/* @layer renderer-components @kind util */
import type { ToolbarMenuSide, ToolbarOrientation } from '../Toolbar.type';

const toolOpenKey = (orientation: ToolbarOrientation, menuSide: ToolbarMenuSide): string => {
  if (orientation === 'horizontal') return 'ArrowDown';
  return menuSide === 'left' ? 'ArrowLeft' : 'ArrowRight';
};

export { toolOpenKey };
