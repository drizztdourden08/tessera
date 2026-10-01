/* @layer renderer-components @kind util */
import { roundValue } from './round-value';
import type { SliderScale } from './slider-scale.type';

const valueText = (value: number, scale: SliderScale): string => {
  const stop = scale.stops?.[Math.round(value)];
  if (stop !== undefined) return stop;
  return scale.formatValue ? scale.formatValue(value) : String(roundValue(value));
};

export { valueText };
