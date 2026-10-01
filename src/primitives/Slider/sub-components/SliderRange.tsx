/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import type { SliderPartProps } from '../behavior/slider-part.type';
import { useRangeThumbs } from '../behavior/useRangeThumbs';
import { useSliderValue } from '../behavior/useSliderValue';
import { valueText } from '../behavior/value-text';
import type { SliderPair, SliderRangeProps } from '../Slider.type';
import { SliderThumb } from './SliderThumb';
import { SliderTrack } from './SliderTrack';

const pairOf = (pair: SliderPair | undefined): [number, number] | undefined => (pair ? [pair[0], pair[1]] : undefined);

const SliderRange = (part: SliderPartProps<SliderRangeProps>) => {
  const { props, scale, disabled, accessibleName } = part;
  const { value: given, defaultValue, onChange, keyStep, labels, showValue = true, id, name } = props;
  const [pair, setPair] = useSliderValue(pairOf(given), pairOf(defaultValue) ?? [scale.min, scale.max], onChange);
  const thumbs = useRangeThumbs(pair, setPair, scale);
  const edge = (which: string) => (accessibleName ? `${accessibleName} ${which}` : which);
  const shared = { scale, disabled, name, keyStep };

  return (
    <SliderTrack
      scale={scale}
      labels={labels}
      span={[thumbs.low, thumbs.high]}
      readout={showValue ? <>{valueText(thumbs.low, scale)}<Span className="slider__value-to" />{valueText(thumbs.high, scale)}</> : null}
      onTrackPick={disabled ? undefined : thumbs.pickTrack}
    >
      <SliderThumb {...shared} ref={thumbs.lowRef} value={thumbs.low} id={id} label={edge('start')} onTop={thumbs.lowOnTop} onValue={thumbs.setLow} onFocus={() => thumbs.setActive('low')} />
      <SliderThumb {...shared} ref={thumbs.highRef} value={thumbs.high} label={edge('end')} onTop={!thumbs.lowOnTop} onValue={thumbs.setHigh} onFocus={() => thumbs.setActive('high')} />
    </SliderTrack>
  );
};

export { SliderRange };
