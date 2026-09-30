/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeaderTabItem } from '../HeaderTabs';

interface SettingsPageAnchor {
  id: string;
  label: string;
}

interface SettingsPageTabs {
  items: readonly HeaderTabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

interface SettingsPageProps {
  icon: ReactNode;
  title: string;
  backdrop?: ReactNode;
  anchors?: readonly SettingsPageAnchor[];
  tabs?: SettingsPageTabs;
  scroll?: boolean;
  compact?: boolean;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export type { SettingsPageAnchor, SettingsPageProps, SettingsPageTabs };
