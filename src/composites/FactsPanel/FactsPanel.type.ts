/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatRowAlign } from '../../primitives/StatRow';

interface FactsPanelFact {
  label: string;
  value: ReactNode;
  title?: string;
  mono?: boolean;
  copyable?: boolean | string;
}

type FactsPanelGroup = readonly FactsPanelFact[];

type FactsPanelLayout = 'rows' | 'inline' | 'boxed' | 'terms';

interface FactsPanelProps {
  groups: readonly FactsPanelGroup[];
  layout?: FactsPanelLayout;
  align?: StatRowAlign;
  label?: string;
  className?: string;
}

interface FactsPanelGroupProps {
  group: FactsPanelGroup;
  align?: StatRowAlign;
}

interface FactsPanelValueProps {
  fact: FactsPanelFact;
}

export type { FactsPanelFact, FactsPanelGroup, FactsPanelGroupProps, FactsPanelLayout, FactsPanelProps, FactsPanelValueProps };
