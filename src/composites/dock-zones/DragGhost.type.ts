/* @layer renderer-components @kind types */
import type { Point } from '../rect-drag/rect-drag.type';

interface DragGhostProps {
  pointer: Point;
  label: string;
  swap: boolean;
  overlay: boolean;
  plain?: boolean;
}

export type { DragGhostProps };
