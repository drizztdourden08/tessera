/* @layer renderer-components @kind util */
import type { MouseEvent, RefObject } from 'react';
import { tabOf } from './tab-of';
import type { TabKeysInput } from '../DocumentTabs.type';

const tabContextMenu = (listRef: RefObject<HTMLElement | null>, menu: TabKeysInput['menu']) =>
  (event: MouseEvent<HTMLElement>): void => {
    const key = tabOf(listRef.current, event.target)?.dataset.reorderKey;
    if (menu && key !== undefined) menu(key, event);
  };

export { tabContextMenu };
