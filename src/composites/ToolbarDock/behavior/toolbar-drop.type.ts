/* @layer renderer-components @kind types */
import type { ToolbarLayout, ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarDropSpot {
  side: ToolbarSide;
  lane: number | 'new';
  index: number;
  at: number;
}

interface ToolbarDropAim {
  layout: ToolbarLayout;
  id: string;
  spot: ToolbarDropSpot;
}

interface ToolbarPlacement {
  layout: ToolbarLayout;
  lane: number;
  start: number;
  size: number;
  span: number;
}

interface ToolbarLaneFit {
  places: ToolbarPlace[];
  start: number;
}

export type { ToolbarDropAim, ToolbarDropSpot, ToolbarLaneFit, ToolbarPlacement };
