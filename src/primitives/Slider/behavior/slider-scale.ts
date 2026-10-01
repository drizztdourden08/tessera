/* @layer renderer-components @kind util */
import type { SliderProps } from '../Slider.type';
import type { SliderScale } from './slider-scale.type';

const sliderScale = (props: SliderProps): SliderScale => {
  const { stops, min = 0, max = 100, step = 1, formatValue } = props;
  if (stops) return { min: 0, max: Math.max(0, stops.length - 1), step, stops, formatValue };
  return { min, max: Math.max(min, max), step, formatValue };
};

export { sliderScale };
