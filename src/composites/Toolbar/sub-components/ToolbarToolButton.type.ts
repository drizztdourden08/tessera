/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { MenuHover } from '../../DropdownMenu/DropdownMenu.type';
import type { HoldHandlers } from '../behavior/useHoldOpen.type';
import type { ToolbarBadge, ToolbarContextEvent, ToolbarIcon, ToolbarItemBase } from '../Toolbar.type';

interface ToolbarToolButtonProps {
  anchorRef: RefObject<HTMLButtonElement | null>;
  stopId: string;
  icon: ToolbarIcon;
  label: string;
  caption?: string;
  description?: string;
  active: boolean;
  disabled?: boolean;
  shortcut?: ToolbarItemBase['shortcut'];
  menu: boolean;
  open: boolean;
  popup: boolean;
  panel: boolean;
  hover: Partial<MenuHover>;
  hold: Partial<HoldHandlers>;
  badge?: ToolbarBadge;
  borrowed?: boolean;
  onClick?: () => void;
  onContextMenu?: (event: ToolbarContextEvent) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export type { ToolbarToolButtonProps };
