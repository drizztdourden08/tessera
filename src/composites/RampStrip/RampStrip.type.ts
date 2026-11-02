/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';

type RampSize = 'sm' | 'md' | 'preview';

interface RampStep {
  color: string;
  caption?: ReactNode;
  label?: string;
  unused?: boolean;
  disabled?: boolean;
}

interface RampStripProps {
  steps: readonly RampStep[];
  value: number | null;
  onChange: (index: number) => void;
  'aria-label': string;
  size?: RampSize;
  numbered?: boolean;
  className?: string;
}

interface RampStripInput {
  steps: readonly RampStep[];
  value: number | null;
  onChange: (index: number) => void;
}

interface RampStripControl {
  rootRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  tabStop: number | null;
  onFocusStep: (index: number) => void;
}

export type { RampSize, RampStep, RampStripControl, RampStripInput, RampStripProps };
