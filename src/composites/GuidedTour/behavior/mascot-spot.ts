/* @layer renderer-components @kind logic */
import type { MascotFacing } from '../../../brand/motion/mascot-facing.type';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { mascotClear } from './mascot-clear';
import type { MascotSpot, MascotStand, TourBox, TourSize } from './tour-internal.type';

const faceToward = (x: number, goal: TourBox): MascotFacing => (goal.x + goal.width / 2 < x ? 'left' : 'right');

const stands = (around: { bubble: TourBox; hole: TourBox | null }, view: TourSize, box: TourSize, gap: number): MascotStand[] => {
  const { bubble, hole } = around;
  const half = box.width / 2;
  const level = clampNumber(bubble.y + bubble.height - box.height, 0, view.height - box.height);
  const under = clampNumber(bubble.x + half, half, view.width - half);
  const beside: MascotStand[] = [[bubble.x - gap - half, level], [bubble.x + bubble.width + gap + half, level]];
  const aboveBelow: MascotStand[] = [[under, bubble.y + bubble.height + gap], [under, bubble.y - gap - box.height]];
  const byHole: MascotStand[] = hole ? [[hole.x - gap - half, level], [hole.x + hole.width + gap + half, level]] : [];
  return [...beside, ...aboveBelow, ...byHole];
};

const mascotSpot = (around: { bubble: TourBox; hole: TourBox | null }, view: TourSize, box: TourSize, gap: number): MascotSpot | null => {
  const { bubble, hole } = around;
  const half = box.width / 2;
  const fits = ([x, y]: MascotStand): boolean =>
    x - half >= 0 && x + half <= view.width && y >= 0 && y + box.height <= view.height
    && mascotClear({ x: x - half, y, width: box.width, height: box.height }, hole, bubble);
  const spot = stands(around, view, box, gap).find(fits);
  return spot ? { x: spot[0], y: spot[1], face: faceToward(spot[0], hole ?? bubble) } : null;
};

export { mascotSpot };
