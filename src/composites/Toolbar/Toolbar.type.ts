/* @layer renderer-components @kind types */
import type { HTMLAttributes, Ref } from 'react';
import type { IconButtonSize } from '../../primitives/IconButton/IconButton.type';
import type { IconName } from '../../primitives/Icon';
import type { ShortcutKey } from '../../primitives/Shortcut';
import type { MenuGroup } from '../DropdownMenu/DropdownMenu.type';

type ToolbarOrientation = 'horizontal' | 'vertical';

interface ToolbarItemBase {
  id: string;
  label: string;
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
  disabled?: boolean;
}

interface ToolbarButton extends ToolbarItemBase {
  kind: 'button';
  icon: IconName;
  caption?: string;
  options?: readonly MenuGroup[];
  onSelect: () => void;
}

interface ToolbarToggle extends ToolbarItemBase {
  kind: 'toggle';
  icon: IconName;
  caption?: string;
  pressed: boolean;
  options?: readonly MenuGroup[];
  onChange: (pressed: boolean) => void;
}

interface ToolbarChoice {
  value: string;
  label: string;
  icon: IconName;
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
  disabled?: boolean;
}

interface ToolbarChoices extends ToolbarItemBase {
  kind: 'group';
  value: string;
  choices: readonly ToolbarChoice[];
  onChange: (value: string) => void;
}

interface ToolbarNumber extends ToolbarItemBase {
  kind: 'number';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

interface ToolbarSeparator {
  kind: 'separator';
  id: string;
}

type ToolbarItem = ToolbarButton | ToolbarToggle | ToolbarChoices | ToolbarNumber | ToolbarSeparator;

type ToolbarHandleProps = HTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> };

interface ToolbarProps {
  items: readonly ToolbarItem[];
  label: string;
  orientation?: ToolbarOrientation;
  size?: IconButtonSize;
  handle?: boolean;
  handleProps?: ToolbarHandleProps;
  className?: string;
}

interface ToolbarSplit {
  shown: readonly ToolbarItem[];
  folded: readonly ToolbarItem[];
}

export type {
  ToolbarButton, ToolbarChoice, ToolbarChoices, ToolbarHandleProps, ToolbarItem, ToolbarItemBase, ToolbarNumber,
  ToolbarOrientation, ToolbarProps, ToolbarSeparator, ToolbarSplit, ToolbarToggle,
};
