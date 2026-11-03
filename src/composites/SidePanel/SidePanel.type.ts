/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../primitives/Title/Title.type';
import type { PaneRailSize } from '../pane-edge/PaneRail.type';
import type { PanelContainerConfig } from '../PanelContainer/PanelContainer.type';

type SidePanelSide = 'start' | 'end';
type SidePanelRailSize = PaneRailSize;

interface SidePanelProps {
  title: string;
  containers: PanelContainerConfig[];
  side?: SidePanelSide;
  level?: HeadingLevel;
  showTitle?: boolean;
  action?: ReactNode;
  railItems?: ReactNode[];
  railSize?: SidePanelRailSize;
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

export type { SidePanelProps, SidePanelRailSize, SidePanelSide };
