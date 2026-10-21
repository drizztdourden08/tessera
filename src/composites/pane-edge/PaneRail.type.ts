/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { CollapseToggleSide } from '../CollapseToggle/CollapseToggle.type';
import type { SplitOrientation } from '../SplitPane/SplitPane.type';

interface PaneRailLabel {
  label: string;
  side: CollapseToggleSide;
  orientation?: SplitOrientation;
  onUnfold: () => void;
  action?: ReactNode;
  items?: ReactNode[];
}

interface PaneRailProps {
  rail?: PaneRailLabel;
  className?: string;
  children?: ReactNode;
}

export type { PaneRailLabel, PaneRailProps };
