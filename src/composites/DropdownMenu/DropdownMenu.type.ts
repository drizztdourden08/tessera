/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

interface MenuItem {
  key: string;
  icon?: ReactNode;
  label: string;
  description?: string;
  disabled?: boolean;
  checked?: boolean;
  onClick?: () => void;
  children?: MenuItem[];
}

type MenuEntry = MenuItem | 'separator';

type MenuSide = 'below' | 'above';

type MenuAlign = 'start' | 'end';

interface DropdownMenuProps {
  items: MenuEntry[];
  anchorRef?: RefObject<HTMLElement | null>;
  side?: MenuSide;
  align?: MenuAlign;
}

export type { DropdownMenuProps, MenuAlign, MenuEntry, MenuItem, MenuSide };
