/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ListDetailLayoutProps {
  list: ReactNode;
  detail?: ReactNode;
  emptyDetail?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  resizable?: boolean;
  listWidth?: number;
  minListWidth?: number;
  maxListWidth?: number;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  storageKey?: string;
  listLabel?: string;
  detailLabel?: string;
  className?: string;
}

export type { ListDetailLayoutProps };
