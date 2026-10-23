/* @layer renderer-components @kind logic */
import { arc } from './arc';
import { DEGREE, HALF_TURN } from './path.constants';
import type { BandSpec, Outline } from '../ControllerSilhouette.type';

const band = (spec: BandSpec): Outline => {
  const { cx, cy, outer, inner, from, to } = spec;
  const mid = (outer + inner) / 2;
  const cap = (outer - inner) / 2;
  const capAt = (angle: number) => [cx + mid * Math.cos(angle * DEGREE), cy + mid * Math.sin(angle * DEGREE)] as const;
  const [endX, endY] = capAt(to);
  const [startX, startY] = capAt(from);
  return {
    start: [cx + outer * Math.cos(from * DEGREE), cy + outer * Math.sin(from * DEGREE)],
    curves: [
      ...arc(cx, cy, outer, from, to),
      ...arc(endX, endY, cap, to, to + HALF_TURN),
      ...arc(cx, cy, inner, to, from),
      ...arc(startX, startY, cap, from + HALF_TURN, from + HALF_TURN * 2),
    ],
  };
};

export { band };
