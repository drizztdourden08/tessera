/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import type { FloatingPlacement } from '../../../primitives/Floating';
import type { MenuAlign, MenuSide } from '../DropdownMenu.type';

const menuPlacement = (anchor: HTMLElement | null, rect: DOMRect, view: Window, place: [side: MenuSide, align: MenuAlign]): FloatingPlacement => {
  const zoom = anchor ? cssZoomOf(anchor) : 1;
  const [side, align] = place;
  return {
    ...(side === 'below' ? { top: rect.bottom / zoom } : { bottom: (view.innerHeight - rect.top) / zoom }),
    ...(align === 'start' ? { left: rect.left / zoom } : { right: (view.innerWidth - rect.right) / zoom }),
  };
};

export { menuPlacement };
