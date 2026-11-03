/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';

type OutcomeKind = 'pass' | 'fail' | 'partial' | 'blocked' | 'skip' | 'pending' | 'current';

type OutcomeSize = 'xs' | 'sm';

interface OutcomeStep {
  id: string;
  outcome: OutcomeKind;
  label: string;
}

interface OutcomeStripProps {
  steps: readonly OutcomeStep[];
  onSelect?: (id: string) => void;
  size?: OutcomeSize;
  'aria-label'?: string;
  className?: string;
}

interface OutcomeStripControl {
  rootRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  tabStop: number;
  onFocusCell: (index: number) => void;
}

export type { OutcomeKind, OutcomeSize, OutcomeStep, OutcomeStripControl, OutcomeStripProps };
