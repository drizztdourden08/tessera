/* @layer renderer-components @kind types */
import type { PointerEvent } from 'react';
import type { CellGeometry } from '../../cell-geometry';
import type { RulerMarker, RulerMarkerAnchor } from '../ScrubRuler.type';

interface MarkerDragSetup {
  cells: CellGeometry;
  total: number;
  marker: RulerMarker;
  anchor?: RulerMarkerAnchor;
  readOnly: boolean;
  onMarkerChange?: (id: string, index: number) => void;
}

interface MarkerDragState {
  index: number;
  press: (event: PointerEvent<HTMLElement>) => void;
}

export type { MarkerDragSetup, MarkerDragState };
