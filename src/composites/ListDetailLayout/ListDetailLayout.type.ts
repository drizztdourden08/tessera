/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { PanelContainerConfig } from '../PanelContainer/PanelContainer.type';

interface ListDetailLayoutProps {
  listContainers: PanelContainerConfig[];
  detail?: ReactNode;
  emptyDetail?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
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
  listShowTitle?: boolean;
  listAction?: ReactNode;
  listRailItems?: ReactNode[];
  detailRailItems?: ReactNode[];
  className?: string;
}

interface ListDetailLayoutListPaneProps {
  id: string;
  collapsed: boolean;
  label: string;
  showTitle: boolean;
  action?: ReactNode;
  railItems: ReactNode[];
  containers: PanelContainerConfig[];
  scroll: boolean;
  onUnfold: () => void;
}

export type { ListDetailLayoutListPaneProps, ListDetailLayoutProps };
