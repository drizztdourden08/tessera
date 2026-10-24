/* @layer renderer-components @kind types */
import type { IconButtonSize } from '../../../primitives/IconButton/IconButton.type';
import type { ToolbarOrientation } from '../Toolbar.type';

interface ToolbarContextValue {
  orientation: ToolbarOrientation;
  size: IconButtonSize;
  stop: string | undefined;
  measure: boolean;
}

export type { ToolbarContextValue };
