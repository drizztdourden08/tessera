/* @layer renderer-components @kind types */
import type { ReactElement, RefObject } from 'react';
import type { IconifyIcon } from '@iconify/types';
import type { ButtonVariant } from '../../primitives/Button/Button.type';
import type { IconName, IconPath } from '../../primitives/Icon';
import type { DropAlign } from '../../primitives/listbox/drop-placement.type';
import type { ShortcutKey } from '../../primitives/Shortcut';

type MenuItemKind = 'action' | 'check' | 'radio' | 'confirm' | 'slider';

type MenuItemTone = 'danger';

type MenuItemIcon = IconName | IconifyIcon | IconPath | ReactElement;

interface MenuItem {
  id: string;
  label: string;
  icon?: MenuItemIcon;
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
  disabled?: boolean;
  kind?: MenuItemKind;
  tone?: MenuItemTone;
  checked?: boolean;
  confirm?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  onChange?: (value: number) => void;
  children?: readonly MenuNode[];
  onSelect?: () => void;
  onCancel?: () => void;
  onHighlight?: () => void;
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

type MenuSide = 'below' | 'above' | 'right' | 'left';

type MenuAlign = 'start' | 'end';

interface MenuHover {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type MenuVariant = ButtonVariant;

type MenuIntensity = 'strong' | 'medium' | 'subtle';

type MenuSize = 'xs' | 'sm' | 'md';

type MenuIconSide = 'start' | 'end';

type MenuTriggerIcon = MenuItemIcon | 'hamburger';

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
  focusOnOpen?: boolean;
  hover?: MenuHover;
  onClose?: () => void;
}

interface TriggerMenuProps extends MenuBaseProps {
  trigger: MenuTrigger;
  size?: MenuSize;
  align?: DropAlign;
  disabled?: boolean;
  openOnHover?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type DropdownMenuProps = AnchoredMenuProps | TriggerMenuProps;

export type {
  AnchoredMenuProps, DropdownMenuProps, MenuAlign, MenuBaseProps, MenuGroup, MenuHover, MenuIconSide, MenuIntensity, MenuItem, MenuItemIcon, MenuItemKind, MenuItemTone,
  MenuNode, MenuSeparator, MenuSide, MenuSize, MenuTrigger, MenuTriggerIcon, MenuVariant, TriggerMenuProps,
};
