/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface CaretRange {
  start: number;
  end: number;
  direction: 'forward' | 'backward' | 'none';
}

interface RevealParams {
  revealed: boolean | undefined;
  defaultRevealed: boolean;
  onRevealedChange: ((revealed: boolean) => void) | undefined;
  inputRef: RefObject<HTMLInputElement | null>;
}

interface Reveal {
  shown: boolean;
  toggle: () => void;
  hide: () => void;
}

export type { CaretRange, Reveal, RevealParams };
