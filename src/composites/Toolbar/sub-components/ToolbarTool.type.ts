/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuGroup } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarBadge, ToolbarContextEvent, ToolbarIcon, ToolbarItemBase } from '../Toolbar.type';

interface ToolbarToolProps {
  stopId: string;
  icon: ToolbarIcon;
  label: string;
  tip: ReactNode;
  caption?: string;
  description?: string;
  active?: boolean;
  disabled?: boolean;
  shortcut?: ToolbarItemBase['shortcut'];
  options?: readonly MenuGroup[];
  hoverOpen?: boolean;
  openOnPress?: boolean;
  clickOpen?: boolean;
  holdOpen?: boolean;
  holdDelay?: number;
  dwell?: number;
  badge?: ToolbarBadge;
  borrowed?: boolean;
  render?: (close: () => void) => ReactNode;
  onPress?: () => void;
  onContext?: (event: ToolbarContextEvent) => void;
}

export type { ToolbarToolProps };
