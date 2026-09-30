/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ListItemRowRole = 'listitem' | 'row';

interface ListItemRowProps {
  name: ReactNode;
  icon?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  action?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  role?: ListItemRowRole;
  className?: string;
}

export type { ListItemRowProps, ListItemRowRole };
