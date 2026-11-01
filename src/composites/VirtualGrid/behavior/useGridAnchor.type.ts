/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GridHeights, LayoutRow } from './grid-layout.type';

interface UseGridAnchorInput {
  rootRef: RefObject<HTMLElement | null>;
  rows: readonly LayoutRow[];
  heights: GridHeights;
  onScroll: () => void;
}

export type { UseGridAnchorInput };
