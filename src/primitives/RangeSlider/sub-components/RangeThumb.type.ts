/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface RangeThumbProps {
  value: number;
  last: number;
  disabled: boolean;
  onTop: boolean;
  edge: 'start' | 'end';
  ariaLabel?: string;
  valueText?: string;
  onValue: (next: number) => void;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export type { RangeThumbProps };
