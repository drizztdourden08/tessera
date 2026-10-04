/* @layer renderer-components @kind component */
import './ProgressBar.css';
import { Span } from '../text-elements';
import { percentText } from './behavior/percent-text';
import type { ProgressBarProps } from './ProgressBar.type';
import { ProgressTrack } from './sub-components/ProgressTrack';

const ProgressBar = (props: ProgressBarProps) => {
  const { showValue = false, formatValue = percentText, className, ...track } = props;
  if (!showValue || track.indeterminate) return <ProgressTrack {...track} className={className} />;
  const text = formatValue(track.value, track.max ?? 100);
  return (
    <div className={className ? `progress-bar-row ${className}` : 'progress-bar-row'}>
      <ProgressTrack {...track} valueText={text} />
      <Span className="progress-bar__value" aria-hidden="true">{text}</Span>
    </div>
  );
};

export { ProgressBar };
