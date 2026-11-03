/* @layer renderer-components @kind types */
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CollapseToggleSide } from '../CollapseToggle/CollapseToggle.type';
import type { SplitOrientation } from '../SplitPane/SplitPane.type';

type PaneRailSize = 'default' | 'slim';

interface PaneRailLabel {
  label: string;
  side: CollapseToggleSide;
  orientation?: SplitOrientation;
  size?: PaneRailSize;
  onUnfold: () => void;
  action?: ReactNode;
  items?: ReactNode[];
}

interface PaneRailProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  rail?: PaneRailLabel;
  children?: ReactNode;
}

export type { PaneRailLabel, PaneRailProps, PaneRailSize };
