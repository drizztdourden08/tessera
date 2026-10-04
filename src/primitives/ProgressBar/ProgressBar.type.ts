/* @layer renderer-components @kind types */
type ProgressTone = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info';

interface ProgressBarProps {
  value: number;
  max?: number;
  tone?: ProgressTone;
  secondaryValue?: number;
  secondaryTone?: ProgressTone;
  label?: string;
  live?: boolean;
  className?: string;
}

export type { ProgressBarProps, ProgressTone };
