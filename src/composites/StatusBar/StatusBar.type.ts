/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuEvent } from '../../primitives/dom/menu-event.type';
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { StatusTone } from '../../primitives/Status/Status.type';

type StatusBarAlign = 'start' | 'end';

interface StatusBarEntry {
  id: string;
  label: ReactNode;
  value: ReactNode;
  icon?: IconName;
  swatch?: string;
  tone?: StatusTone;
  title?: string;
  align?: StatusBarAlign;
  priority?: number;
}

interface StatusBarAction {
  id: string;
  label: string;
  icon: IconName;
  onSelect: () => void;
  loading?: boolean;
  disabled?: boolean;
}

type StatusBarMenuHook = (itemId: string, event: MenuEvent) => void;

interface StatusBarProps {
  items: readonly StatusBarEntry[];
  actions?: readonly StatusBarAction[];
  onItemContextMenu?: StatusBarMenuHook;
  label: string;
  className?: string;
}

export type { StatusBarAction, StatusBarAlign, StatusBarEntry, StatusBarMenuHook, StatusBarProps };
