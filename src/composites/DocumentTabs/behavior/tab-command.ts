/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import { isMenuKey } from '../../../primitives/dom/is-menu-key';
import type { TabKeysInput } from '../DocumentTabs.type';
import { closeChord } from './close-chord';

const tabCommand = (event: KeyboardEvent<HTMLElement>, key: string, { close, menu }: Pick<TabKeysInput, 'close' | 'menu'>): boolean => {
  if (menu && isMenuKey(event)) {
    event.preventDefault();
    menu(key, event);
    return true;
  }
  if (!closeChord(event)) return false;
  event.preventDefault();
  close(key);
  return true;
};

export { tabCommand };
