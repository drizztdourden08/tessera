/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { clampOklch } from './clamp-oklch';
import type { Oklch, Rgb } from './color-math.type';
import { linearToSrgb } from './linear-to-srgb';
import { oklchToLinear } from './oklch-to-linear';

const toChannel = (linear: number): number => clampNumber(Math.round(linearToSrgb(clampNumber(linear, 0, 1))), 0, 255);

const oklchToRgb = (lch: Oklch): Rgb => {
  const [r, g, b] = oklchToLinear(clampOklch(lch));
  return { r: toChannel(r), g: toChannel(g), b: toChannel(b) };
};

export { oklchToRgb };
