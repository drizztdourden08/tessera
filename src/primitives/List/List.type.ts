/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

interface ListProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  ordered?: boolean;
  start?: number;
  children?: ReactNode;
}

interface ListItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  bare?: boolean;
  children?: ReactNode;
}

export type { ListItemProps, ListProps };
