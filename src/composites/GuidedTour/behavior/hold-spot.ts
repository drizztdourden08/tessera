/* @layer renderer-components @kind logic */
import type { MascotSpot } from './tour-internal.type';

const holdSpot = (held: MascotSpot | null, next: MascotSpot | null, slack: number): MascotSpot | null => {
  if (!held || !next) return next;
  const near = Math.abs(next.x - held.x) < slack && Math.abs(next.y - held.y) < slack;
  return near ? held : next;
};

export { holdSpot };
