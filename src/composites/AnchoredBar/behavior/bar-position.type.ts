/* @layer renderer-components @kind types */
import type { AnchoredRect } from '../../../primitives/Anchored';
import type { BarDock, BarPlacement } from '../AnchoredBar.type';

interface BarSize {
  width: number;
  height: number;
}

interface BarSpot {
  left: number;
  top: number;
  docked: boolean;
  parked: boolean;
}

interface BarPositionInput {
  anchor: AnchoredRect | null;
  bounds: AnchoredRect;
  size: BarSize;
  margin: number;
  gap: number;
  placement: BarPlacement;
  dock: BarDock;
}

export type { BarPositionInput, BarSize, BarSpot };
