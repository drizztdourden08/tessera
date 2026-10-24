/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { MenuHover } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarIcon, ToolbarItemBase } from '../Toolbar.type';

interface ToolbarToolButtonProps {
  anchorRef: RefObject<HTMLButtonElement | null>;
  stopId: string;
  icon: ToolbarIcon;
  label: string;
  caption?: string;
  active: boolean;
  disabled?: boolean;
  shortcut?: ToolbarItemBase['shortcut'];
  menu: boolean;
  open: boolean;
  popup: boolean;
  hover: Partial<MenuHover>;
  onClick?: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export type { ToolbarToolButtonProps };
