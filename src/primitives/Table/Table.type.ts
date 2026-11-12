/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes } from 'react';

type TableAlign = 'left' | 'center' | 'right';

type TableRowTone = 'accent' | 'success' | 'warning' | 'danger' | 'info';

type TableCellWidth = 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'fill';

interface TableProps extends Omit<TableHTMLAttributes<HTMLTableElement>, 'align'> {
  striped?: boolean;
  children?: ReactNode;
}

interface TableSectionProps extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
  head?: boolean;
  children?: ReactNode;
}

interface TableRowProps extends Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> {
  tone?: TableRowTone;
  children?: ReactNode;
}

interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  header?: boolean;
  align?: TableAlign;
  width?: TableCellWidth;
  children?: ReactNode;
}

export type { TableAlign, TableCellProps, TableCellWidth, TableProps, TableRowProps, TableRowTone, TableSectionProps };
