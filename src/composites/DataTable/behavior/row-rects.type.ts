/* @layer renderer-components @kind types */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { FlatItem } from './flatten-rows.type';

interface RowRectsInput<T> {
  items: readonly FlatItem<T>[];
  rowHeight: number;
  origin: Point;
  width: number;
  getRowId: (row: T) => string;
}

export type { RowRectsInput };
