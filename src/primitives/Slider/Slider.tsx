/* @layer renderer-components @kind data */
import '../../theme/control-size.css';
import '../../theme/slider-thumb.css';
import './Slider.css';
import { useControlSize } from '../field-control/useControlSize';
import { useHintTarget } from '../hint/useHintTarget';
import type { SliderProps } from './Slider.type';
import { SliderHeader } from './sub-components/SliderHeader';
import { SliderTrack } from './sub-components/SliderTrack';

const Slider = (props: SliderProps) => {
  const { label, description, disabled = false, size, hint, onHint, 'aria-label': ariaLabel, ...track } = props;
  const controlSize = useControlSize(size);
  const hintHandlers = useHintTarget<HTMLDivElement>({ hint, onHint });
  const name = label ? undefined : ariaLabel ?? hint?.label;

  return (
    <div className={['slider', `control-size--${controlSize}`, disabled && 'slider--disabled'].filter(Boolean).join(' ')} {...hintHandlers}>
      <SliderHeader label={label} description={description} />
      <SliderTrack {...track} disabled={disabled} name={name} />
    </div>
  );
};

export {
  Slider,
};
