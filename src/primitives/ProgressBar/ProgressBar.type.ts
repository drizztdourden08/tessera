/* @layer renderer-components @kind types */
type ProgressVariant = 'primary' | 'secondary' | 'danger';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  secondaryValue?: number;
  secondaryVariant?: ProgressVariant;
  live?: boolean;
  className?: string;
}

export type { ProgressBarProps, ProgressVariant };
