/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import { MARK_CORNERS } from './swatch-marks.constants';
import type { SwatchCorner, SwatchCornerMarks, SwatchMark, SwatchMarks } from './swatch-marks.type';

const isShown = (content: ReactNode): boolean => content !== undefined && content !== null && content !== false && content !== '';

const isCornerMap = (marks: SwatchMarks): marks is SwatchCornerMarks => !Array.isArray(marks);

const contentAt = (marks: SwatchMarks | undefined, corner: SwatchCorner, index: number): ReactNode => {
  if (marks === undefined) return undefined;
  return isCornerMap(marks) ? marks[corner] : marks[index];
};

const swatchMarks = (marks: SwatchMarks | undefined): SwatchMark[] =>
  MARK_CORNERS.map((corner, index) => ({ corner, content: contentAt(marks, corner, index) })).filter((mark) => isShown(mark.content));

export { swatchMarks };
