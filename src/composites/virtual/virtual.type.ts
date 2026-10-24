/* @layer renderer-components @kind types */
import type { FocusEvent, RefObject } from 'react';

interface VisibleRangeInput {
  scrollTop: number;
  viewport: number;
  rowHeight: number;
  count: number;
  overscan: number;
}

interface RowRange {
  start: number;
  end: number;
}

interface VirtualMetrics {
  top: number;
  viewport: number;
  rowHeight: number;
}

interface VirtualWindowInput {
  enabled: boolean;
  count: number;
  keyAt: (index: number) => string | undefined;
  rootRef: RefObject<HTMLElement | null>;
  indexAttribute: string;
  overscan?: number;
}

interface VirtualWindow {
  indices: readonly number[];
  metrics: VirtualMetrics;
  bodyRef: RefObject<HTMLElement | null>;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
}

interface ShowInput {
  index: number;
  rowHeight: number;
  viewport: number;
  scrollTop: number;
}

export type { RowRange, ShowInput, VirtualMetrics, VirtualWindow, VirtualWindowInput, VisibleRangeInput };
