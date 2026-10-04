/* @layer renderer-components @kind types */
import type { IconName } from '../Icon/Icon.type';
import type { MouseButton, ShortcutKeys, ShortcutSize } from '../Shortcut/Shortcut.type';

interface ShortcutGesture {
  icon: IconName;
  label: string;
}

interface ShortcutListItem {
  description: string;
  keys?: ShortcutKeys;
  mouse?: MouseButton;
  gesture?: ShortcutGesture;
}

interface ShortcutListGroup {
  label?: string;
  items: readonly ShortcutListItem[];
}

interface ShortcutListBase {
  size?: ShortcutSize;
  label?: string;
  className?: string;
}

type ShortcutListProps = ShortcutListBase & ({ items: readonly ShortcutListItem[]; groups?: undefined } | { groups: readonly ShortcutListGroup[]; items?: undefined });

interface ShortcutListRowProps {
  item: ShortcutListItem;
  size: ShortcutSize;
}

interface ShortcutGestureCapProps {
  gesture: ShortcutGesture;
  size: ShortcutSize;
}

export type { ShortcutGesture, ShortcutGestureCapProps, ShortcutListGroup, ShortcutListItem, ShortcutListProps, ShortcutListRowProps };
