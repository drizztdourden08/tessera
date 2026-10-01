/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  iconOnly?: boolean;
}

interface TabsPagerProps {
  side: 'back' | 'forward';
  label: string;
  onPage: () => void;
}

export type {
  TabItem,
  TabsPagerProps,
  TabsProps,
};
