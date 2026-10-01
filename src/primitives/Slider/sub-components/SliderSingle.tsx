/* @layer renderer-components @kind component */
import type { SliderPartProps } from '../behavior/slider-part.type';
import { useMuteToggle } from '../behavior/useMuteToggle';
import { useSliderValue } from '../behavior/useSliderValue';
import { valueText } from '../behavior/value-text';
import type { SliderSingleProps } from '../Slider.type';
import { SliderMute } from './SliderMute';
import { SliderThumb } from './SliderThumb';
import { SliderTrack } from './SliderTrack';

const SliderSingle = (part: SliderPartProps<SliderSingleProps>) => {
  const { props, scale, disabled, accessibleName } = part;
  const { value: given, defaultValue, onChange, mute, onMuteToggle, keyStep, labels, showValue = true, id, name } = props;
  const [value, setValue] = useSliderValue(given, defaultValue ?? scale.min, onChange);
  const handleMuteClick = useMuteToggle(value, setValue, onMuteToggle);

  return (
    <SliderTrack
      scale={scale}
      labels={labels}
      span={[scale.min, value]}
      readout={showValue ? valueText(value, scale) : null}
      before={mute != null && <SliderMute mute={mute} disabled={disabled} onClick={handleMuteClick} />}
    >
      <SliderThumb value={value} scale={scale} disabled={disabled} label={accessibleName} id={id} name={name} keyStep={keyStep} onValue={setValue} />
    </SliderTrack>
  );
};

export { SliderSingle };
