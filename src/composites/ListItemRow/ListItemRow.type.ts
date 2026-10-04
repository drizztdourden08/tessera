/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ListItemRowRole = 'listitem' | 'row';

type ListItemRowActionVisibility = 'hover' | 'always';

type ListItemColumnAlign = 'start' | 'center' | 'end';

interface ListItemColumn {
  primary: ReactNode;
  secondary?: ReactNode;
  align?: ListItemColumnAlign;
}

interface ListItemRowProps {
  name: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  columns?: readonly ListItemColumn[];
  action?: ReactNode;
  actionVisibility?: ListItemRowActionVisibility;
  selected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  role?: ListItemRowRole;
  className?: string;
}

interface ListItemListProps {
  children: ReactNode;
  label?: string;
  heading?: ReactNode;
  count?: number;
  className?: string;
}

interface ListItemShape {
  icon: boolean;
  columns: number;
  action: boolean;
}

export type {
  ListItemColumn, ListItemColumnAlign, ListItemListProps, ListItemRowActionVisibility, ListItemRowProps,
  ListItemRowRole, ListItemShape,
};
