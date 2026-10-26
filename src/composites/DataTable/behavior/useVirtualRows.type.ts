/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GroupedRow } from '../../../data/table/types';
import type { VirtualWindow } from '../../virtual';
import type { DetailSpan } from './detail-span.type';
import type { FlatItem } from './flatten-rows.type';

interface UseVirtualRowsInput<T> {
  enabled: boolean;
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
  rootRef: RefObject<HTMLElement | null>;
  rowHeight?: string;
  detailRowId?: string | null;
}

interface VirtualRows<T> extends VirtualWindow {
  items: readonly FlatItem<T>[];
  detail: DetailSpan;
  onDetailHeight: (height: number) => void;
}

export type { UseVirtualRowsInput, VirtualRows };
