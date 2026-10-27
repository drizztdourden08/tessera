/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { RowState } from '../DataTable/DataTable.type';

type TrackRowTone = RowState;

type TrackDrop = 1 | 2 | 3;

type TrackAlign = 'start' | 'center' | 'end';

interface TrackColumn<Row> {
  id: string;
  label: ReactNode;
  cell: (row: Row, index: number) => ReactNode;
  fr?: number;
  width?: string;
  drop?: TrackDrop;
  align?: TrackAlign;
}

interface TrackTableProps<Row> {
  label: string;
  rows: readonly Row[];
  columns: readonly TrackColumn<Row>[];
  rowKey: (row: Row) => string;
  head?: boolean;
  empty?: ReactNode;
  onRowClick?: (row: Row) => void;
  rowDetail?: (row: Row) => ReactNode;
  rowTone?: (row: Row) => TrackRowTone | undefined;
  className?: string;
}

interface TrackHeadProps<Row> {
  columns: readonly TrackColumn<Row>[];
}

interface TrackRowProps<Row> {
  row: Row;
  index: number;
  columns: readonly TrackColumn<Row>[];
  onRowClick?: (row: Row) => void;
  tone?: TrackRowTone;
  open?: boolean;
}

interface TrackDetailProps {
  children: ReactNode;
}

interface TrackRowAttrs {
  tabIndex?: number;
  'data-interactive'?: 'yes';
  'data-tone'?: TrackRowTone;
  'data-open'?: 'yes';
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { TrackAlign, TrackColumn, TrackDetailProps, TrackDrop, TrackHeadProps, TrackRowAttrs, TrackRowProps, TrackRowTone, TrackTableProps };
