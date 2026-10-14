/* @layer renderer-components @kind types */
import type { ScrollPosition } from '../ScrollArea.type';

interface ScrollSyncNode {
  readonly scrollTop: number;
  readonly scrollLeft: number;
  scrollTo: (options: ScrollToOptions) => void;
}

interface ScrollSyncController {
  applyScrollTo: (target: Partial<ScrollPosition>) => void;
  handleScroll: (current: ScrollPosition, onScroll?: (position: ScrollPosition) => void) => void;
}

export type { ScrollSyncController, ScrollSyncNode };
