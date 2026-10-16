/* @layer renderer-components @kind types */
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelLook {
  side: SidePanelSide;
  collapsed: boolean;
  dragging: boolean;
}

export type { SidePanelLook };
