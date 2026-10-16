/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../primitives/Title/Title.type';
import type { PaneFold } from '../../pane-fold/pane-fold.type';
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelPaneProps {
  id: string;
  title: string;
  side: SidePanelSide;
  level: HeadingLevel;
  actions: ReactNode;
  collapsible: boolean;
  fold: PaneFold;
  children: ReactNode;
}

export type { SidePanelPaneProps };
