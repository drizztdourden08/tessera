/* @layer renderer-components @kind types */
import type { PointerEvent } from 'react';
import type { CellGeometry } from '../../cell-geometry';

interface ScrubDragSetup {
  cells: CellGeometry;
  total: number;
  value: number;
  onChange?: (index: number) => void;
}

interface ScrubDragState {
  scrubbing: boolean;
  press: (event: PointerEvent<HTMLElement>) => void;
}

export type { ScrubDragSetup, ScrubDragState };
