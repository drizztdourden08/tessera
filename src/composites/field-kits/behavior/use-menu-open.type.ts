/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface MenuOpenBinding<T extends HTMLElement> {
  anchorRef: RefObject<T | null>;
  open: boolean;
  toggle: () => void;
  close: () => void;
}

export type { MenuOpenBinding };
