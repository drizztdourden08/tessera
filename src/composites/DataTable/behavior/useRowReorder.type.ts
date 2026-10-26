/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { RowFeatureProps } from './row-features.type';
import type { RowOrder } from './useRowOrder.type';
import type { FlatRects } from './useRowRects.type';

interface UseRowReorderInput<T> {
  onRowMove: RowFeatureProps<T>['onRowMove'];
  order: RowOrder;
  listRef: RefObject<HTMLElement | null>;
  rootRef: RefObject<HTMLElement | null>;
  getFlat: () => FlatRects<T>;
}

export type { UseRowReorderInput };
