/* @layer renderer-components @kind types */
import type { HTMLAttributes, Ref } from 'react';
import type { IconButtonSize } from '../../primitives/IconButton/IconButton.type';
import type { SegmentIcon } from '../../primitives/SegmentedControl';
import type { ShortcutSpec } from '../../primitives/Shortcut';
import type { MenuGroup } from '../DropdownMenu/DropdownMenu.type';

type ToolbarIcon = SegmentIcon;

type ToolbarOrientation = 'horizontal' | 'vertical';

type ToolbarShape = 'bar' | 'list';

type ToolbarOpenOn = 'hover' | 'click';

type ToolbarMenuSide = 'right' | 'left';

interface ToolbarItemBase {
  id: string;
  label: string;
  description?: string;
  shortcut?: ShortcutSpec;
  disabled?: boolean;
}

interface ToolbarButton extends ToolbarItemBase {
  kind: 'button';
  icon: ToolbarIcon;
  caption?: string;
  options?: readonly MenuGroup[];
  openOn?: ToolbarOpenOn;
  onSelect: () => void;
}

interface ToolbarToggle extends ToolbarItemBase {
  kind: 'toggle';
  icon: ToolbarIcon;
  caption?: string;
  pressed: boolean;
  options?: readonly MenuGroup[];
  openOn?: ToolbarOpenOn;
  onChange: (pressed: boolean) => void;
}

interface ToolbarChoice {
  value: string;
  label: string;
  icon: ToolbarIcon;
  description?: string;
  shortcut?: ShortcutSpec;
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
  layout?: ToolbarShape;
  size?: IconButtonSize;
  labels?: boolean;
  handle?: boolean;
  handleProps?: ToolbarHandleProps;
  menuSide?: ToolbarMenuSide;
  className?: string;
}

interface ToolbarSplit {
  shown: readonly ToolbarItem[];
  folded: readonly ToolbarItem[];
}

export type {
  ToolbarButton, ToolbarChoice, ToolbarChoices, ToolbarHandleProps, ToolbarIcon, ToolbarItem, ToolbarItemBase, ToolbarMenuSide, ToolbarShape, ToolbarNumber,
  ToolbarOpenOn, ToolbarOrientation, ToolbarProps, ToolbarSeparator, ToolbarSplit, ToolbarToggle,
};
