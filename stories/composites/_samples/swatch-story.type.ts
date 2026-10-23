/* @layer stories @kind types */
import type { SwatchRange } from '../../../src/composites';
import type { ControlSize } from '../../../src/primitives/field-control/field-control.type';

type PaletteSet = 'sixteen' | 'clear' | 'full' | 'none';

type SwatchArgs = {
  palette: PaletteSet;
  size: ControlSize;
  showIndex: boolean;
};

interface SwatchPaletteProps {
  palette?: PaletteSet;
  size?: ControlSize;
  showIndex?: boolean;
  columns?: number;
  tall?: boolean;
  startRange?: SwatchRange;
}

export type { PaletteSet, SwatchArgs, SwatchPaletteProps };
