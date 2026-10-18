/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { HideTimer } from './hide-timer.type';

interface PeekMenuCloseOptions {
  tucked: boolean;
  menuOpen: boolean;
  inside: RefObject<boolean>;
  timer: HideTimer;
  setPeeking: (peeking: boolean) => void;
}

export type { PeekMenuCloseOptions };
