/* @layer renderer-components @kind component */
import './ProgressBar.css';
import { paintStyle } from './behavior/paint-style';
import { partsOf } from './behavior/parts-of';
import { progressLayout } from './behavior/progress-layout';
import { progressValueText } from './behavior/progress-value-text';
import { toneOf } from './behavior/tone-of';
import type { ProgressBarProps } from './ProgressBar.type';
import { ProgressLegend } from './sub-components/ProgressLegend';
import { SecondaryFill } from './sub-components/SecondaryFill';

const withClass = (base: string, className: string | undefined): string => (className ? `${base} ${className}` : base);

const ProgressBar = (props: ProgressBarProps) => {
  const { max = 100, secondaryValue, secondaryTone, label, legend = false, live = false, className } = props;
  const multipart = props.parts !== undefined;
  const parts = partsOf(props);
  const { segments, total } = progressLayout(parts, max);
  const bar = (
    <div
      className={legend ? 'progress-bar' : withClass('progress-bar', className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={total}
      aria-valuetext={multipart ? progressValueText(parts, total, max) : undefined}
      data-live={live ? 'yes' : undefined}
    >
      <SecondaryFill value={secondaryValue} max={max} tone={secondaryTone} under={parts[0]} />
      {segments.map((segment, index) => (
        <div
          key={`${segment.label}-${index}`}
          className="progress-bar__fill"
          data-tone={toneOf(segment)}
          title={multipart ? segment.label : undefined}
          style={paintStyle(segment, { insetInlineStart: `${segment.start}%`, width: `${segment.width}%` })}
        />
      ))}
    </div>
  );
  if (!legend) return bar;
  return <div className={withClass('progress-bar-group', className)}>{bar}<ProgressLegend parts={parts} /></div>;
};

export { ProgressBar };
