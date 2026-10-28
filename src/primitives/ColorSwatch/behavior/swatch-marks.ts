/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { MARK_CORNERS } from './swatch-marks.constants';
import type { SwatchMark } from './swatch-marks.type';

const isShown = (content: ReactNode): boolean => content !== undefined && content !== null && content !== false && content !== '';

const swatchMarks = (marks: readonly ReactNode[] | undefined): SwatchMark[] =>
  MARK_CORNERS.map((corner, index) => ({ corner, content: marks?.[index] })).filter((mark) => isShown(mark.content));

export { swatchMarks };
