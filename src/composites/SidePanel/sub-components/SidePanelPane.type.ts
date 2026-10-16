/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../primitives/Title/Title.type';
import type { PaneFold } from '../../pane-fold/pane-fold.type';

interface SidePanelPaneProps {
  id: string;
  title: string;
  level: HeadingLevel;
  actions: ReactNode;
  rail: ReactNode;
  fold: PaneFold;
  children: ReactNode;
}

export type { SidePanelPaneProps };
