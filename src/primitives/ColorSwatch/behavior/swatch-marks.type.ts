/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MARK_CORNERS } from './swatch-marks.constants';

interface SwatchMark {
  corner: (typeof MARK_CORNERS)[number];
  content: ReactNode;
}

export type { SwatchMark };
