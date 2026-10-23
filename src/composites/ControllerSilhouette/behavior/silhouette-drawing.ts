/* @layer renderer-components @kind logic */
import { mirrorHalf, mirrorOutline } from './mirror';
import { NINTENDO_SHAPE } from './nintendo-shape.constants';
import { OFFSET_SHAPE } from './offset-shape.constants';
import { outlinePath } from './outline-path';
import { PAD_SHAPE } from './pad-shape.constants';
import { SYMMETRIC_SHAPE } from './symmetric-shape.constants';
import type { ControllerSilhouetteVariant, SilhouetteDrawing, SilhouetteShape } from '../ControllerSilhouette.type';

const draw = (shape: SilhouetteShape): SilhouetteDrawing => ({
  body: outlinePath(mirrorHalf(shape.half)),
  parts: shape.parts.flatMap((part) => [
    { kind: part.kind, d: outlinePath(mirrorOutline(part.outline)) },
    { kind: part.kind, d: outlinePath(part.outline) },
  ]),
});

const DRAWINGS: Readonly<Record<ControllerSilhouetteVariant, SilhouetteDrawing>> = {
  offset: draw(OFFSET_SHAPE),
  symmetric: draw(SYMMETRIC_SHAPE),
  nintendo: draw(NINTENDO_SHAPE),
  pad: draw(PAD_SHAPE),
};

const silhouetteDrawing = (variant: ControllerSilhouetteVariant): SilhouetteDrawing => DRAWINGS[variant];

export { silhouetteDrawing };
