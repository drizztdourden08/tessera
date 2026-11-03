/* @layer renderer-components @kind types */
import type { PointerEvent } from 'react';
import type { CellGeometry } from '../../cell-geometry';
import type { RulerBand } from '../ScrubRuler.type';

interface BandDrawSetup {
  cells: CellGeometry;
  total: number;
  onBandChange?: (band: RulerBand | null) => void;
}

interface BandDrawState {
  draft: RulerBand | null;
  press: (event: PointerEvent<HTMLElement>) => void;
}

export type { BandDrawSetup, BandDrawState };
