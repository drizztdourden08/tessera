/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent, ReactNode, Ref } from 'react';
import type { MarqueeItem } from '../marquee';
import type { ScrollAlign, VirtualAxis, VirtualSize } from '../virtual';

type VirtualListRowSize = 'compact' | 'normal' | 'roomy';

interface VirtualListSelection {
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
}

interface VirtualListHandle {
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
}

interface VirtualListBind {
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
}

interface VirtualListProps<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  label: string;
  orientation?: VirtualAxis;
  rowSize?: VirtualListRowSize;
  rowHeight?: VirtualSize;
  itemSize?: VirtualSize;
  overscan?: number;
  selection?: VirtualListSelection;
  getLabel?: (item: T, index: number) => string;
  onActiveChange?: (index: number) => void;
  scrollRef?: Ref<HTMLElement>;
  bind?: VirtualListBind;
  overlay?: ReactNode;
  ref?: Ref<VirtualListHandle>;
  className?: string;
}

export type { VirtualListBind, VirtualListHandle, VirtualListProps, VirtualListRowSize, VirtualListSelection };
