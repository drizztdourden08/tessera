/* @layer renderer-components @kind types */
import type { IconButtonSize } from '../../../primitives/IconButton/IconButton.type';
import type { ToolbarMenuSide, ToolbarProps, ToolbarShape, ToolbarOrientation } from '../Toolbar.type';

interface ToolbarContextValue {
  orientation: ToolbarOrientation;
  menuSide: ToolbarMenuSide;
  layout: ToolbarShape;
  size: IconButtonSize;
  labels: boolean;
  stop: string | undefined;
  measure: boolean;
  contextMenu: ToolbarProps['onContextMenu'];
}

export type { ToolbarContextValue };
