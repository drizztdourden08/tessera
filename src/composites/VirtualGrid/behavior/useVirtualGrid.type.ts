/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { MarqueeItem } from '../../marquee';
import type { ScrollAlign, VirtualFocusModel } from '../../virtual';
import type { VirtualGridCellBind, VirtualGridReorder, VirtualGridSection, VirtualGridSelection } from '../VirtualGrid.type';
import type { GridHeaderDrop } from './useGridDropData.type';
import type { GridGhost } from './useGridReorder.type';
import type { GridLayout } from './grid-layout.type';

interface UseVirtualGridInput<T> {
  items?: readonly T[];
  sections?: readonly VirtualGridSection<T>[];
  getKey: (item: T, index: number) => string;
  overscan?: number;
  sizeKey: string;
  columns?: number;
  collapsed?: readonly string[];
  defaultCollapsed?: readonly string[];
  onToggleSection?: (key: string, collapsed: boolean) => void;
  onActiveChange?: (index: number) => void;
  selection?: VirtualGridSelection;
  getLabel?: (item: T, index: number) => string;
  holes?: (item: T, index: number) => boolean;
  reorder?: VirtualGridReorder<T>;
}

interface VirtualGridModel<T> extends VirtualFocusModel {
  flat: readonly T[];
  layout: GridLayout;
  rows: readonly number[];
  columns: number;
  fixed: boolean;
  sectionKeys: readonly string[];
  collapsed: ReadonlySet<string>;
  setCollapsed: (key: string, collapsed: boolean) => void;
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
  selecting: boolean;
  reordering: boolean;
  announcing: boolean;
  message: string;
  into: string | null;
  dropOf: (section: VirtualGridSection<T>) => GridHeaderDrop | undefined;
  ghost: GridGhost | null;
  extrasOf: (item: number, key: string) => Partial<VirtualGridCellBind>;
  cellKeys: (event: KeyboardEvent<HTMLElement>, stop: number, item: number) => void;
}

export type { UseVirtualGridInput, VirtualGridModel };
