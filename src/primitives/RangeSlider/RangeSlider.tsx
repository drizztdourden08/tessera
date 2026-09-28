/* @layer renderer-components @kind component */
import '../../theme/slider-thumb.css';
import './RangeSlider.css';
import type { CSSProperties } from 'react';
import type { RangeSliderProps } from './RangeSlider.type';
import { rangePercent } from './behavior/range-percent';
import { useRangeThumbs } from './behavior/useRangeThumbs';
import { RangeThumb } from './sub-components/RangeThumb';
import { RangeTicks } from './sub-components/RangeTicks';

const RangeSlider = (props: RangeSliderProps) => {
  const {
    stops, value, onChange, disabled = false, step = 1, labelEvery, ariaLabel, className = '',
  } = props;
  const [low, high] = value;
  const last = Math.max(0, stops.length - 1);
  const thumbs = useRangeThumbs(value, onChange, last, step);

  const lowOnTop = low === high && (high === last || (low !== 0 && thumbs.active === 'low'));
  const fill = {
    '--range-lo': `${rangePercent(low, last)}%`,
    '--range-hi': `${rangePercent(high, last)}%`,
  } as CSSProperties;

  return (
    <div className={`range-slider${disabled ? ' range-slider--disabled' : ''}${className ? ` ${className}` : ''}`}>
      <div className="range-slider__track" style={fill}>
        <RangeThumb
          value={low}
          last={last}
          disabled={disabled}
          onTop={lowOnTop}
          edge="start"
          ariaLabel={ariaLabel}
          valueText={stops[low]}
          onValue={thumbs.setLow}
          onFocus={() => thumbs.setActive('low')}
          onKeyDown={thumbs.handleKey('low')}
        />
        <RangeThumb
          value={high}
          last={last}
          disabled={disabled}
          onTop={!lowOnTop}
          edge="end"
          ariaLabel={ariaLabel}
          valueText={stops[high]}
          onValue={thumbs.setHigh}
          onFocus={() => thumbs.setActive('high')}
          onKeyDown={thumbs.handleKey('high')}
        />
      </div>
      <RangeTicks stops={stops} low={low} high={high} labelEvery={labelEvery} />
    </div>
  );
};

export { RangeSlider };
