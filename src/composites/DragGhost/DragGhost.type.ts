/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface DragGhostPoint {
  x: number;
  y: number;
}

interface DragGhostProps {
  count: number;
  thumbnails?: readonly ReactNode[];
  point?: DragGhostPoint | null;
  className?: string;
}

export type { DragGhostPoint, DragGhostProps };
