/* @layer renderer-components @kind types */
import type { GridLayout } from './grid-layout.type';

interface GridPress {
  page: number;
  ctrl: boolean;
}

interface GridStep extends GridPress {
  layout: GridLayout;
  active: number;
  row: number;
  column: number;
}

type GridMove = (step: GridStep) => number;

export type { GridMove, GridPress, GridStep };
