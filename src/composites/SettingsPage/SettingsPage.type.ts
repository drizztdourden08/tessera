/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';
import type { HeaderAnchorNavItem } from '../HeaderAnchorNav';

interface SettingsPageAnchor {
  id: string;
  label: string;
}

interface SettingsPageTabs {
  items: readonly HeaderAnchorNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

interface SettingsPageProps {
  icon: ReactNode;
  title: string;
  back?: BackAction;
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
