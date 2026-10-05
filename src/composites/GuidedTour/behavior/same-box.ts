/* @layer renderer-components @kind logic */
import type { TourBox } from './tour-internal.type';

const sameBox = (a: TourBox | null, b: TourBox | null): boolean =>
  a === b || (a !== null && b !== null && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height);

export { sameBox };
