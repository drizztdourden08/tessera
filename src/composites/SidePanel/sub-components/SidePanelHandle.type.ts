/* @layer renderer-components @kind types */
import type { PaneSizeHandle } from '../../ResizeHandle/behavior/pane-size.type';
import type { SidePanelSide } from '../SidePanel.type';

interface SidePanelHandleProps {
  handle: PaneSizeHandle;
  side: SidePanelSide;
  title: string;
  controls: string;
  onCollapse: (() => void) | undefined;
}

export type { SidePanelHandleProps };
