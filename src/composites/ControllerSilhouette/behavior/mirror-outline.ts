/* @layer renderer-components @kind logic */
import { flip } from './flip';
import type { Cubic, Outline } from '../ControllerSilhouette.type';

const mirrorCurve = (curve: Cubic): Cubic => [flip(curve[0]), curve[1], flip(curve[2]), curve[3], flip(curve[4]), curve[5]];

const mirrorOutline = (outline: Outline): Outline => ({
  start: [flip(outline.start[0]), outline.start[1]],
  curves: outline.curves.map(mirrorCurve),
});

export { mirrorOutline };
