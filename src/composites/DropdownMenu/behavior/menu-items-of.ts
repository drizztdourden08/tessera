/* @layer renderer-components @kind util */
import { MENU_ITEM_SELECTOR, MENU_SELECTOR } from './menu-items-of.constants';

const menuItemsOf = (menu: HTMLElement): (HTMLButtonElement | HTMLInputElement)[] =>
  Array.from(menu.querySelectorAll<HTMLButtonElement | HTMLInputElement>(MENU_ITEM_SELECTOR))
    .filter((item) => item.closest(MENU_SELECTOR) === menu && !item.disabled);

export { menuItemsOf };
