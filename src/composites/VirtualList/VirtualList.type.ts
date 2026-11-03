/* @layer renderer-components @kind types */
import type { KeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode, Ref } from 'react';
import type { MarqueeItem } from '../marquee';
import type { ReorderModifier } from '../reorder';
import type { ScrollAlign, VirtualAxis, VirtualCellHandlers, VirtualSize } from '../virtual';

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

type VirtualListItemSize = VirtualSize | ((index: number) => number);

interface VirtualListMove {
  keys: readonly string[];
  to: number;
  modifier: ReorderModifier;
}

interface VirtualListReorder<T> {
  onMove: (move: VirtualListMove) => void;
  renderThumbnail?: (item: T, index: number) => ReactNode;
  canDrop?: (move: VirtualListMove) => boolean;
  dropLabel?: (position: number, modifier: ReorderModifier) => string;
}

interface VirtualListCellBind extends VirtualCellHandlers {
  role: 'option' | 'listitem';
  className: string;
  tabIndex: 0 | -1;
  'aria-posinset': number;
  'aria-setsize': number;
  'aria-selected'?: boolean;
  'aria-current'?: true;
  'data-vl-index': number;
  'data-marquee-key'?: string;
  'data-drop'?: 'before' | 'after';
  'data-drop-label'?: string;
  'data-refused'?: true;
  'data-dragging'?: true;
}

interface VirtualListDrawItem<T> {
  renderItem: (item: T, index: number) => ReactNode;
  renderOption?: undefined;
}

interface VirtualListDrawOption<T> {
  renderOption: (item: T, index: number, cell: VirtualListCellBind) => ReactNode;
  renderItem?: undefined;
}

interface VirtualListBase<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  label: string;
  orientation?: VirtualAxis;
  rowSize?: VirtualListRowSize;
  rowHeight?: VirtualSize;
  itemSize?: VirtualListItemSize;
  itemSizeKey?: string;
  endGutter?: number;
  current?: string;
  ownsKey?: (event: KeyboardEvent<HTMLElement>) => boolean;
  reorder?: VirtualListReorder<T>;
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

type VirtualListProps<T> = VirtualListBase<T> & (VirtualListDrawItem<T> | VirtualListDrawOption<T>);

export type {
  VirtualListBind, VirtualListCellBind, VirtualListHandle, VirtualListItemSize, VirtualListMove, VirtualListProps, VirtualListReorder, VirtualListRowSize, VirtualListSelection,
};
