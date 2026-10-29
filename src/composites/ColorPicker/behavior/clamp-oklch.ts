/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { Oklch } from './color-math.type';
import { CHROMA_STEPS } from './oklch.constants';
import { oklchInGamut } from './oklch-in-gamut';

const clampOklch = (lch: Oklch): Oklch => {
  const l = clampNumber(lch.l, 0, 1);
  const c = Math.max(0, lch.c);
  if (l === 0 || l === 1) return { l, c: 0, h: lch.h };
  if (oklchInGamut({ l, c, h: lch.h })) return { l, c, h: lch.h };
  let low = 0;
  let high = c;
  for (let step = 0; step < CHROMA_STEPS; step += 1) {
    const mid = (low + high) / 2;
    if (oklchInGamut({ l, c: mid, h: lch.h })) low = mid;
    else high = mid;
  }
  return { l, c: low, h: lch.h };
};

export { clampOklch };
