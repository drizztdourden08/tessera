/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, PointerEvent as ReactPointerEvent, ReactNode, Ref } from 'react';
import type { ActionItem } from '../ActionBar';
import type { MarqueeItem } from '../marquee';
import type { ReorderModifier } from '../reorder';
import type { ScrollAlign, VirtualSize } from '../virtual';

interface VirtualGridSection<T> {
  key: string;
  label: ReactNode;
  items: readonly T[];
  count?: number;
  actions?: readonly ActionItem[];
  depth?: number;
  onDrop?: (keys: readonly string[]) => void;
}

interface VirtualGridHandle {
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
}

interface VirtualGridSelection {
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
}

interface VirtualGridDrop {
  index: number;
  section?: string;
}

interface VirtualGridMove {
  keys: readonly string[];
  to: VirtualGridDrop;
  modifier: ReorderModifier;
}

interface VirtualGridReorder<T> {
  onMove: (move: VirtualGridMove) => void;
  renderThumbnail?: (item: T, index: number) => ReactNode;
}

interface VirtualGridBind {
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
}

interface VirtualGridCellBind {
  role: 'gridcell';
  className: string;
  tabIndex: 0 | -1;
  'aria-colindex': number;
  'data-vg-index': number;
  'data-vg-kind': 'tile';
  'data-marquee-key': string;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  'aria-selected'?: boolean;
  'data-drop'?: 'before' | 'after';
  'data-dragging'?: true;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLElement>) => void;
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerMove?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp?: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerCancel?: () => void;
}

interface VirtualGridDrawItem<T> {
  renderItem: (item: T, index: number) => ReactNode;
  renderTile?: undefined;
}

interface VirtualGridDrawTile<T> {
  renderTile: (item: T, index: number, cell: VirtualGridCellBind) => ReactNode;
  renderItem?: undefined;
}

interface VirtualGridBase<T> {
  getKey: (item: T, index: number) => string;
  label: string;
  tileSize?: VirtualSize;
  tileWidth?: VirtualSize;
  tileHeight?: VirtualSize;
  columns?: number;
  overscan?: number;
  selection?: VirtualGridSelection;
  getLabel?: (item: T, index: number) => string;
  holes?: (item: T, index: number) => boolean;
  reorder?: VirtualGridReorder<T>;
  collapsed?: readonly string[];
  defaultCollapsed?: readonly string[];
  onToggleSection?: (key: string, collapsed: boolean) => void;
  onActiveChange?: (index: number) => void;
  scrollRef?: Ref<HTMLElement>;
  bind?: VirtualGridBind;
  overlay?: ReactNode;
  ref?: Ref<VirtualGridHandle>;
  className?: string;
}

interface VirtualGridFlat<T> extends VirtualGridBase<T> {
  items: readonly T[];
  sections?: undefined;
}

interface VirtualGridSectioned<T> extends VirtualGridBase<T> {
  sections: readonly VirtualGridSection<T>[];
  items?: undefined;
}

type VirtualGridProps<T> = (VirtualGridFlat<T> | VirtualGridSectioned<T>) & (VirtualGridDrawItem<T> | VirtualGridDrawTile<T>);

export type {
  VirtualGridBind, VirtualGridCellBind, VirtualGridDrop, VirtualGridHandle, VirtualGridMove, VirtualGridProps, VirtualGridReorder, VirtualGridSection,
  VirtualGridSelection,
};
