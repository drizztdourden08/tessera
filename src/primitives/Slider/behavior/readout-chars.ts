/* @layer renderer-components @kind util */
import type { ValueScale } from '../../value-rule/value-rule.type';
import { valueText } from '../../value-rule/value-text';
import { READOUT_SAMPLES } from '../Slider.constants';
import { clampValue } from './clamp-value';

const sampleValues = (scale: ValueScale): number[] => {
  const steps = Math.max(0, Math.floor((scale.max - scale.min) / scale.step + 1e-9));
  const count = Math.min(steps + 1, READOUT_SAMPLES);
  const picks = Array.from({ length: count }, (_, index) => {
    const at = count === 1 ? 0 : Math.round((index * steps) / (count - 1));
    return clampValue(scale.min + at * scale.step, scale);
  });
  return [...picks, scale.max];
};

const readoutChars = (scale: ValueScale, range: boolean): number => {
  const widest = Math.max(...sampleValues(scale).map((value) => [...valueText(value, scale)].length));
  return range ? widest * 2 + 1 : widest;
};

export { readoutChars };
