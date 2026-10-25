/* @layer renderer-components @kind types */
import type { ToolbarSide } from '../ToolbarDock.type';

interface Opening {
  side: ToolbarSide;
  lane: number;
  fresh: boolean;
  start: number;
  size: number;
}

export type { Opening };
