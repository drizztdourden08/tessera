/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type SectionNavVariant = 'panel' | 'rail';

interface SectionNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
}

interface SectionNavGroup {
  id: string;
  label?: string;
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
  variant?: SectionNavVariant;
  collapsed?: boolean;
  overlay?: boolean;
  ariaLabel?: string;
  className?: string;
}

export type { SectionNavConfig, SectionNavGroup, SectionNavItem, SectionNavProps, SectionNavSearch, SectionNavVariant };
