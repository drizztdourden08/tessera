/* @layer renderer-components @kind data */
import '../../theme/control-size.css';
import '../../theme/slider-thumb.css';
import './Slider.css';
import { useControlSize } from '../field-control/useControlSize';
import { useHintTarget } from '../hint/useHintTarget';
import { sliderScale } from './behavior/slider-scale';
import type { SliderProps } from './Slider.type';
import { SliderHeader } from './sub-components/SliderHeader';
import { SliderRange } from './sub-components/SliderRange';
import { SliderSingle } from './sub-components/SliderSingle';

const Slider = (props: SliderProps) => {
  const { label, description, disabled = false, size, hint, onHint, className, 'aria-label': ariaLabel } = props;
  const controlSize = useControlSize(size);
  const hintHandlers = useHintTarget<HTMLDivElement>({ hint, onHint });
  const part = { scale: sliderScale(props), disabled, accessibleName: ariaLabel ?? label ?? hint?.label };
  const classes = ['slider', `control-size--${controlSize}`, props.range && 'slider--range', disabled && 'slider--disabled', className];

  return (
    <div className={classes.filter(Boolean).join(' ')} {...hintHandlers}>
      <SliderHeader label={label} description={description} />
      {props.range ? <SliderRange {...part} props={props} /> : <SliderSingle {...part} props={props} />}
    </div>
  );
};

export {
  Slider,
};
