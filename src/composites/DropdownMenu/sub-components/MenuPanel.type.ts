/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface MenuPanelProps {
  id?: string;
  label?: string;
  start: MenuFocusStart;
  onBack?: () => void;
  onExit?: () => void;
  children: ReactNode;
}

export type { MenuPanelProps };
