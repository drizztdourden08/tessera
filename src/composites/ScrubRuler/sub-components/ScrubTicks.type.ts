/* @layer renderer-components @kind types */
import type { CellGeometry } from '../../cell-geometry';

interface ScrubTicksProps {
  cells: CellGeometry;
  total: number;
  current: number;
  every: number | 'auto';
  tickLabel: (index: number) => string;
}

export type { ScrubTicksProps };
