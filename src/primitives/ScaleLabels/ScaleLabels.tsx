/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import './ScaleLabels.css';
import { percentAlong } from '../value-rule/percent-along';
import { markClass } from './behavior/mark-class';
import { resolveScaleLabels } from './behavior/resolve-scale-labels';
import { useLabelFit } from './behavior/useLabelFit';
import type { ScaleLabelsProps } from './ScaleLabels.type';

const ScaleLabels = (props: ScaleLabelsProps) => {
  const { min, max, step = 1, stops, formatValue, labels, orientation = 'horizontal', thin = true, ticks = true, highlight, className } = props;
  const scale = useMemo(() => ({ min, max: Math.max(min, max), step, stops, formatValue }), [min, max, step, stops, formatValue]);
  const points = useMemo(() => resolveScaleLabels(labels, scale), [labels, scale]);
  const ref = useRef<HTMLDivElement>(null);
  const shown = useLabelFit(ref, points.map((point) => point.value).join(' '), orientation, thin);
  if (points.length === 0) return null;
  const classes = ['scale-labels', `scale-labels--${orientation}`, !ticks && 'scale-labels--bare', className];

  return (
    <div ref={ref} className={classes.filter(Boolean).join(' ')} aria-hidden="true">
      {points.map((point, index) => (
        <span
          key={`${point.value}-${index}`}
          className={markClass(point.value, scale, highlight, shown?.[index] ?? true)}
          style={{ '--scale-at': `${percentAlong(point.value, scale)}%` } as CSSProperties}
        >
          <span className="scale-labels__text">{point.label}</span>
        </span>
      ))}
    </div>
  );
};

export { ScaleLabels };
