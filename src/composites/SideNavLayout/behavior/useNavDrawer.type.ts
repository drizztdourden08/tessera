/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface NavDrawer {
  barRef: RefObject<HTMLDivElement | null>;
  drawerRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  compact: boolean;
  open: boolean;
  toggle: () => void;
  select: (id: string) => void;
}

export type { NavDrawer };
