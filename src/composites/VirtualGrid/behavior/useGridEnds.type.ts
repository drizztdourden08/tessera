/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface GridEndsInput {
  rootRef: RefObject<HTMLElement | null>;
  items: number;
  onActiveChange?: (index: number) => void;
  onWheelSize?: (direction: 1 | -1) => void;
}

export type { GridEndsInput };
