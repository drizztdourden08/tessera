/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { IconName } from '../../../primitives/Icon';
import type { MenuHover } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarItemBase } from '../Toolbar.type';

interface ToolbarToolButtonProps {
  anchorRef: RefObject<HTMLButtonElement | null>;
  stopId: string;
  icon: IconName;
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
