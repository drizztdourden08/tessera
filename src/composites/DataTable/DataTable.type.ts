/* @layer renderer-components @kind types */
import type { DragEvent, KeyboardEvent, MouseEvent } from 'react';
import type { SchemaIndex } from '../../data/schema/build-schema';
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import type { ColumnMove, SortEntry, TableColumn } from '../../data/table/types';
import type { ViewKey } from '../../data/view-state/snapshot';
import type { ViewStorage } from '../../data/view-state/use-view-state';
import type {
  IdRefDefaultResolver, IdRefDisplayResolver, IdRefHrefResolver, IdRefTargetFieldResolver,
} from './behavior/display-substitution.type';
import type { GrowFallback } from './behavior/overflow-probe.type';

interface DataTableProps<T> {
  rows: readonly T[];
  schema: readonly FieldDescriptor[];
  getRowId: (row: T) => string;
  viewKey?: ViewKey;
  viewStorage?: ViewStorage;
  fallbackColumns?: readonly TableColumn[];
  fallbackGroupBy?: readonly string[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
  selectedIds?: ReadonlySet<string>;
  onSelectionChange?: (ids: ReadonlySet<string>) => void;
  selectable?: boolean;
  countLabel?: readonly [one: string, many: string];
  emptyMessage?: string;
  resolveTargetFields?: IdRefTargetFieldResolver;
  resolveIdRefDisplay?: IdRefDisplayResolver;
  resolveIdRefDefault?: IdRefDefaultResolver;
  resolveIdRefHref?: IdRefHrefResolver;
}

interface ColumnActions {
  onToggleSort: (path: string) => void;
  onSortDir: (path: string, dir: SortEntry['dir']) => void;
  onRemoveSort: (path: string) => void;
  onAddColumnAt: (path: string, at: number) => void;
  onRemove: (path: string) => void;
  onMove: (path: string, move: ColumnMove) => void;
  onRename: (path: string, label: string) => void;
  onSetDisplayField: (path: string, displayField: string | undefined) => void;
  onGroupBy: (path: string) => void;
  onUngroup: (path: string) => void;
  onResize: (path: string, width: number) => void;
  onPreviewResize: (path: string, width: number) => void;
  onFitToContent: (path: string) => void;
  onExpandToFill: (path: string) => void;
}

interface TableActions {
  onAddColumn: (path: string) => void;
  onClearSort: () => void;
  onClearGroupBy: () => void;
  onFitAllToContent: () => void;
  onResetColumns: () => void;
}

interface ColumnDragStart {
  path: string;
  index: number;
  event: DragEvent<HTMLElement>;
  ghost: HTMLElement | null;
}

interface ColumnDragBinding {
  draggingPath: string | null;
  draggingIndex: number | null;
  overIndex: number | null;
  onDragStart: (start: ColumnDragStart) => void;
  onDragOver: (index: number, event: DragEvent<HTMLElement>) => void;
  onDrop: (index: number, event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onSurfaceHover: (event: DragEvent<HTMLElement>) => void;
  onSurfaceDrop: (event: DragEvent<HTMLElement>) => void;
}

type SelectAllState = 'none' | 'some' | 'all';

interface RowSelectionBinding {
  selectable: boolean;
  isSelected: (id: string) => boolean;
  onRowClick: (id: string, event: MouseEvent<HTMLElement>) => void;
  onRowMouseDown: (event: MouseEvent<HTMLElement>) => void;
  onCheck: (id: string, range: boolean) => void;
  onCheckAll: () => void;
  allState: SelectAllState;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

interface RowRenderContext<T> {
  columns: readonly TableColumn[];
  schema: SchemaIndex;
  draggingPath?: string | null;
  getRowId: (row: T) => string;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  selection?: RowSelectionBinding | null;
  isExpanded: (uid: string) => boolean;
  onToggleGroup: (uid: string) => void;
  resolveIdRefDisplay?: IdRefDisplayResolver;
  resolveIdRefDefault?: IdRefDefaultResolver;
  resolveIdRefHref?: IdRefHrefResolver;
  onCellDragOver?: (index: number, event: DragEvent<HTMLElement>) => void;
  onCellDrop?: (index: number, event: DragEvent<HTMLElement>) => void;
}

interface TrackOverride {
  path: string;
  width: number;
}

interface TrackFallbacks {
  grow?: GrowFallback;
  fit?: GrowFallback;
}

export type {
  ColumnActions, ColumnDragBinding, ColumnDragStart,
  DataTableProps, RowRenderContext, RowSelectionBinding, SelectAllState, TableActions,
  TrackFallbacks, TrackOverride,
};
