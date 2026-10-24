/* @layer renderer-components @kind types */
import type { DockEdge } from '../DockLayout';

type ToolbarSide = DockEdge;

type ToolbarOrientation = 'horizontal' | 'vertical';

interface ToolbarDefinition {
  id: string;
  label: string;
  defaultSide: ToolbarSide;
  hiddenByDefault?: boolean;
}

interface ToolbarSpot {
  side: ToolbarSide;
  index: number;
}

interface ToolbarLayout {
  v: 1;
  sides: Record<ToolbarSide, string[]>;
  hidden: string[];
  last: Record<string, ToolbarSpot>;
}

export type { ToolbarDefinition, ToolbarLayout, ToolbarOrientation, ToolbarSide, ToolbarSpot };
