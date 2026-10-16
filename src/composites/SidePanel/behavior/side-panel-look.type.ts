/* @layer renderer-components @kind types */
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelLook {
  side: SidePanelSide;
  collapsible: boolean;
  collapsed: boolean;
  handled: boolean;
  dragging: boolean;
}

export type { SidePanelLook };
