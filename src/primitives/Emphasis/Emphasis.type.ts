/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type EmphasisTrigger = 'hover' | 'active' | 'pulse' | 'loop';

type EmphasisAnchor = 'left' | 'center' | 'right';

type EmphasisOrder = 'anchor' | 'random' | readonly number[];

interface EmphasisProps {
  children: ReactNode;
  trigger?: EmphasisTrigger;
  active?: boolean;
  pulseKey?: string | number;
  from?: number;
  to?: number;
  duration?: number;
  stagger?: number;
  anchor?: EmphasisAnchor;
  order?: EmphasisOrder;
  seed?: number;
  stable?: boolean;
  className?: string;
}

interface ResolvedEmphasis {
  trigger: EmphasisTrigger;
  from: number;
  to: number;
  duration: number;
  stagger: number;
  anchor: EmphasisAnchor;
  order: EmphasisOrder;
  stable: boolean;
  className: string;
}

interface LetterRankInput {
  letters: readonly string[];
  anchor: EmphasisAnchor;
  order: EmphasisOrder;
  seed?: number;
}

export type { EmphasisAnchor, EmphasisOrder, EmphasisProps, EmphasisTrigger, LetterRankInput, ResolvedEmphasis };
