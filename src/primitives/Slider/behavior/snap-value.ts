/* @layer renderer-components @kind util */
import { clampValue } from './clamp-value';
import type { SliderScale } from './slider-scale.type';

const snapValue = (raw: number, scale: SliderScale): number =>
  clampValue(scale.min + Math.round((raw - scale.min) / scale.step) * scale.step, scale);

export { snapValue };
