/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FactsPanelFact {
  label: string;
  value: ReactNode;
  title?: string;
  mono?: boolean;
}

type FactsPanelGroup = readonly FactsPanelFact[];

interface FactsPanelProps {
  groups: readonly FactsPanelGroup[];
  label?: string;
  className?: string;
}

export type { FactsPanelFact, FactsPanelGroup, FactsPanelProps };
