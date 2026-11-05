/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface AsideShownParams {
  breakpoint: number;
  onAsideChange?: (shown: boolean) => void;
}

interface AsideShownState {
  ref: RefObject<HTMLDivElement | null>;
  shown: boolean;
}

export type { AsideShownParams, AsideShownState };
