/* @layer renderer-components @kind util */
import type { SliderScale } from '../../../behavior/slider-scale.type';

const markClass = (value: number, scale: SliderScale, span: readonly [number, number], shown: boolean): string => [
  'slider__mark',
  value <= scale.min && 'slider__mark--start',
  value >= scale.max && 'slider__mark--end',
  value >= span[0] && value <= span[1] && 'slider__mark--in',
  !shown && 'slider__mark--hidden',
].filter(Boolean).join(' ');

export { markClass };
