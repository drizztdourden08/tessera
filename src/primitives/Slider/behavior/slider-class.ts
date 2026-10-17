/* @layer renderer-components @kind util */
import type { ControlSize } from '../../field-control/field-control.type';
import type { SliderProps } from '../Slider.type';

const sliderClass = (props: SliderProps, size: ControlSize, disabled: boolean): string => [
  'slider',
  `control-size--${size}`,
  props.range && 'slider--range',
  !props.range && props.orientation === 'vertical' && 'slider--vertical',
  disabled && 'slider--disabled',
  props.className,
].filter(Boolean).join(' ');

export { sliderClass };
