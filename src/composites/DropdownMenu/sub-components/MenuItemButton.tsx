/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Pressable } from '../../../primitives/Pressable';
import { Shortcut } from '../../../primitives/Shortcut';
import { ariaKeyShortcuts } from '../behavior/aria-key-shortcuts';
import { ITEM_ROLES } from '../behavior/item-role.constants';
import { itemKind } from '../behavior/item-kind';
import { MenuContext } from '../behavior/menu-context';
import { menuShortcutKeys } from '../behavior/menu-shortcut-keys';
import { MenuItemBody } from './MenuItemBody';
import type { MenuItemButtonProps } from './MenuItemButton.type';

const MenuItemButton = (props: MenuItemButtonProps) => {
  const { item, query, path } = props;
  const { close, closeOnSelect } = useContext(MenuContext);
  const kind = itemKind(item);
  const keys = item.shortcut === undefined ? undefined : menuShortcutKeys(item.shortcut);

  const select = (): void => {
    item.onSelect?.();
    if (closeOnSelect) close();
  };

  return (
    <Pressable
      role={ITEM_ROLES[kind]}
      aria-checked={kind === 'action' ? undefined : item.checked === true}
      aria-keyshortcuts={keys && ariaKeyShortcuts(keys)}
      tabIndex={-1}
      className="dropdown__item focus-ring-inset"
      disabled={item.disabled}
      onClick={select}
    >
      <MenuItemBody
        item={item}
        query={query}
        path={path}
        end={keys && <Shortcut keys={keys} className="dropdown__shortcut" aria-hidden="true" />}
      />
    </Pressable>
  );
};

export { MenuItemButton };
