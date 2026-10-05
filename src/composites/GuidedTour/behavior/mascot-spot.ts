/* @layer renderer-components @kind logic */
import type { MascotFacing } from '../../../brand/motion/mascot-facing.type';
import type { MascotSpot, TourBox, TourSize } from './tour-internal.type';

const clamp = (value: number, low: number, high: number): number => Math.min(Math.max(value, low), Math.max(low, high));

const overlaps = (a: TourBox, b: TourBox | null): boolean =>
  b !== null && a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

const faceToward = (x: number, goal: TourBox): MascotFacing => (goal.x + goal.width / 2 < x ? 'left' : 'right');

const mascotSpot = (around: { bubble: TourBox; hole: TourBox | null }, view: TourSize, box: TourSize, gap: number): MascotSpot => {
  const { bubble, hole } = around;
  const half = box.width / 2;
  const y = clamp(bubble.y + bubble.height - box.height, 0, view.height - box.height);
  const sides = [bubble.x - gap - half, bubble.x + bubble.width + gap + half];
  const fits = (x: number): boolean =>
    x - half >= 0 && x + half <= view.width && !overlaps({ x: x - half, y, width: box.width, height: box.height }, hole);
  const x = sides.find(fits);
  const goal = hole ?? bubble;
  if (x !== undefined) return { x, y, face: faceToward(x, goal) };
  const below = bubble.y + bubble.height + gap;
  const under = clamp(bubble.x + half, half, view.width - half);
  const at = below + box.height <= view.height ? below : clamp(bubble.y - gap - box.height, 0, view.height - box.height);
  return { x: under, y: at, face: faceToward(under, goal) };
};

export { mascotSpot };
