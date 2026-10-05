/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface CapsLock {
  on: boolean;
  track: (event: KeyboardEvent<HTMLInputElement>) => void;
  clear: () => void;
}

export type { CapsLock };
