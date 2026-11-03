/* @layer renderer-components @kind types */
import type { MouseEvent } from 'react';
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

type RulerMarkerAnchor = 'center' | 'edge';

interface ScrubRulerProps {
  cells: CellGeometry;
  value: number;
  onChange?: (index: number) => void;
  tickLabel?: (index: number) => string;
  tickEvery?: number | 'auto';
  markers?: readonly RulerMarker[];
  onMarkerChange?: (id: string, index: number) => void;
  markerAnchor?: RulerMarkerAnchor;
  band?: RulerBand | null;
  onBandChange?: (band: RulerBand | null) => void;
  bandLabel?: (band: RulerBand) => string;
  secondBand?: RulerBand | null;
  onCellContextMenu?: (index: number, event: MouseEvent<HTMLElement>) => void;
  compact?: boolean;
  valueText?: (index: number, count: number) => string;
  label?: string;
  readOnly?: boolean;
  className?: string;
}

export type { RulerBand, RulerMarker, RulerMarkerAnchor, ScrubRulerProps };
