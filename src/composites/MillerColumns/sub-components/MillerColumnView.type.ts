/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualListHandle, VirtualListRowSize } from '../../VirtualList';
import type { MillerColumn } from '../MillerColumns.type';

interface MillerColumnViewProps<T> {
  column: MillerColumn<T>;
  label: string;
  selected: ReadonlySet<string>;
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
  getLabel?: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  rowSize?: VirtualListRowSize;
  onChange: (column: number, next: ReadonlySet<string>) => void;
  onOpen?: (item: T) => void;
  attach: (index: number) => (handle: VirtualListHandle | null) => void;
}

export type { MillerColumnViewProps };
