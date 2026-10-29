/* @layer renderer-components @kind logic */
import { applyMatrix } from './apply-matrix';
import type { Oklch, Rgb } from './color-math.type';
import { LINEAR_TO_LMS, LMS_TO_LAB } from './oklch.constants';
import { NEUTRAL_CHROMA } from './rgb-to-oklch.constants';
import { srgbToLinear } from './srgb-to-linear';

const rgbToOklch = (rgb: Rgb): Oklch => {
  const lms = applyMatrix(LINEAR_TO_LMS, [srgbToLinear(rgb.r), srgbToLinear(rgb.g), srgbToLinear(rgb.b)]);
  const [l, a, b] = applyMatrix(LMS_TO_LAB, [Math.cbrt(lms[0]), Math.cbrt(lms[1]), Math.cbrt(lms[2])]);
  const c = Math.hypot(a, b);
  if (c < NEUTRAL_CHROMA) return { l, c: 0, h: 0 };
  const degrees = (Math.atan2(b, a) * 180) / Math.PI;
  return { l, c, h: degrees < 0 ? degrees + 360 : degrees };
};

export { rgbToOklch };
