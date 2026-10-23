/* @layer renderer-components @kind constants */
import { drawShape } from './draw-shape';
import { NINTENDO_SHAPE } from './nintendo-shape.constants';
import { OFFSET_SHAPE } from './offset-shape.constants';
import { PAD_SHAPE } from './pad-shape.constants';
import { SYMMETRIC_SHAPE } from './symmetric-shape.constants';
import type { ControllerSilhouetteVariant, SilhouetteDrawing } from '../ControllerSilhouette.type';

const DRAWINGS: Readonly<Record<ControllerSilhouetteVariant, SilhouetteDrawing>> = {
  offset: drawShape(OFFSET_SHAPE),
  symmetric: drawShape(SYMMETRIC_SHAPE),
  nintendo: drawShape(NINTENDO_SHAPE),
  pad: drawShape(PAD_SHAPE),
};

export { DRAWINGS };
