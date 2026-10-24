/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { MenuHover } from '../DropdownMenu.type';
import type { MenuColumns } from '../behavior/menu-columns.type';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface MenuPanelProps {
  id?: string;
  label?: string;
  start: MenuFocusStart;
  columns: MenuColumns;
  menuRef?: RefObject<HTMLElement | null>;
  hover?: MenuHover;
  onBack?: () => void;
  onExit?: () => void;
  onTop?: () => void;
  onType?: () => void;
  children: ReactNode;
}

export type { MenuPanelProps };
