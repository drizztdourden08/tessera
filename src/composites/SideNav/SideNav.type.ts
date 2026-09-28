/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SideNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface SideNavGroup {
  title?: string;
  id?: string;
  items: SideNavItem[];
}

interface SideNavProps {
  groups: SideNavGroup[];
  activeId: string;
  onSelect: (id: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  header?: ReactNode;
  query?: string;
  onQueryChange?: (value: string) => void;
}

export type { SideNavItem, SideNavGroup, SideNavProps };
