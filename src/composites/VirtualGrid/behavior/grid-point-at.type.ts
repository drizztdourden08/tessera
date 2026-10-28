/* @layer renderer-components @kind types */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { GridHeights, GridLayout } from './grid-layout.type';

type GridTarget =
  | { kind: 'gap'; index: number; section?: string }
  | { kind: 'into'; section: string };

interface GridPointInput {
  layout: GridLayout;
  heights: GridHeights;
  tileWidth: number;
  origin: Point;
  point: Point;
  sectionKeys: readonly string[];
  sectioned: boolean;
  canInto: (section: number) => boolean;
}

export type { GridPointInput, GridTarget };
