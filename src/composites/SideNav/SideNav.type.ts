/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type SideNavVariant = 'panel' | 'rail';

interface SideNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
}

interface SideNavGroup {
  id: string;
  label?: string;
  items: SideNavItem[];
}

interface SideNavConfig {
  home?: SideNavItem;
  groups: SideNavGroup[];
}

interface SideNavSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onFocusChange?: (focused: boolean) => void;
}

interface SideNavProps {
  config: SideNavConfig;
  activeId: string;
  onSelect: (id: string) => void;
  search?: SideNavSearch;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  storageKey?: string;
  variant?: SideNavVariant;
  collapsed?: boolean;
  overlay?: boolean;
  ariaLabel?: string;
  className?: string;
}

export type { SideNavConfig, SideNavGroup, SideNavItem, SideNavProps, SideNavSearch, SideNavVariant };
