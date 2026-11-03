/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { MarqueeItem } from '../../marquee';
import type { ScrollAlign, VirtualAxis } from '../../virtual';
import type { ItemLayout } from './item-layout.type';

interface UseListScrollInput {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  layout: ItemLayout;
  axis: VirtualAxis;
  keys: readonly string[];
  onScroll: () => void;
}

interface ListScroll {
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
}

export type { ListScroll, UseListScrollInput };
