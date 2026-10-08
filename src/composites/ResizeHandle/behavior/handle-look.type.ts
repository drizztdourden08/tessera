/* @layer renderer-components @kind types */
import type { SplitOrientation } from '../../SplitPane/SplitPane.type';
import type { ResizeHandleLook } from '../ResizeHandle.type';

interface HandleLook {
  look: ResizeHandleLook;
  orientation: SplitOrientation;
  filled: boolean;
  dragging: boolean;
  className: string | undefined;
}

export type { HandleLook };
