/* @layer renderer-components @kind types */
import type { SidePanelRailSize, SidePanelSide } from '../SidePanel.type';

interface SidePanelLook {
  side: SidePanelSide;
  collapsible: boolean;
  collapsed: boolean;
  dragging: boolean;
  showHeader: boolean;
  railSize: SidePanelRailSize;
}

export type { SidePanelLook };
