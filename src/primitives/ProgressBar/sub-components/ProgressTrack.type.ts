/* @layer renderer-components @kind types */
import type { ProgressBarProps } from '../ProgressBar.type';

interface ProgressTrackProps extends Omit<ProgressBarProps, 'showValue' | 'formatValue'> {
  valueText?: string;
}

export type { ProgressTrackProps };
