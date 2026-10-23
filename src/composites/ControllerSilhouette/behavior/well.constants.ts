/* @layer renderer-components @kind constants */
import type { ControllerSilhouetteAnchorId, SilhouetteWellKind } from '../ControllerSilhouette.type';

const WELL_KIND: Readonly<Partial<Record<ControllerSilhouetteAnchorId, SilhouetteWellKind>>> = {
  'stick.left': 'stick',
  'stick.right': 'stick',
  'dpad': 'dish',
  'face': 'dish',
  'meta.view': 'pill',
  'meta.menu': 'pill',
  'meta.guide': 'button',
  'meta.capture': 'square',
};

const STICK_FLOOR = 0.66;
const PILL_HALF_W = 1.5;
const PILL_HALF_H = 0.8;
const SQUARE_CORNER = 0.4;

export { PILL_HALF_H, PILL_HALF_W, SQUARE_CORNER, STICK_FLOOR, WELL_KIND };
