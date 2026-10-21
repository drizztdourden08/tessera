/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../primitives/Title/Title.type';
import type { PanelContainerConfig } from '../PanelContainer/PanelContainer.type';

type SidePanelSide = 'start' | 'end';

interface SidePanelProps {
  title: string;
  containers: PanelContainerConfig[];
  side?: SidePanelSide;
  level?: HeadingLevel;
  showTitle?: boolean;
  action?: ReactNode;
  railItems?: ReactNode[];
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  storageKey?: string;
  className?: string;
}

export type { SidePanelProps, SidePanelSide };
