/* @layer renderer-components @kind types */
import type { FocusEvent, RefObject } from 'react';
import type { GroupedRow } from '../../../data/table/types';
import type { FlatItem } from './flatten-rows.type';

interface UseVirtualRowsInput<T> {
  enabled: boolean;
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
  rootRef: RefObject<HTMLElement | null>;
}

interface VirtualMetrics {
  top: number;
  viewport: number;
  rowHeight: number;
}

interface VirtualRows<T> {
  items: readonly FlatItem<T>[];
  indices: readonly number[];
  bodyRef: RefObject<HTMLElement | null>;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
}

export type { UseVirtualRowsInput, VirtualMetrics, VirtualRows };
