/* @layer renderer-components @kind types */
import type { LayoutEdit } from '../DockLayout.type';
import type { CornerHandle, CornerTurn, CornerZone } from '../behavior/corner.type';
import type { DividerRect } from '../behavior/layout-tree.type';

interface DockDividerProps {
  divider: DividerRect;
  zones: readonly CornerZone[];
  hint: string;
  onEdit: (edit: LayoutEdit) => void;
  onTurn: (handle: CornerHandle, turn: CornerTurn) => void;
}

export type { DockDividerProps };
