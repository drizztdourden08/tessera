/* @layer renderer-components @kind util */
import type { FloatingPlacement } from '../../../primitives/Floating';
import type { MenuAlign, MenuSide } from '../DropdownMenu.type';

const menuPlacement = (rect: DOMRect, view: Window, side: MenuSide, align: MenuAlign): FloatingPlacement => ({
  ...(side === 'below' ? { top: rect.bottom } : { bottom: view.innerHeight - rect.top }),
  ...(align === 'start' ? { left: rect.left } : { right: view.innerWidth - rect.right }),
});

export { menuPlacement };
