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
  listRatio?: number;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  detailCollapsible?: boolean;
  detailCollapsed?: boolean;
  defaultDetailCollapsed?: boolean;
  onDetailCollapsedChange?: (collapsed: boolean) => void;
  listScroll?: boolean;
  detailScroll?: boolean;
  storageKey?: string;
  listLabel?: string;
  detailLabel?: string;
  className?: string;
}

export type { ListDetailLayoutProps };
