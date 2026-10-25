/* @layer renderer-components @kind types */
import type { MarqueeItem } from '../../marquee';
import type { ScrollAlign, VirtualFocusModel } from '../../virtual';
import type { VirtualGridSection } from '../VirtualGrid.type';
import type { GridLayout } from './grid-layout.type';

interface UseVirtualGridInput<T> {
  items?: readonly T[];
  sections?: readonly VirtualGridSection<T>[];
  getKey: (item: T, index: number) => string;
  overscan?: number;
  sizeKey: string;
  collapsed?: readonly string[];
  defaultCollapsed?: readonly string[];
  onToggleSection?: (key: string, collapsed: boolean) => void;
  onActiveChange?: (index: number) => void;
}

interface VirtualGridModel<T> extends VirtualFocusModel {
  flat: readonly T[];
  layout: GridLayout;
  rows: readonly number[];
  columns: number;
  sectionKeys: readonly string[];
  collapsed: ReadonlySet<string>;
  setCollapsed: (key: string, collapsed: boolean) => void;
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
  getRects: () => readonly MarqueeItem[];
}

export type { UseVirtualGridInput, VirtualGridModel };
