/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GridHeights, GridLayout } from './grid-layout.type';

interface GridScrollInput {
  rootRef: RefObject<HTMLElement | null>;
  layout: GridLayout;
  heights: GridHeights;
  onScroll: () => void;
}

export type { GridScrollInput };
