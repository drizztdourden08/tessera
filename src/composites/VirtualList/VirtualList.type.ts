/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type VirtualListRowSize = 'compact' | 'normal' | 'roomy';

interface VirtualListProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  label: string;
  rowSize?: VirtualListRowSize;
  overscan?: number;
  onActiveChange?: (index: number) => void;
  className?: string;
}

export type { VirtualListProps, VirtualListRowSize };
