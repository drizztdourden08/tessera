/* @layer renderer-components @kind logic */
import type { Oklch } from './color-math.type';
import { GAMUT_EPSILON } from './oklch.constants';
import { oklchToLinear } from './oklch-to-linear';

const oklchInGamut = (lch: Oklch): boolean =>
  oklchToLinear(lch).every((channel) => channel >= -GAMUT_EPSILON && channel <= 1 + GAMUT_EPSILON);

export { oklchInGamut };
