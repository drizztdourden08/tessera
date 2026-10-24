/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualSize } from '../virtual';

interface VirtualGridProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  label: string;
  tileSize?: VirtualSize;
  overscan?: number;
  onActiveChange?: (index: number) => void;
  className?: string;
}

interface GridShape {
  active: number;
  count: number;
  columns: number;
  page: number;
}

export type { GridShape, VirtualGridProps };
