/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { MenuColumns } from '../behavior/menu-columns.type';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface MenuPanelProps {
  id?: string;
  label?: string;
  start: MenuFocusStart;
  columns: MenuColumns;
  menuRef?: RefObject<HTMLElement | null>;
  onBack?: () => void;
  onExit?: () => void;
  onTop?: () => void;
  onType?: () => void;
  children: ReactNode;
}

export type { MenuPanelProps };
