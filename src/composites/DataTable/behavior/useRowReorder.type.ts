/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { MarqueeItem } from '../../marquee';
import type { RowOrder } from './useRowOrder.type';

interface UseRowReorderInput {
  onRowMove?: (fromKey: string, toIndex: number) => void;
  order: RowOrder;
  listRef: RefObject<HTMLElement | null>;
  rootRef: RefObject<HTMLElement | null>;
  getRects: () => readonly MarqueeItem[];
}

export type { UseRowReorderInput };
