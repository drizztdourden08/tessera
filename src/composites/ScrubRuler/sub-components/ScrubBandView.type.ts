/* @layer renderer-components @kind types */
import type { CellGeometry } from '../../cell-geometry';
import type { RulerBand } from '../ScrubRuler.type';

interface ScrubBandViewProps {
  cells: CellGeometry;
  total: number;
  band: RulerBand;
  draft: boolean;
  second?: boolean;
  title: string;
  onClear?: () => void;
}

export type { ScrubBandViewProps };
