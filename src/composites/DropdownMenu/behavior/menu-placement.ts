/* @layer renderer-components @kind util */
import type { AnchoredPlacement } from '../../../primitives/Anchored';
import type { MenuAlign, MenuSide } from '../DropdownMenu.type';

const menuPlacement = (side: MenuSide, align: MenuAlign): AnchoredPlacement => {
  if (side === 'right') return 'right-start';
  if (side === 'left') return 'left-start';
  return `${side === 'below' ? 'bottom' : 'top'}-${align}`;
};

export { menuPlacement };
