/* @layer stories @kind util */
import type { MenuEvent } from '../../src/primitives/dom/menu-event.type';

const menuNote = (what: string, event: MenuEvent): string => {
  if (event.type === 'contextmenu') {
    event.preventDefault();
    return `Menu for ${what}, from a right click`;
  }
  return `Menu for ${what}, from ${'key' in event ? event.key : 'the keyboard'}`;
};

export { menuNote };
