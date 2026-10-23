/* @layer renderer-components @kind logic */
import { flip } from './flip';
import type { Cubic, Outline, Point } from '../ControllerSilhouette.type';

const mirrorHalf = (half: Outline): Outline => {
  const ends: Point[] = [half.start, ...half.curves.map((curve): Point => [curve[4], curve[5]])];
  const back = half.curves.map((curve, index): Cubic => {
    const [x, y] = ends[index] ?? half.start;
    return [flip(curve[2]), curve[3], flip(curve[0]), curve[1], flip(x), y];
  });
  return { start: half.start, curves: [...half.curves, ...back.reverse()] };
};

export { mirrorHalf };
