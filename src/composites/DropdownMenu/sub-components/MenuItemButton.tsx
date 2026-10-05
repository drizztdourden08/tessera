/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Pressable } from '../../../primitives/Pressable';
import { Shortcut } from '../../../primitives/Shortcut';
import { ariaKeyShortcuts } from '../behavior/aria-key-shortcuts';
import { closesOnPick } from '../behavior/closes-on-pick';
import { isChoice } from '../behavior/is-choice';
import { ITEM_ROLES } from '../behavior/item-role.constants';
import { itemKind } from '../behavior/item-kind';
import { MenuContext } from '../behavior/menu-context';
import { menuShortcutKeys } from '../behavior/menu-shortcut-keys';
import { useConfirmItem } from '../behavior/useConfirmItem';
import { MenuItemBody } from './MenuItemBody';
import type { MenuItemButtonProps } from './MenuItemButton.type';

const MenuItemButton = (props: MenuItemButtonProps) => {
  const { item, query, path } = props;
  const { close, closeOnSelect } = useContext(MenuContext);
  const kind = itemKind(item);
  const keys = item.shortcut === undefined ? undefined : menuShortcutKeys(item.shortcut);
  const confirm = useConfirmItem(item, kind === 'confirm', () => {
    item.onSelect?.();
    if (closesOnPick(kind, closeOnSelect)) close();
  });

  return (
    <Pressable
      {...confirm.handlers}
      role={ITEM_ROLES[kind]}
      aria-checked={isChoice(kind) ? item.checked === true : undefined}
      aria-keyshortcuts={keys && ariaKeyShortcuts(keys)}
      tabIndex={-1}
      className={`dropdown__item focus-ring-inset${confirm.asking ? ' dropdown__item--asking' : ''}`}
      disabled={item.disabled}
      onClick={confirm.press}
    >
      <MenuItemBody
        item={item}
        query={query}
        path={path}
        ask={confirm.ask}
        asking={confirm.asking}
        end={keys && <Shortcut keys={keys} className="dropdown__shortcut" aria-hidden="true" />}
      />
    </Pressable>
  );
};

export { MenuItemButton };
