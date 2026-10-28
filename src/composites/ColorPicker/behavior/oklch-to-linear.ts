/* @layer renderer-components @kind logic */
import { applyMatrix } from './apply-matrix';
import type { Triple } from './apply-matrix.type';
import type { Oklch } from './color-math.type';
import { LAB_TO_LMS, LMS_TO_LINEAR } from './oklch.constants';

const oklchToLinear = (lch: Oklch): Triple => {
  const radians = (lch.h * Math.PI) / 180;
  const lms = applyMatrix(LAB_TO_LMS, [lch.l, lch.c * Math.cos(radians), lch.c * Math.sin(radians)]);
  return applyMatrix(LMS_TO_LINEAR, [lms[0] ** 3, lms[1] ** 3, lms[2] ** 3]);
};

export { oklchToLinear };
