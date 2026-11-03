/* @layer renderer-components @kind types */
import type { KeyboardEvent, PointerEvent } from 'react';
import type { CellGeometry } from '../../cell-geometry';
import type { RulerBand } from '../ScrubRuler.type';

interface ScrubRulerSetup {
  cells: CellGeometry;
  total: number;
  value: number;
  readOnly: boolean;
  onChange?: (index: number) => void;
  onBandChange?: (band: RulerBand | null) => void;
}

interface ScrubRulerState {
  scrubbing: boolean;
  draftBand: RulerBand | null;
  press: (event: PointerEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { ScrubRulerSetup, ScrubRulerState };
