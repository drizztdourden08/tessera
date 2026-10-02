/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import { valueText } from '../../value-rule/value-text';
import type { SliderPartProps } from '../behavior/slider-part.type';
import { useRangeDrag } from '../behavior/useRangeDrag';
import { useRangeThumbs } from '../behavior/useRangeThumbs';
import { useSliderValue } from '../behavior/useSliderValue';
import type { SliderPair, SliderRangeProps } from '../Slider.type';
import { SliderThumb } from './SliderThumb';
import { SliderTrack } from './SliderTrack';

const pairOf = (pair: SliderPair | undefined): [number, number] | undefined => (pair ? [pair[0], pair[1]] : undefined);

const SliderRange = (part: SliderPartProps<SliderRangeProps>) => {
  const { props, scale, disabled, accessibleName } = part;
  const { value: given, defaultValue, onChange, keyStep, labels, showValue = true, id, name } = props;
  const [pair, setPair] = useSliderValue(pairOf(given), pairOf(defaultValue) ?? [scale.min, scale.max], onChange);
  const thumbs = useRangeThumbs(pair, setPair, scale);
  const drag = useRangeDrag(thumbs, scale, disabled);
  const edge = (which: string) => (accessibleName ? `${accessibleName} ${which}` : which);
  const shared = { scale, disabled, name, keyStep };

  return (
    <SliderTrack
      scale={scale}
      labels={labels}
      span={[thumbs.low, thumbs.high]}
      readout={showValue ? <>{valueText(thumbs.low, scale)}<Span className="slider__value-to" />{valueText(thumbs.high, scale)}</> : null}
      range
      rail={drag.rail}
    >
      <SliderThumb
        {...shared}
        ref={thumbs.lowRef}
        value={thumbs.low}
        id={id}
        label={edge('start')}
        onTop={thumbs.lowOnTop}
        hot={drag.hot === 'low'}
        onValue={thumbs.setLow}
        onFocus={() => thumbs.setActive('low')}
      />
      <SliderThumb
        {...shared}
        ref={thumbs.highRef}
        value={thumbs.high}
        label={edge('end')}
        onTop={!thumbs.lowOnTop}
        hot={drag.hot === 'high'}
        onValue={thumbs.setHigh}
        onFocus={() => thumbs.setActive('high')}
      />
    </SliderTrack>
  );
};

export { SliderRange };
