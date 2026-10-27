/* @layer renderer-components @kind types */
import type { MenuEvent } from '../../primitives/dom/menu-event.type';
import type { IconName } from '../../primitives/Icon';
import type { ReorderDrag } from '../reorder/reorder.type';

interface DocumentTab {
  id: string;
  title: string;
  icon?: IconName;
  unsaved?: boolean;
  tooltip?: string;
}

type DocumentTabsLook = 'flat' | 'raised';

interface DocumentTabsProps {
  tabs: readonly DocumentTab[];
  activeId?: string;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onMove: (from: number, to: number) => void;
  label?: string;
  overflowMenu?: boolean;
  onTabContextMenu?: (tabId: string, event: MenuEvent) => void;
  onAdd?: () => void;
  look?: DocumentTabsLook;
  className?: string;
}

interface DocumentTabProps {
  tab: DocumentTab;
  index: number;
  domId: string;
  total: number;
  active: boolean;
  tabbable: boolean;
  hover: boolean;
  drag: ReorderDrag;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
}

interface DocumentTabClosesProps {
  tabs: readonly DocumentTab[];
  hoverId: string | null;
  liveId: string | null;
  onClose: (id: string) => void;
}

interface DocumentTabCloseProps {
  tab: DocumentTab;
  hot: boolean;
  onClose: (id: string) => void;
}

interface DocumentTabAddProps {
  onAdd: () => void;
}

interface DocumentTabsMenuProps {
  tabs: readonly DocumentTab[];
  activeId?: string;
  onActivate: (id: string) => void;
}

interface TabKeysInput {
  menu?: (tabId: string, event: MenuEvent) => void;
  total: number;
  move: (from: number, to: number) => void;
  close: (id: string) => void;
}

interface ClosedTab {
  id: string;
  index: number;
}

export type { ClosedTab, DocumentTab, DocumentTabAddProps, DocumentTabCloseProps, DocumentTabClosesProps, DocumentTabProps, DocumentTabsMenuProps, DocumentTabsProps, TabKeysInput };
