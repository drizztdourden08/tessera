/* @layer renderer-components @kind types */
import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react';
import type { BadgeColor } from '../../primitives/Badge';
import type { IconButtonSize } from '../../primitives/IconButton/IconButton.type';
import type { SegmentIcon } from '../../primitives/SegmentedControl';
import type { ShortcutSpec } from '../../primitives/Shortcut';
import type { MenuGroup } from '../DropdownMenu/DropdownMenu.type';
import type { NumberPresetInput } from '../NumberField';

type ToolbarIcon = SegmentIcon;

type ToolbarOrientation = 'horizontal' | 'vertical';

type ToolbarShape = 'bar' | 'list';

type ToolbarOpenOn = 'hover' | 'click' | 'hold';

type ToolbarChoicesDisplay = 'set' | 'menu' | 'slot';

type ToolbarMenuSide = 'right' | 'left';

type ToolbarColumns = 1 | 2 | 'auto';

type ToolbarContextEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;

interface ToolbarBadge {
  glyph: string;
  description: string;
  color?: BadgeColor;
}

interface ToolbarItemBase {
  id: string;
  label: string;
  description?: string;
  shortcut?: ShortcutSpec;
  disabled?: boolean;
  priority?: number;
  badge?: ToolbarBadge;
  borrowed?: boolean;
  onContextMenu?: (event: ToolbarContextEvent) => void;
}

interface ToolbarOpenTiming {
  holdDelay?: number;
  dwell?: number;
}

interface ToolbarButton extends ToolbarItemBase, ToolbarOpenTiming {
  kind: 'button';
  icon: ToolbarIcon;
  caption?: string;
  options?: readonly MenuGroup[];
  openOn?: ToolbarOpenOn;
  onSelect: () => void;
}

interface ToolbarToggle extends ToolbarItemBase, ToolbarOpenTiming {
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

interface ToolbarChoices extends ToolbarItemBase, ToolbarOpenTiming {
  kind: 'group';
  value: string;
  choices: readonly ToolbarChoice[];
  display?: ToolbarChoicesDisplay;
  openOn?: ToolbarOpenOn;
  pressed?: boolean;
  onPress?: (value: string) => void;
  onChange: (value: string) => void;
}

interface ToolbarNumber extends ToolbarItemBase {
  kind: 'number';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  fineStep?: number;
  ladder?: readonly number[];
  presets?: readonly NumberPresetInput[];
  suffix?: string;
  scrub?: boolean;
  showLabel?: boolean;
  mixed?: boolean;
  onChange: (value: number) => void;
}

interface ToolbarPopover extends ToolbarItemBase {
  kind: 'popover';
  icon: ToolbarIcon;
  caption?: string;
  render: (close: () => void) => ReactNode;
  onFold?: () => void;
}

interface ToolbarSeparator {
  kind: 'separator';
  id: string;
  label?: string;
}

type ToolbarItem = ToolbarButton | ToolbarToggle | ToolbarChoices | ToolbarNumber | ToolbarPopover | ToolbarSeparator;

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
  columns?: ToolbarColumns;
  hiddenItems?: readonly string[];
  keyBadges?: boolean;
  inlineOptions?: boolean;
  onContextMenu?: (itemId: string, event: ToolbarContextEvent) => void;
  className?: string;
}

interface ToolbarSplit {
  shown: readonly ToolbarItem[];
  folded: readonly ToolbarItem[];
}

export type {
  ToolbarBadge, ToolbarButton, ToolbarChoice, ToolbarChoices, ToolbarChoicesDisplay, ToolbarColumns, ToolbarContextEvent, ToolbarHandleProps, ToolbarIcon, ToolbarItem, ToolbarItemBase,
  ToolbarMenuSide, ToolbarNumber, ToolbarOpenOn, ToolbarOrientation, ToolbarPopover, ToolbarProps, ToolbarSeparator, ToolbarShape, ToolbarSplit, ToolbarToggle,
};
