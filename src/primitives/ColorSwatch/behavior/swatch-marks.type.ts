/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MARK_CORNERS } from './swatch-marks.constants';

type SwatchCorner = (typeof MARK_CORNERS)[number];

type SwatchCornerMarks = Partial<Record<SwatchCorner, ReactNode>>;

type SwatchMarks = readonly ReactNode[] | SwatchCornerMarks;

interface SwatchMark {
  corner: SwatchCorner;
  content: ReactNode;
}

export type { SwatchCorner, SwatchCornerMarks, SwatchMark, SwatchMarks };
