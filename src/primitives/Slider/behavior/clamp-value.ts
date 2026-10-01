/* @layer renderer-components @kind util */
import { roundValue } from './round-value';
import type { SliderScale } from './slider-scale.type';

const clampValue = (value: number, scale: SliderScale): number => roundValue(Math.min(scale.max, Math.max(scale.min, value)));

export { clampValue };
