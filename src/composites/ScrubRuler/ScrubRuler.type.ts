/* @layer renderer-components @kind types */
import type { TagCategoryColor } from '../../primitives/Tag';
import type { CellGeometry } from '../cell-geometry';

interface RulerMarker {
  id: string;
  index: number;
  min: number;
  max: number;
  label: string;
  tone?: TagCategoryColor;
}

interface RulerBand {
  from: number;
  to: number;
}

interface ScrubRulerProps {
  cells: CellGeometry;
  value: number;
  onChange?: (index: number) => void;
  tickLabel?: (index: number) => string;
  tickEvery?: number | 'auto';
  markers?: readonly RulerMarker[];
  onMarkerChange?: (id: string, index: number) => void;
  band?: RulerBand | null;
  onBandChange?: (band: RulerBand | null) => void;
  bandLabel?: (band: RulerBand) => string;
  valueText?: (index: number, count: number) => string;
  label?: string;
  readOnly?: boolean;
  className?: string;
}

export type { RulerBand, RulerMarker, ScrubRulerProps };
