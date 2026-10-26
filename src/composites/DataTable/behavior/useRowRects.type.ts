/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { VirtualRows } from './useVirtualRows.type';

interface UseRowRectsInput<T> {
  rootRef: RefObject<HTMLElement | null>;
  virtual: VirtualRows<T> | null;
  getRowId: (row: T) => string;
}

export type { UseRowRectsInput };
