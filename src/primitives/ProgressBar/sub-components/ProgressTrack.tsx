/* @layer renderer-components @kind component */
import { share } from '../behavior/share';
import type { ProgressTrackProps } from './ProgressTrack.type';
import { SecondaryFill } from './SecondaryFill';

const ProgressTrack = (props: ProgressTrackProps) => {
  const { value, max = 100, tone = 'primary', secondaryValue, secondaryTone, label, live, indeterminate, valueText, className } = props;
  return (
    <div
      className={className ? `progress-bar ${className}` : 'progress-bar'}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : Math.min(Math.max(0, value), Math.max(0, max))}
      aria-valuetext={valueText}
      data-live={live ? 'yes' : undefined}
      data-indeterminate={indeterminate ? 'yes' : undefined}
    >
      <SecondaryFill value={secondaryValue} max={max} tone={secondaryTone ?? tone} faded={secondaryTone === undefined} />
      <div className="progress-bar__fill" data-tone={tone} style={indeterminate ? undefined : { width: `${share(value, max)}%` }} />
    </div>
  );
};

export { ProgressTrack };
