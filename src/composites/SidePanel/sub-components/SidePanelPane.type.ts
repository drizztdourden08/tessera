/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../primitives/Title/Title.type';
import type { PaneFold } from '../../pane-edge/pane-fold.type';
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelPaneProps {
  id: string;
  title: string;
  side: SidePanelSide;
  level: HeadingLevel;
  actions: ReactNode;
  rail: ReactNode;
  fold: PaneFold;
  children: ReactNode;
}

export type { SidePanelPaneProps };
