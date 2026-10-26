/* @layer renderer-components @kind types */
import type { PointerEvent, ReactNode, Ref } from 'react';
import type { ActionItem } from '../../ActionBar';
import type { MarqueeItem } from '../../marquee';
import type { ReorderDrag } from '../../reorder';

interface DataTableHandle {
  getRects: () => readonly MarqueeItem[];
}

interface DataTableBind {
  onPointerDown?: (event: PointerEvent<HTMLElement>) => void;
}

interface RowFeatureProps<T> {
  groupActions?: (groupKey: string, rows: readonly T[]) => readonly ActionItem[];
  onRowMove?: (fromKey: string, toIndex: number) => void;
  rowDragData?: (row: T) => Record<string, string>;
  scrollRef?: Ref<HTMLElement>;
  bind?: DataTableBind;
  overlay?: ReactNode;
  ref?: Ref<DataTableHandle>;
}

interface RowReorderBinding {
  total: number;
  indexOf: (id: string) => number;
  drag: ReorderDrag;
  drop: (from: number, to: number) => void;
  step: (from: number, to: number) => void;
  message: string;
}

export type { DataTableBind, DataTableHandle, RowFeatureProps, RowReorderBinding };
