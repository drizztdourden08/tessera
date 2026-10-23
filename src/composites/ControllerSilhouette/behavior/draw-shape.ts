/* @layer renderer-components @kind logic */
import { mirrorHalf } from './mirror-half';
import { mirrorOutline } from './mirror-outline';
import { outlinePath } from './outline-path';
import type { SilhouetteDrawing, SilhouetteShape } from '../ControllerSilhouette.type';

const drawShape = (shape: SilhouetteShape): SilhouetteDrawing => ({
  body: outlinePath(mirrorHalf(shape.half)),
  parts: shape.parts.flatMap((part) => [
    { kind: part.kind, d: outlinePath(mirrorOutline(part.outline)) },
    { kind: part.kind, d: outlinePath(part.outline) },
  ]),
});

export { drawShape };
