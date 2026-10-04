/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FactsPanelFact {
  label: string;
  value: ReactNode;
  title?: string;
  mono?: boolean;
  copyable?: boolean | string;
}

type FactsPanelGroup = readonly FactsPanelFact[];

type FactsPanelLayout = 'rows' | 'inline' | 'boxed';

interface FactsPanelProps {
  groups: readonly FactsPanelGroup[];
  layout?: FactsPanelLayout;
  label?: string;
  className?: string;
}

export type { FactsPanelFact, FactsPanelGroup, FactsPanelProps };
