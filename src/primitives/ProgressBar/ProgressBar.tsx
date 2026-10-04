/* @layer renderer-components @kind component */
import './ProgressBar.css';
import { share } from './behavior/share';
import type { ProgressBarProps } from './ProgressBar.type';
import { SecondaryFill } from './sub-components/SecondaryFill';

const ProgressBar = (props: ProgressBarProps) => {
  const { value, max = 100, tone = 'primary', secondaryValue, secondaryTone, label, live = false, className } = props;
  return (
    <div
      className={className ? `progress-bar ${className}` : 'progress-bar'}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(Math.max(0, value), Math.max(0, max))}
      data-live={live ? 'yes' : undefined}
    >
      <SecondaryFill value={secondaryValue} max={max} tone={secondaryTone ?? tone} faded={secondaryTone === undefined} />
      <div className="progress-bar__fill" data-tone={tone} style={{ width: `${share(value, max)}%` }} />
    </div>
  );
};

export { ProgressBar };
