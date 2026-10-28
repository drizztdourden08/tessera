/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { VirtualMetrics } from '../../virtual';
import type { VirtualFocusInput } from '../../virtual/virtual-focus.type';
import type { GridHeights, GridLayout } from './grid-layout.type';

interface UseGridFocusInput {
  layout: GridLayout;
  heights: GridHeights;
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  metrics: VirtualMetrics;
  onScroll: () => void;
  onMove: VirtualFocusInput['onMove'];
  onActiveChange?: (index: number) => void;
}

export type { UseGridFocusInput };
