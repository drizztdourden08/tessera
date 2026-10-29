/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { SpanInput, VirtualAxis, VirtualMetrics } from './virtual.type';

interface KeyTarget {
  index: number;
  row: number;
}

interface VirtualFocusInput {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  cellAttribute: string;
  metrics: VirtualMetrics;
  onScroll: () => void;
  resolve: (event: KeyboardEvent<HTMLElement>, index: number, page: number) => KeyTarget | undefined;
  spanOf?: (row: number) => Pick<SpanInput, 'top' | 'height'>;
  axis?: VirtualAxis;
  onMove?: (event: KeyboardEvent<HTMLElement>, target: KeyTarget, from: number) => void;
  onActiveChange?: (index: number) => void;
}

interface VirtualFocus {
  active: number;
  activate: (index: number) => void;
  jump: (index: number, row: number) => void;
  navigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

export type { KeyTarget, VirtualFocus, VirtualFocusInput };
