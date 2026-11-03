/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TabItem } from '../../primitives/Tabs';

interface OptionsPanelProps {
  title: string;
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  toolbar?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type { OptionsPanelProps };
