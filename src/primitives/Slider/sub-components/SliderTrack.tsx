/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { ScaleLabels } from '../../ScaleLabels';
import { Span } from '../../text-elements';
import { percentAlong } from '../../value-rule/percent-along';
import { readoutChars } from '../behavior/readout-chars';
import type { SliderTrackProps } from './SliderTrack.type';

const SliderTrack = (props: SliderTrackProps) => {
  const { scale, labels, span, readout, range, rail, children } = props;
  const { min, max, step, stops, formatValue } = scale;
  const chars = useMemo(() => readoutChars({ min, max, step, stops, formatValue }, range), [min, max, step, stops, formatValue, range]);
  const fill = {
    '--slider-lo': `${percentAlong(span[0], scale)}%`,
    '--slider-hi': `${percentAlong(span[1], scale)}%`,
  } as CSSProperties;

  return (
    <div className="slider__track" style={{ '--slider-readout': `${chars}ch` } as CSSProperties}>
      <div className="slider__body">
        <div className="slider__rail" style={fill} {...rail}>
          {children}
        </div>
        <ScaleLabels className="slider__scale" min={min} max={max} step={step} stops={stops} formatValue={formatValue} labels={labels} highlight={span} />
      </div>
      {readout !== null && <Span tone="primary" className="slider__value">{readout}</Span>}
    </div>
  );
};

export { SliderTrack };
