/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { SideNavItem, SideNavSearch } from '../../SideNav';

interface SideNavLayoutBarProps {
  barRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  drawerId: string;
  open: boolean;
  onToggle: () => void;
  search?: SideNavSearch;
  current?: SideNavItem;
}

export type { SideNavLayoutBarProps };
