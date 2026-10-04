/* @layer renderer-components @kind logic */
import { MENU_ROOM } from '../Widget.constants';

const fitsSubMenus = (trigger: DOMRect, viewWidth: number): boolean =>
  trigger.right >= 2 * MENU_ROOM || viewWidth - trigger.right >= MENU_ROOM;

export { fitsSubMenus };
