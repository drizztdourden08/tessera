/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { CollapseToggleSide } from '../CollapseToggle/CollapseToggle.type';

interface PaneRailLabel {
  label: string;
  side: CollapseToggleSide;
  onUnfold: () => void;
  actions?: ReactNode;
  content?: ReactNode;
}

interface PaneRailProps {
  rail?: PaneRailLabel;
  className?: string;
  children?: ReactNode;
}

export type { PaneRailLabel, PaneRailProps };
