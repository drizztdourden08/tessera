/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';

type TabBadgeTone = 'neutral' | 'warn' | 'danger' | 'success' | 'info';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  badgeTone?: TabBadgeTone;
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
  TabBadgeTone,
  TabItem,
  TabLabels,
  TabsProps,
  TabsTabProps,
};
