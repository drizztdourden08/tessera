/* @layer renderer-components @kind types */
import type { ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarLaneMetrics {
  side: ToolbarSide;
  lane: number;
  places: ToolbarPlace[];
  index: number;
  span: number;
  minShare: number;
}

export type { ToolbarLaneMetrics };
