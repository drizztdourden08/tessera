/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  iconOnly?: boolean;
}

export type {
  TabItem,
  TabBarProps,
};
