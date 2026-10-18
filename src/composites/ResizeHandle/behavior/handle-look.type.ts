/* @layer renderer-components @kind types */
import type { SplitOrientation } from '../../SplitPane/SplitPane.type';

interface HandleLook {
  orientation: SplitOrientation;
  dragging: boolean;
  className: string | undefined;
}

export type { HandleLook };
