/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ListItemRowRole = 'listitem' | 'row';

type ListItemRowActionVisibility = 'hover' | 'always';

interface ListItemRowProps {
  name: ReactNode;
  icon?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  action?: ReactNode;
  actionVisibility?: ListItemRowActionVisibility;
  selected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  role?: ListItemRowRole;
  className?: string;
}

export type { ListItemRowActionVisibility, ListItemRowProps, ListItemRowRole };
