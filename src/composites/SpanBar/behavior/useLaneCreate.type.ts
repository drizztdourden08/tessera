/* @layer renderer-components @kind types */
import type { PointerEvent } from 'react';
import type { CellGeometry, CellSpan } from '../../cell-geometry';

interface LaneCreateSetup {
  cells: CellGeometry;
  total: number;
  readOnly: boolean;
  onCreate?: (span: CellSpan) => void;
}

interface LaneCreateState {
  draft: CellSpan | null;
  press: (event: PointerEvent<HTMLElement>) => void;
}

export type { LaneCreateSetup, LaneCreateState };
