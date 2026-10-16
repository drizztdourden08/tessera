/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface PaneRailLabel {
  label: string;
  onUnfold: () => void;
  content?: ReactNode;
}

interface PaneRailProps {
  rail?: PaneRailLabel;
  className?: string;
  children?: ReactNode;
}

export type { PaneRailProps };
