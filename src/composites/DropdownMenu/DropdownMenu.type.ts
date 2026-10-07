/* @layer renderer-components @kind types */
import type { ReactElement, RefObject } from 'react';
import type { ButtonVariant } from '../../primitives/Button/Button.type';
import type { IconName } from '../../primitives/Icon';
import type { ShortcutKey } from '../../primitives/Shortcut';

type MenuItemKind = 'action' | 'check' | 'radio' | 'confirm';

type MenuItemTone = 'danger';

interface MenuItem {
  id: string;
  label: string;
  icon?: IconName | ReactElement;
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
  disabled?: boolean;
  kind?: MenuItemKind;
  tone?: MenuItemTone;
  checked?: boolean;
  confirm?: string;
  children?: readonly MenuNode[];
  onSelect?: () => void;
  onCancel?: () => void;
}

interface MenuSeparator {
  separator: true;
}

type MenuNode = MenuItem | MenuSeparator;

interface MenuGroup {
  id: string;
  label?: string;
  items: readonly MenuNode[];
}

type MenuSide = 'below' | 'above';

type MenuAlign = 'start' | 'end';

type MenuVariant = ButtonVariant;

type MenuIntensity = 'strong' | 'medium' | 'subtle';

type MenuSize = 'xs' | 'sm' | 'md';

type MenuIconSide = 'start' | 'end';

type MenuTriggerIcon = IconName | ReactElement | 'hamburger';

interface MenuTrigger {
  label: string;
  icon?: MenuTriggerIcon;
  iconSide?: MenuIconSide;
  iconOnly?: boolean;
}

interface MenuBaseProps {
  groups: readonly MenuGroup[];
  label?: string;
  variant?: MenuVariant;
  intensity?: MenuIntensity;
  closeOnSelect?: boolean;
  filter?: boolean;
  filterPlaceholder?: string;
  className?: string;
}

interface AnchoredMenuProps extends MenuBaseProps {
  trigger?: undefined;
  anchorRef?: RefObject<HTMLElement | null>;
  side?: MenuSide;
  align?: MenuAlign;
  inline?: boolean;
  onClose?: () => void;
}

interface TriggerMenuProps extends MenuBaseProps {
  trigger: MenuTrigger;
  size?: MenuSize;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type DropdownMenuProps = AnchoredMenuProps | TriggerMenuProps;

export type {
  AnchoredMenuProps, DropdownMenuProps, MenuAlign, MenuGroup, MenuIconSide, MenuIntensity, MenuItem, MenuItemKind, MenuItemTone, MenuNode,
  MenuSeparator, MenuSide, MenuSize, MenuTrigger, MenuTriggerIcon, MenuVariant, TriggerMenuProps,
};
