/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import './SliderLabels.css';
import { percentOf } from '../../behavior/percent-of';
import { markClass } from './behavior/mark-class';
import { useLabelFit } from './behavior/useLabelFit';
import type { SliderLabelsProps } from './SliderLabels.type';

const SliderLabels = (props: SliderLabelsProps) => {
  const { points, scale, span } = props;
  const ref = useRef<HTMLDivElement>(null);
  const shown = useLabelFit(ref, points.map((point) => point.value).join(' '));

  return (
    <div ref={ref} className="slider__marks" aria-hidden="true">
      {points.map((point, index) => (
        <span
          key={`${point.value}-${index}`}
          className={markClass(point.value, scale, span, shown?.[index] ?? true)}
          style={{ '--slider-at': `${percentOf(point.value, scale)}%` } as CSSProperties}
        >
          <span className="slider__mark-text">{point.label}</span>
        </span>
      ))}
    </div>
  );
};

export { SliderLabels };
