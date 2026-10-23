/* @layer renderer-components @kind logic */
import { VIEW_W } from '../ControllerSilhouette.constants';
import type { Cubic, Outline, Point } from '../ControllerSilhouette.type';

const flip = (x: number): number => VIEW_W - x;

const mirrorCurve = (curve: Cubic): Cubic => [flip(curve[0]), curve[1], flip(curve[2]), curve[3], flip(curve[4]), curve[5]];

const mirrorOutline = (outline: Outline): Outline => ({
  start: [flip(outline.start[0]), outline.start[1]],
  curves: outline.curves.map(mirrorCurve),
});

const mirrorHalf = (half: Outline): Outline => {
  const ends: Point[] = [half.start, ...half.curves.map((curve): Point => [curve[4], curve[5]])];
  const back = half.curves.map((curve, index): Cubic => [
    flip(curve[2]), curve[3], flip(curve[0]), curve[1], flip(ends[index][0]), ends[index][1],
  ]);
  return { start: half.start, curves: [...half.curves, ...back.reverse()] };
};

export { mirrorHalf, mirrorOutline };
