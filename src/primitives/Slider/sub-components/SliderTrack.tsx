/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { Span } from '../../text-elements';
import { percentOf } from '../behavior/percent-of';
import { trackFraction } from '../behavior/track-fraction';
import { resolveSliderLabels } from './SliderLabels/behavior/resolve-slider-labels';
import { SliderLabels } from './SliderLabels';
import type { SliderTrackProps } from './SliderTrack.type';

const SliderTrack = (props: SliderTrackProps) => {
  const { scale, labels, span, readout, before, children, onTrackPick } = props;
  const { min, max, step, stops, formatValue } = scale;
  const points = useMemo(
    () => resolveSliderLabels(labels, { min, max, step, stops, formatValue }),
    [labels, min, max, step, stops, formatValue],
  );
  const fill = {
    '--slider-lo': `${percentOf(span[0], scale)}%`,
    '--slider-hi': `${percentOf(span[1], scale)}%`,
  } as CSSProperties;
  const pick = (event: PointerEvent<HTMLDivElement>) => {
    if (!onTrackPick || event.button !== 0 || event.target instanceof HTMLInputElement) return;
    event.preventDefault();
    onTrackPick(trackFraction(event.clientX, event.currentTarget.getBoundingClientRect()));
  };

  return (
    <div className={`slider__track${points.length > 0 ? ' slider__track--labelled' : ''}`}>
      {before}
      <div className="slider__rail" style={fill} onPointerDown={onTrackPick ? pick : undefined}>
        {children}
        {points.length > 0 && <SliderLabels points={points} scale={scale} span={span} />}
      </div>
      {readout !== null && <Span tone="primary" className="slider__value">{readout}</Span>}
    </div>
  );
};

export { SliderTrack };
