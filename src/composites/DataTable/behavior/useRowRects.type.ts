/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GroupedRow } from '../../../data/table/types';
import type { MarqueeItem } from '../../marquee';
import type { Rect } from '../../rect-drag/rect-drag.type';
import type { FlatItem } from './flatten-rows.type';
import type { VirtualRows } from './useVirtualRows.type';

interface UseRowRectsInput<T> {
  rootRef: RefObject<HTMLElement | null>;
  virtual: VirtualRows<T> | null;
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
}

interface FlatRects<T> {
  items: readonly FlatItem<T>[];
  rects: readonly Rect[];
}

interface RowRects<T> {
  getRects: () => readonly MarqueeItem[];
  getFlat: () => FlatRects<T>;
}

export type { FlatRects, RowRects, UseRowRectsInput };
