/* @layer root-config @kind logic */
import { DESCRIPTION_LINE, POINTS_BLOCK } from './review.constants';

const reviewTextFree = (file: string, source: string): string =>
  (file.endsWith('.stories.tsx') ? source.replace(POINTS_BLOCK, '').replace(DESCRIPTION_LINE, '') : source);

export { reviewTextFree };
