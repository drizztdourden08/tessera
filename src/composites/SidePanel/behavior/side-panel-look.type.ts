/* @layer renderer-components @kind types */
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelLook {
  side: SidePanelSide;
  collapsible: boolean;
  collapsed: boolean;
  dragging: boolean;
  showHeader: boolean;
}

export type { SidePanelLook };
