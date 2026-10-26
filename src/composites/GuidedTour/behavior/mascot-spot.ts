/* @layer renderer-components @kind logic */
import type { MascotFacing } from '../../../brand/motion/mascot-facing.type';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { RING_CLEARANCE } from '../GuidedTour.constants';
import { boxGap } from './box-gap';
import { mascotClear } from './mascot-clear';
import { mascotOutside } from './mascot-outside';
import type { MascotSpot, MascotStand, TourBox, TourSize } from './tour-internal.type';

const faceToward = (x: number, goal: TourBox): MascotFacing => (goal.x + goal.width / 2 < x ? 'left' : 'right');

const stands = (around: { bubble: TourBox; hole: TourBox | null }, view: TourSize, box: TourSize, gap: number): MascotStand[] => {
  const { bubble, hole } = around;
  const half = box.width / 2;
  const level = clampNumber(bubble.y + bubble.height - box.height, 0, view.height - box.height);
  const under = clampNumber(bubble.x + half, half, view.width - half);
  const beside: MascotStand[] = [[bubble.x - gap - half, level], [bubble.x + bubble.width + gap + half, level]];
  const aboveBelow: MascotStand[] = [[under, bubble.y + bubble.height + gap], [under, bubble.y - gap - box.height]];
  const flank: MascotStand[] = hole
    ? [
      [hole.x - RING_CLEARANCE - half, level],
      [hole.x + hole.width + RING_CLEARANCE + half, level],
      [under, hole.y - RING_CLEARANCE - box.height],
      [under, hole.y + hole.height + RING_CLEARANCE],
    ]
    : [];
  return [...beside, ...aboveBelow, ...flank];
};

const mascotSpot = (around: { bubble: TourBox; hole: TourBox | null }, view: TourSize, box: TourSize, gap: number): MascotSpot | null => {
  const { bubble, hole } = around;
  const half = box.width / 2;
  const boxAt = ([x, y]: MascotStand): TourBox => ({ x: x - half, y, width: box.width, height: box.height });
  const placed = stands(around, view, box, gap).filter(([x, y]) =>
    x - half >= 0 && x + half <= view.width && y >= 0 && y + box.height <= view.height && boxGap(boxAt([x, y]), bubble) > 0);
  const outside = placed.filter((stand) => mascotOutside(boxAt(stand), hole))
    .sort((a, b) => boxGap(boxAt(a), bubble) - boxGap(boxAt(b), bubble));
  const spot = outside[0] ?? placed.find((stand) => mascotClear(boxAt(stand), hole, bubble));
  return spot ? { x: spot[0], y: spot[1], face: faceToward(spot[0], hole ?? bubble) } : null;
};

export { mascotSpot };
