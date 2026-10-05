/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface ListCollapse {
  collapsed: boolean;
  toggleRef: RefObject<HTMLButtonElement | null>;
  toggle: () => void;
  collapse: (() => void) | undefined;
}

export type { ListCollapse };
