/* @layer renderer-components @kind types */
import type { HTMLAttributes, Ref } from 'react';
import type { IconButtonSize } from '../../primitives/IconButton/IconButton.type';
import type { SegmentIcon } from '../../primitives/SegmentedControl';
import type { ShortcutKey } from '../../primitives/Shortcut';
import type { MenuGroup } from '../DropdownMenu/DropdownMenu.type';

type ToolbarIcon = SegmentIcon;

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
  icon: ToolbarIcon;
  caption?: string;
  options?: readonly MenuGroup[];
  onSelect: () => void;
}

interface ToolbarToggle extends ToolbarItemBase {
  kind: 'toggle';
  icon: ToolbarIcon;
  caption?: string;
  pressed: boolean;
  options?: readonly MenuGroup[];
  onChange: (pressed: boolean) => void;
}

interface ToolbarChoice {
  value: string;
  label: string;
  icon: ToolbarIcon;
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
  ToolbarButton, ToolbarChoice, ToolbarChoices, ToolbarHandleProps, ToolbarIcon, ToolbarItem, ToolbarItemBase, ToolbarNumber,
  ToolbarOrientation, ToolbarProps, ToolbarSeparator, ToolbarSplit, ToolbarToggle,
};
