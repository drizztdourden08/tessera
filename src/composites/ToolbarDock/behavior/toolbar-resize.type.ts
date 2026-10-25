/* @layer renderer-components @kind types */
import type { ToolbarSide } from '../ToolbarDock.type';

type ToolbarEnd = 'start' | 'end';

interface ToolbarMetrics {
  spans: Record<ToolbarSide, number[]>;
}

interface ToolbarEndRange {
  value: number;
  min: number;
  max: number;
  span: number;
}

interface ToolbarEndBounds {
  value: number;
  lo: number;
  hi: number;
}

interface ToolbarGrip {
  id: string;
  end: ToolbarEnd;
}

export type { ToolbarEnd, ToolbarEndBounds, ToolbarEndRange, ToolbarGrip, ToolbarMetrics };
