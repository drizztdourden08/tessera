/* @layer renderer-components @kind types */
import type { ToolbarSide } from '../ToolbarDock.type';

interface ToolbarBarTrack {
  id: string;
  track: number;
}

interface ToolbarLaneGrid {
  side: ToolbarSide;
  lane: number;
  gridRow: string;
  gridColumn: string;
  tracks: string;
  bars: ToolbarBarTrack[];
}

type ToolbarGridPlacement = Record<ToolbarSide, ToolbarLaneGrid[]>;

export type { ToolbarBarTrack, ToolbarGridPlacement, ToolbarLaneGrid };
