/* @layer renderer-components @kind types */
import type { CellGeometry } from '../../cell-geometry';
import type { RulerBand, ScrubRulerProps } from '../ScrubRuler.type';

interface ScrubBandSlotProps extends Pick<ScrubRulerProps, 'bandLabel' | 'onBandChange'> {
  cells: CellGeometry;
  total: number;
  band: RulerBand | null;
  draft: boolean;
  readOnly: boolean;
}

export type { ScrubBandSlotProps };
