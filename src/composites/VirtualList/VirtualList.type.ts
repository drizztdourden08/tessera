/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualSize } from '../virtual';

type VirtualListRowSize = 'compact' | 'normal' | 'roomy';

interface VirtualListProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  label: string;
  rowSize?: VirtualListRowSize;
  rowHeight?: VirtualSize;
  overscan?: number;
  onActiveChange?: (index: number) => void;
  className?: string;
}

export type { VirtualListProps, VirtualListRowSize };
