/* @layer renderer-components @kind types */
import type { LayoutEdit, LayoutNode, WidgetId } from '../DockLayout.type';
import type { LaidOut } from '../behavior/layout-tree.type';

interface DockCornersProps {
  laid: LaidOut;
  tree: LayoutNode;
  hidden: boolean;
  labelOf: (id: WidgetId) => string;
  onEdit: (edit: LayoutEdit) => void;
}

export type { DockCornersProps };
