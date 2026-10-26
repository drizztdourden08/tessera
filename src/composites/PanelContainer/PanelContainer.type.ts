/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../primitives/Title/Title.type';

interface PanelContainerProps {
  title: ReactNode;
  action?: ReactNode;
  level?: HeadingLevel;
  fill?: boolean;
  children: ReactNode;
  className?: string;
}

interface PanelContainerConfig extends Omit<PanelContainerProps, 'children' | 'className'> {
  content: ReactNode;
}

export type { PanelContainerConfig, PanelContainerProps };
