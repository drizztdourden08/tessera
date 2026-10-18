/* @layer renderer-components @kind types */
import type { CollapseToggleSide } from '../CollapseToggle/CollapseToggle.type';
import type { EdgePane } from './pane-edge.type';

interface EdgeToggleProps {
  pane: EdgePane | undefined;
  side: CollapseToggleSide;
  across: EdgePane | undefined;
}

export type { EdgeToggleProps };
