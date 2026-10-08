/* @layer renderer-components @kind types */
import type { LayoutEdit } from '../DockLayout.type';
import type { DividerRect } from '../behavior/layout-tree.type';

interface DockDividerProps {
  divider: DividerRect;
  onEdit: (edit: LayoutEdit) => void;
}

export type { DockDividerProps };
