/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { MenuNode } from '../DropdownMenu.type';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface SubMenuPanelProps {
  id: string;
  anchorRef: RefObject<HTMLElement | null>;
  label: string;
  start: MenuFocusStart;
  nodes: readonly MenuNode[];
  onBack: () => void;
}

export type { SubMenuPanelProps };
