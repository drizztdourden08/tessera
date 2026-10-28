/* @layer renderer-components @kind logic */
import { SRGB_LINEAR_CUTOFF } from './oklch.constants';

const srgbToLinear = (channel: number): number => {
  const c = channel / 255;
  return c <= SRGB_LINEAR_CUTOFF ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export { srgbToLinear };
