/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { HideTimer } from './hide-timer.type';

interface PeekZoneOptions {
  tucked: boolean;
  follow: boolean;
  menuOpen: boolean;
  barRef: RefObject<HTMLElement | null>;
  timer: HideTimer;
  setPeeking: (peeking: boolean) => void;
}

export type { PeekZoneOptions };
