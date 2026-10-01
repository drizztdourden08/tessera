/* @layer renderer-components @kind types */
import type { ReactElement, RefObject } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { ShortcutKey } from '../../primitives/Shortcut';

interface MenuItem {
  id: string;
  label: string;
  icon?: IconName | ReactElement;
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
  disabled?: boolean;
  checked?: boolean;
  children?: readonly MenuNode[];
  onSelect?: () => void;
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

type MenuTrigger = 'hamburger';

interface MenuBaseProps {
  groups: readonly MenuGroup[];
  label?: string;
  closeOnSelect?: boolean;
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
  onOpenChange?: (open: boolean) => void;
}

type DropdownMenuProps = AnchoredMenuProps | TriggerMenuProps;

export type {
  AnchoredMenuProps, DropdownMenuProps, MenuAlign, MenuGroup, MenuItem, MenuNode, MenuSeparator, MenuSide, MenuTrigger,
  TriggerMenuProps,
};
