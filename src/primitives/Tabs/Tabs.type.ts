/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  disabledReason?: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  iconOnly?: boolean;
  hideZero?: boolean;
}

interface TabLabels {
  reason?: string;
  title?: string;
  name?: string;
}

interface TabsTabProps {
  tab: TabItem;
  active: boolean;
  iconOnly: boolean;
  hideZero: boolean;
  onTabChange: (tabId: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export type {
  TabItem,
  TabLabels,
  TabsProps,
  TabsTabProps,
};
