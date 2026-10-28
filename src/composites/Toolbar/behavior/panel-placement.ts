/* @layer renderer-components @kind util */
import type { AnchoredPlacement } from '../../../primitives/Anchored';
import type { ToolbarMenuSide, ToolbarOrientation } from '../Toolbar.type';

const panelPlacement = (orientation: ToolbarOrientation, menuSide: ToolbarMenuSide): AnchoredPlacement => {
  if (orientation === 'horizontal') return 'bottom-start';
  return menuSide === 'left' ? 'left-start' : 'right-start';
};

export { panelPlacement };
