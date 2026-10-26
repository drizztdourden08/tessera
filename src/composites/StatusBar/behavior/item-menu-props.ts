/* @layer renderer-components @kind util */
import { isMenuKey } from '../../../primitives/dom/is-menu-key';
import type { StatusBarMenuHook } from '../StatusBar.type';
import type { ItemMenuProps } from './item-menu-props.type';

const itemMenuProps = (id: string, hook: StatusBarMenuHook | undefined): ItemMenuProps => {
  if (!hook) return {};
  return {
    tabIndex: 0,
    onContextMenu: (event) => hook(id, event),
    onKeyDown: (event) => {
      if (event.target !== event.currentTarget || !isMenuKey(event)) return;
      event.preventDefault();
      hook(id, event);
    },
  };
};

export { itemMenuProps };
