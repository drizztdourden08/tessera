/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuItem } from '../DropdownMenu';
import type { ReorderDrag } from '../reorder/reorder.type';

type RowGridLayout = 'table' | 'fold' | 'cards';

type RowGridDensity = 'comfortable' | 'compact';

interface RowGridColumn<Row> {
  id: string;
  label: string;
  cell: (row: Row, index: number) => ReactNode;
  min?: number;
  max?: number;
  fold?: boolean;
  error?: (row: Row) => string | undefined;
}

interface RowGridProps<Row> {
  label: string;
  rows: readonly Row[];
  columns: readonly RowGridColumn<Row>[];
  rowKey: (row: Row) => string;
  rowLabel?: (row: Row, index: number) => string;
  selectedKey?: string;
  numbered?: boolean;
  density?: RowGridDensity;
  onAdd?: () => void;
  addLabel?: string;
  onRemove?: (key: string) => void;
  onMove?: (from: number, to: number) => void;
  rowMenu?: (row: Row, index: number) => readonly MenuItem[];
  summary?: ReactNode;
  empty?: ReactNode;
  className?: string;
}

interface ColumnSize {
  min?: number;
  max?: number;
  fold?: boolean;
}

interface GridParts {
  handle: boolean;
  numbered: boolean;
  endButtons: number;
  density: RowGridDensity;
}

interface ShapeKey {
  columns: readonly ColumnSize[];
  parts: GridParts;
}

interface GridShape {
  table: number;
  fold: number | null;
  max: number | null;
  tracks: (layout: RowGridLayout) => string;
}

type PendingFocus = { kind: 'add' } | { kind: 'remove'; index: number } | { kind: 'move'; key: string };

interface RowFocus {
  message: string;
  announce: (message: string) => void;
  expect: (pending: PendingFocus) => void;
}

interface RowShared<Row> {
  columns: readonly RowGridColumn<Row>[];
  layout: RowGridLayout;
  numbered: boolean;
  total: number;
  rowKey: (row: Row) => string;
  rowLabel?: (row: Row, index: number) => string;
  selectedKey?: string;
  onRemove?: (key: string) => void;
  onMove?: (from: number, to: number) => void;
  rowMenu?: (row: Row, index: number) => readonly MenuItem[];
  drag: ReorderDrag;
  focus: RowFocus;
}

interface RowGridRowProps<Row> {
  row: Row;
  index: number;
  shared: RowShared<Row>;
}

interface RowGridCellProps<Row> {
  column: RowGridColumn<Row>;
  row: Row;
  index: number;
  rowId: string;
  look: 'hidden' | 'above' | 'inline';
}

interface RowHandleProps {
  name: string;
  index: number;
  total: number;
  drag: ReorderDrag;
  onStep: (to: number) => void;
}

interface RowEndProps {
  name: string;
  index: number;
  total: number;
  menu: readonly MenuItem[];
  onRemove?: () => void;
  onStep?: (to: number) => void;
}

interface RowGridHeadProps {
  labels: readonly string[];
  handle: boolean;
  numbered: boolean;
  end: boolean;
}

interface RowGridFootProps {
  onAdd?: () => void;
  addLabel: string;
  summary?: ReactNode;
}

interface RowGridEmptyProps {
  message: ReactNode;
  onAdd?: () => void;
  addLabel: string;
}

export type {
  ColumnSize, GridParts, GridShape, PendingFocus, RowEndProps, RowFocus, RowGridCellProps, RowGridColumn, RowGridDensity,
  RowGridEmptyProps, RowGridFootProps, RowGridHeadProps, RowGridLayout, RowGridProps, RowGridRowProps,
  RowHandleProps, RowShared, ShapeKey,
};
