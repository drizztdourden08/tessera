/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { VirtualListRowSize } from '../VirtualList';
import type { VirtualSize } from '../virtual';

interface MillerColumnsSelection {
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
}

interface MillerColumnsProps<T> {
  items: readonly T[];
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
  renderItem: (item: T) => ReactNode;
  label: string;
  selection: MillerColumnsSelection;
  getLabel?: (item: T) => string;
  path?: readonly string[];
  defaultPath?: readonly string[];
  onPathChange?: (path: readonly string[]) => void;
  onOpen?: (item: T) => void;
  columnWidth?: VirtualSize;
  rowSize?: VirtualListRowSize;
  className?: string;
}

interface MillerColumn<T> {
  index: number;
  items: readonly T[];
  openKey: string | undefined;
}

export type { MillerColumn, MillerColumnsProps, MillerColumnsSelection };
