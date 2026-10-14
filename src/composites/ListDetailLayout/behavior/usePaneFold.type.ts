/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface PaneFold {
  collapsed: boolean;
  toggleRef: RefObject<HTMLButtonElement | null>;
  toggle: () => void;
  collapse: (() => void) | undefined;
}

export type { PaneFold };
