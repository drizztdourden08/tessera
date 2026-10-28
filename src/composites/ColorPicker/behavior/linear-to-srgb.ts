/* @layer renderer-components @kind logic */
import { SRGB_LINEAR_CUTOFF_OUT } from './oklch.constants';

const linearToSrgb = (linear: number): number => {
  const c = linear <= SRGB_LINEAR_CUTOFF_OUT ? linear * 12.92 : 1.055 * linear ** (1 / 2.4) - 0.055;
  return c * 255;
};

export { linearToSrgb };
