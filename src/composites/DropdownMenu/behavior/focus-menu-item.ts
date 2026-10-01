/* @layer renderer-components @kind util */
import { menuItemsOf } from './menu-items-of';
import type { MenuFocusStart } from './menu-context.type';

const focusMenuItem = (menu: HTMLElement, start: Exclude<MenuFocusStart, 'none'>): void => {
  const items = menuItemsOf(menu);
  const target = start === 'first' ? items[0] : items.at(-1);
  if (target) target.focus();
  else menu.focus();
};

export { focusMenuItem };
