/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type TrackDrop = 1 | 2 | 3;

type TrackAlign = 'start' | 'center' | 'end';

interface TrackColumn<Row> {
  id: string;
  label: ReactNode;
  cell: (row: Row, index: number) => ReactNode;
  fr?: number;
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
  className?: string;
}

interface TrackHeadProps<Row> {
  columns: readonly TrackColumn<Row>[];
}

interface TrackRowProps<Row> {
  row: Row;
  index: number;
  columns: readonly TrackColumn<Row>[];
}

export type { TrackAlign, TrackColumn, TrackDrop, TrackHeadProps, TrackRowProps, TrackTableProps };
