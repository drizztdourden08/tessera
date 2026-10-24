/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';

interface UseVirtualListInput<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  overscan?: number;
  onActiveChange?: (index: number) => void;
}

interface VirtualListModel {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  indices: readonly number[];
  tabbable: number;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
  activate: (index: number) => void;
  navigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

export type { UseVirtualListInput, VirtualListModel };
