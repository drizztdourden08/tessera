/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TableCellWidth, TableRowTone } from '../../primitives/Table';

interface PairedTreeColumn {
  id: string;
  title: ReactNode;
  width?: TableCellWidth;
}

interface PairedTreeRow {
  id: string;
  depth: number;
  cells: Record<string, ReactNode | undefined>;
  tone?: TableRowTone;
}

interface PairedTreeProps {
  columns: readonly PairedTreeColumn[];
  rows: readonly PairedTreeRow[];
  ghost?: ReactNode;
  label?: string;
  className?: string;
}

interface PairedTreeCellProps {
  value: ReactNode | undefined;
  depth: number;
  ghost: ReactNode;
}

export type { PairedTreeCellProps, PairedTreeColumn, PairedTreeProps, PairedTreeRow };
