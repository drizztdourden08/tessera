/* @layer renderer-components @kind types */
import type { Rect } from '../DockLayout.type';

type SnapAxis = 'x' | 'y';

interface SnapLine {
  at: number;
  from: number;
  to: number;
}

interface SnapLines {
  x: SnapLine[];
  y: SnapLine[];
}

interface SnapEdges {
  x: number[];
  y: number[];
}

interface SnapGuide extends SnapLine {
  axis: SnapAxis;
}

interface FloatSnap {
  distance: number;
  targets: Rect[];
}

export type { FloatSnap, SnapAxis, SnapEdges, SnapGuide, SnapLine, SnapLines };
