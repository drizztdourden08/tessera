/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent, ReactNode, Ref } from 'react';
import type { ScrollAlign, VirtualSize } from '../virtual';

interface VirtualGridSection<T> {
  key: string;
  label: ReactNode;
  items: readonly T[];
  count?: number;
}

interface VirtualGridHandle {
  scrollToIndex: (index: number, align?: ScrollAlign) => void;
}

interface VirtualGridBind {
  onPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
}

interface VirtualGridBase<T> {
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  label: string;
  tileSize?: VirtualSize;
  tileWidth?: VirtualSize;
  tileHeight?: VirtualSize;
  overscan?: number;
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

type VirtualGridProps<T> = VirtualGridFlat<T> | VirtualGridSectioned<T>;

export type { VirtualGridBind, VirtualGridHandle, VirtualGridProps, VirtualGridSection };
