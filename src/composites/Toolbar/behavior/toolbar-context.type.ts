/* @layer renderer-components @kind types */
import type { IconButtonSize } from '../../../primitives/IconButton/IconButton.type';
import type { ToolbarShape, ToolbarOrientation } from '../Toolbar.type';

interface ToolbarContextValue {
  orientation: ToolbarOrientation;
  layout: ToolbarShape;
  size: IconButtonSize;
  labels: boolean;
  stop: string | undefined;
  measure: boolean;
}

export type { ToolbarContextValue };
