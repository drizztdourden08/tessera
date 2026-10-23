/* @layer renderer-components @kind types */
import type { IconName } from '../../primitives/Icon';
import type { ReorderDrag } from '../reorder/reorder.type';

interface DocumentTab {
  id: string;
  title: string;
  icon?: IconName;
  unsaved?: boolean;
  tooltip?: string;
}

interface DocumentTabsProps {
  tabs: readonly DocumentTab[];
  activeId?: string;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onMove: (from: number, to: number) => void;
  label?: string;
  overflowMenu?: boolean;
  className?: string;
}

interface DocumentTabProps {
  tab: DocumentTab;
  index: number;
  total: number;
  active: boolean;
  tabbable: boolean;
  drag: ReorderDrag;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
}

interface DocumentTabsMenuProps {
  tabs: readonly DocumentTab[];
  activeId?: string;
  onActivate: (id: string) => void;
}

interface TabKeysInput {
  total: number;
  move: (from: number, to: number) => void;
  close: (id: string) => void;
}

interface ClosedTab {
  id: string;
  index: number;
}

export type { ClosedTab, DocumentTab, DocumentTabProps, DocumentTabsMenuProps, DocumentTabsProps, TabKeysInput };
