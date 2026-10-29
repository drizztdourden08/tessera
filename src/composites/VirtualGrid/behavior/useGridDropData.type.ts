/* @layer renderer-components @kind types */
import type { FileDragHandlers } from '../../../primitives/DropZone/behavior/useFileDrag.type';
import type { VirtualGridSection } from '../VirtualGrid.type';

interface UseGridDropDataInput<T> {
  sections?: readonly VirtualGridSection<T>[];
  announce: (message: string) => void;
}

type GridHeaderDrop = FileDragHandlers;

interface GridDropData<T> {
  hot: string | null;
  active: boolean;
  dropOf: (section: VirtualGridSection<T>) => GridHeaderDrop | undefined;
}

export type { GridDropData, GridHeaderDrop, UseGridDropDataInput };
