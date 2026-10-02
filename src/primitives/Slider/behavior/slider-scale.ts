/* @layer renderer-components @kind util */
import type { SliderProps } from '../Slider.type';
import type { ValueScale } from '../../value-rule/value-rule.type';

const sliderScale = (props: SliderProps): ValueScale => {
  const { stops, min = 0, max = 100, step = 1, formatValue } = props;
  if (stops) return { min: 0, max: Math.max(0, stops.length - 1), step, stops, formatValue };
  return { min, max: Math.max(min, max), step, formatValue };
};

export { sliderScale };
