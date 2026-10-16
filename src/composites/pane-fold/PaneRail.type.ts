/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BoxSurface } from '../../primitives/Box/Box.type';

interface PaneRailLabel {
  label: string;
  onUnfold: () => void;
}

interface PaneRailProps {
  rail?: PaneRailLabel;
  surface?: BoxSurface;
  className?: string;
  children: ReactNode;
}

export type { PaneRailProps };
