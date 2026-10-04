/* @layer renderer-components @kind component */
import { memo } from 'react';
import { ARC, ARC_LENGTH, ARC_STROKE, VIEW_BOX } from '../Gauge.constants';
import type { GaugeDialProps } from './GaugeDial.type';

const GaugeDialView = (props: GaugeDialProps) => {
  const { fraction, zones } = props;
  return (
    <svg className="gauge__arc" viewBox={VIEW_BOX} aria-hidden focusable="false">
      <path className="gauge__track" d={ARC} pathLength={ARC_LENGTH} strokeWidth={ARC_STROKE} />
      {zones.map((zone) => (
        <path
          key={zone.tone}
          className="gauge__zone"
          data-tone={zone.tone}
          d={ARC}
          pathLength={ARC_LENGTH}
          strokeWidth={ARC_STROKE}
          strokeDasharray={`${zone.length} ${ARC_LENGTH * 2}`}
          strokeDashoffset={-zone.start}
        />
      ))}
      <path
        className="gauge__fill"
        d={ARC}
        pathLength={ARC_LENGTH}
        strokeWidth={ARC_STROKE}
        strokeDasharray={`${ARC_LENGTH} ${ARC_LENGTH * 2}`}
        strokeDashoffset={ARC_LENGTH * (1 - fraction)}
        data-empty={fraction > 0 ? undefined : ''}
      />
    </svg>
  );
};

const GaugeDial = memo(GaugeDialView);

export { GaugeDial };
