/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';
import type { RowRange } from '../../data/row-window';

type VirtualSize =
  | 'size-16' | 'size-20' | 'size-24' | 'size-28' | 'size-32' | 'size-40' | 'size-48' | 'size-56' | 'size-64'
  | 'size-80' | 'size-96' | 'size-128' | 'size-160' | 'size-192' | 'size-224' | 'size-256';

interface VirtualMetrics {
  top: number;
  viewport: number;
  rowHeight: number;
  head?: number;
}

type VirtualAxis = 'vertical' | 'horizontal';

type ScrollAlign = 'start' | 'center' | 'end' | 'nearest';

interface SpanInput {
  top: number;
  height: number;
  viewport: number;
  scrollTop: number;
}

type VirtualMetricsReader = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics) => VirtualMetrics;

type VirtualScrollParent = HTMLElement | RefObject<HTMLElement | null> | 'auto';

interface ScrollParentInput {
  option: VirtualScrollParent | undefined;
  rootRef: RefObject<HTMLElement | null>;
  scrollerRef: RefObject<HTMLElement | null>;
  onChange: () => void;
}

interface VirtualWindowInput {
  enabled: boolean;
  count: number;
  keyAt: (index: number) => string | undefined;
  rootRef: RefObject<HTMLElement | null>;
  indexAttribute: string;
  overscan?: number;
  sizeKey?: string;
  readMetrics?: VirtualMetricsReader;
  rangeOf?: (metrics: VirtualMetrics, overscan: number) => RowRange;
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
  axis?: VirtualAxis;
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

export type {
  ScrollAlign, ScrollParentInput, ShowInput, SpanInput, VirtualAxis, VirtualFocusModel, VirtualItemsInput, VirtualMetrics, VirtualMetricsReader, VirtualScrollParent, VirtualSize, VirtualWindow, VirtualWindowInput,
};
