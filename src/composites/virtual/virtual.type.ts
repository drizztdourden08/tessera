/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';

type VirtualSize =
  | 'size-24' | 'size-28' | 'size-32' | 'size-40' | 'size-48' | 'size-56' | 'size-64'
  | 'size-80' | 'size-96' | 'size-128' | 'size-160' | 'size-192' | 'size-224' | 'size-256';

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
  sizeKey?: string;
}

interface VirtualWindow {
  indices: readonly number[];
  metrics: VirtualMetrics;
  bodyRef: RefObject<HTMLElement | null>;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
}

interface VirtualItemsInput<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  overscan?: number;
  sizeKey?: string;
  onActiveChange?: (index: number) => void;
}

interface VirtualFocusModel {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  tabbable: number;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
  activate: (index: number) => void;
  navigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

interface ShowInput {
  index: number;
  rowHeight: number;
  viewport: number;
  scrollTop: number;
}

export type { RowRange, ShowInput, VirtualFocusModel, VirtualItemsInput, VirtualMetrics, VirtualSize, VirtualWindow, VirtualWindowInput, VisibleRangeInput };
