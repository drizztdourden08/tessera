/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../primitives/Title/Title.type';

type SidePanelSide = 'start' | 'end';

interface SidePanelProps {
  title: string;
  children: ReactNode;
  side?: SidePanelSide;
  level?: HeadingLevel;
  actions?: ReactNode;
  rail?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  resizable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  storageKey?: string;
  className?: string;
}

export type { SidePanelProps, SidePanelSide };
