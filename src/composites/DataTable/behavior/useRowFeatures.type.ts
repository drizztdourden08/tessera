/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GroupedRow } from '../../../data/table/types';
import type { MarqueeItem } from '../../marquee';
import type { RowFeatureProps, RowReorderBinding } from './row-features.type';
import type { VirtualRows } from './useVirtualRows.type';

interface UseRowFeaturesInput<T> {
  onRowMove: RowFeatureProps<T>['onRowMove'];
  virtual: VirtualRows<T> | null;
  rootRef: RefObject<HTMLElement | null>;
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
}

interface RowFeatures {
  getRects: () => readonly MarqueeItem[];
  reorder: RowReorderBinding | null;
}

export type { RowFeatures, UseRowFeaturesInput };
