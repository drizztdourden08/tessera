/* @layer renderer-components @kind types */
import type { CellGeometry } from '../../cell-geometry';
import type { RulerMarker } from '../ScrubRuler.type';

interface ScrubMarkerProps {
  cells: CellGeometry;
  total: number;
  marker: RulerMarker;
  value: number;
  readOnly: boolean;
  onMarkerChange?: (id: string, index: number) => void;
}

export type { ScrubMarkerProps };
