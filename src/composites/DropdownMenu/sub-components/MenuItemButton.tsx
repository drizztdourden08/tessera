/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Pressable } from '../../../primitives/Pressable';
import { ariaKeyShortcuts } from '../behavior/aria-key-shortcuts';
import { MenuContext } from '../behavior/menu-context';
import { menuShortcutKeys } from '../behavior/menu-shortcut-keys';
import { MenuItemBody } from './MenuItemBody';
import { MenuItemTrail } from './MenuItemTrail';
import type { MenuItemButtonProps } from './MenuItemButton.type';

const MenuItemButton = (props: MenuItemButtonProps) => {
  const { item } = props;
  const { close, closeOnSelect } = useContext(MenuContext);
  const checkable = item.checked !== undefined;

  const select = (): void => {
    item.onSelect?.();
    if (closeOnSelect) close();
  };

  return (
    <Pressable
      role={checkable ? 'menuitemcheckbox' : 'menuitem'}
      aria-checked={checkable ? item.checked : undefined}
      aria-keyshortcuts={item.shortcut === undefined ? undefined : ariaKeyShortcuts(menuShortcutKeys(item.shortcut))}
      tabIndex={-1}
      className="dropdown__item focus-ring-inset"
      disabled={item.disabled}
      onClick={select}
    >
      <MenuItemBody item={item} trail={<MenuItemTrail item={item} />} />
    </Pressable>
  );
};

export { MenuItemButton };
