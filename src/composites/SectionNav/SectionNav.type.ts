/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SectionNavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface SectionNavGroup {
  id: string;
  label: string;
  items: SectionNavItem[];
}

interface SectionNavConfig {
  home?: SectionNavItem;
  groups: SectionNavGroup[];
}

interface SectionNavSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onFocusChange?: (focused: boolean) => void;
}

interface SectionNavProps {
  config: SectionNavConfig;
  activeId: string;
  onSelect: (id: string) => void;
  search?: SectionNavSearch;
  defaultOpen?: boolean;
  className?: string;
}

export type { SectionNavConfig, SectionNavGroup, SectionNavItem, SectionNavProps, SectionNavSearch };
