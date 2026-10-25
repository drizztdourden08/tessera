/* @layer renderer-components @kind types */
import type { ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarFound {
  side: ToolbarSide;
  lane: number;
  place: ToolbarPlace;
}

export type { ToolbarFound };
