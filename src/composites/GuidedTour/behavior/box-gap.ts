/* @layer renderer-components @kind logic */
import type { TourBox } from './tour-internal.type';

const boxGap = (a: TourBox, b: TourBox): number =>
  Math.hypot(
    Math.max(0, a.x - (b.x + b.width), b.x - (a.x + a.width)),
    Math.max(0, a.y - (b.y + b.height), b.y - (a.y + a.height)),
  );

export { boxGap };
