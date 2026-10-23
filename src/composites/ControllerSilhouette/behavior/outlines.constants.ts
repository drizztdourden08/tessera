/* @layer renderer-components @kind constants */
import { mirrorHalf } from './mirror-half';
import { NINTENDO_SHAPE } from './nintendo-shape.constants';
import { OFFSET_SHAPE } from './offset-shape.constants';
import { outlinePath } from './outline-path';
import { PAD_SHAPE } from './pad-shape.constants';
import { SYMMETRIC_SHAPE } from './symmetric-shape.constants';
import type { ControllerSilhouetteVariant } from '../ControllerSilhouette.type';

const OUTLINES: Readonly<Record<ControllerSilhouetteVariant, string>> = {
  offset: outlinePath(mirrorHalf(OFFSET_SHAPE)),
  symmetric: outlinePath(mirrorHalf(SYMMETRIC_SHAPE)),
  nintendo: outlinePath(mirrorHalf(NINTENDO_SHAPE)),
  pad: outlinePath(mirrorHalf(PAD_SHAPE)),
};

export { OUTLINES };
