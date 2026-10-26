/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes } from 'react';

type TableAlign = 'left' | 'center' | 'right';

interface TableProps extends Omit<TableHTMLAttributes<HTMLTableElement>, 'align'> {
  striped?: boolean;
  children?: ReactNode;
}

interface TableSectionProps extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
  head?: boolean;
  children?: ReactNode;
}

interface TableRowProps extends Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> {
  children?: ReactNode;
}

interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  header?: boolean;
  align?: TableAlign;
  children?: ReactNode;
}

export type { TableAlign, TableCellProps, TableProps, TableRowProps, TableSectionProps };
