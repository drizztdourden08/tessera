/* @layer renderer-components @kind logic */
import { arc } from './arc';
import { DEGREE, HALF_TURN } from './path.constants';
import type { BandSpec, Outline } from '../ControllerSilhouette.type';

const band = (spec: BandSpec): Outline => {
  const { cx, cy, outer, inner, from, to } = spec;
  const mid = (outer + inner) / 2;
  const cap = (outer - inner) / 2;
  const capAt = (angle: number) => ({ cx: cx + mid * Math.cos(angle * DEGREE), cy: cy + mid * Math.sin(angle * DEGREE), r: cap });
  return {
    start: [cx + outer * Math.cos(from * DEGREE), cy + outer * Math.sin(from * DEGREE)],
    curves: [
      ...arc({ cx, cy, r: outer, from, to }),
      ...arc({ ...capAt(to), from: to, to: to + HALF_TURN }),
      ...arc({ cx, cy, r: inner, from: to, to: from }),
      ...arc({ ...capAt(from), from: from + HALF_TURN, to: from + HALF_TURN * 2 }),
    ],
  };
};

export { band };
