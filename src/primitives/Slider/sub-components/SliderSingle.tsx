/* @layer renderer-components @kind component */
import { valueText } from '../../value-rule/value-text';
import type { SliderPartProps } from '../behavior/slider-part.type';
import { useSliderValue } from '../behavior/useSliderValue';
import type { SliderSingleProps } from '../Slider.type';
import { SliderThumb } from './SliderThumb';
import { SliderTrack } from './SliderTrack';

const SliderSingle = (part: SliderPartProps<SliderSingleProps>) => {
  const { props, scale, disabled, accessibleName } = part;
  const { value: given, defaultValue, onChange, keyStep, labels, showValue = true, id, name } = props;
  const [value, setValue] = useSliderValue(given, defaultValue ?? scale.min, onChange);

  return (
    <SliderTrack scale={scale} labels={labels} span={[scale.min, value]} readout={showValue ? valueText(value, scale) : null} range={false}>
      <SliderThumb value={value} scale={scale} disabled={disabled} label={accessibleName} id={id} name={name} keyStep={keyStep} onValue={setValue} />
    </SliderTrack>
  );
};

export { SliderSingle };
