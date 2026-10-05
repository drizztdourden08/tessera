/* @layer renderer-components @kind constants */
import type { IconPathCircle } from '../Icon';

const DEFAULT_ASPECT_RATIO = '16 / 9';

const IMAGE_GLYPH_VIEWBOX = '0 0 24 24';

const IMAGE_GLYPH_PATHS: string[] = [
  'M4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11A2.5 2.5 0 0 1 4.5 4z',
  'M2 16l5-5 3.5 3.5 4-4.5 7.5 7',
];

const IMAGE_GLYPH_CIRCLES: IconPathCircle[] = [{ cx: 18, cy: 8, r: 1.5 }];

const IMAGE_GLYPH_STROKE = 1.5;

const BROKEN_BADGE_STROKE = 2.5;

export {
  BROKEN_BADGE_STROKE,
  DEFAULT_ASPECT_RATIO,
  IMAGE_GLYPH_CIRCLES,
  IMAGE_GLYPH_PATHS,
  IMAGE_GLYPH_STROKE,
  IMAGE_GLYPH_VIEWBOX,
};
