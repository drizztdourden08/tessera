/* @layer renderer-components @kind types */
import type { ToolbarSize, ToolbarMenuSide, ToolbarProps, ToolbarShape, ToolbarOrientation } from '../Toolbar.type';

interface ToolbarContextValue {
  orientation: ToolbarOrientation;
  menuSide: ToolbarMenuSide;
  layout: ToolbarShape;
  size: ToolbarSize;
  labels: boolean;
  stop: string | undefined;
  measure: boolean;
  inlineOptions: boolean;
  contextMenu: ToolbarProps['onContextMenu'];
}

export type { ToolbarContextValue };
