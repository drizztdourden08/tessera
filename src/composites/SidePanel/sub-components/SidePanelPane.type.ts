/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../primitives/Title/Title.type';
import type { PaneFold } from '../../pane-edge/pane-fold.type';
import type { PanelContainerConfig } from '../../PanelContainer/PanelContainer.type';
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelPaneProps {
  id: string;
  title: string;
  side: SidePanelSide;
  level: HeadingLevel;
  showTitle: boolean;
  action: ReactNode;
  railItems: ReactNode[];
  containers: PanelContainerConfig[];
  fold: PaneFold;
}

export type { SidePanelPaneProps };
