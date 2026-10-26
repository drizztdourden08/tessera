/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GroupedRow } from '../../../data/table/types';
import type { VirtualWindow } from '../../virtual';
import type { FlatItem } from './flatten-rows.type';

interface UseVirtualRowsInput<T> {
  enabled: boolean;
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
  rootRef: RefObject<HTMLElement | null>;
  rowHeight?: string;
}

interface VirtualRows<T> extends VirtualWindow {
  items: readonly FlatItem<T>[];
}

export type { UseVirtualRowsInput, VirtualRows };
