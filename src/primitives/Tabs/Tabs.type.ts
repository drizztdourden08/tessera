/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';
import type { SelectedTone } from '../field-control/selected-tone.type';

type TabBadgeTone = 'neutral' | 'warn' | 'danger' | 'success' | 'info';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  badgeTone?: TabBadgeTone;
  badgeTitle?: string;
  disabled?: boolean;
  disabledReason?: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  iconOnly?: boolean;
  hideZero?: boolean;
  size?: 'md' | 'lg';
  selectedTone?: SelectedTone;
}

interface TabLabels {
  description?: string;
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
