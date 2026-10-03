/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface PanelSectionProps {
  title: string;
  fill?: boolean;
  children: ReactNode;
}

export type { PanelSectionProps };
