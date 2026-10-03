/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import { focusMenuItem } from './focus-menu-item';
import { menuItemsOf } from './menu-items-of';

const filterKey = (event: KeyboardEvent<HTMLInputElement>, menu: HTMLElement, value: string, onExit: () => void): boolean => {
  switch (event.key) {
    case 'ArrowDown':
      focusMenuItem(menu, 'first');
      return true;
    case 'ArrowUp':
      focusMenuItem(menu, 'last');
      return true;
    case 'Enter':
      menuItemsOf(menu)[0]?.click();
      return true;
    case 'Escape':
      if (value !== '') return false;
      onExit();
      return true;
    case 'Tab':
      onExit();
      return false;
    default:
      return false;
  }
};

export { filterKey };
