/* @layer renderer-components @kind types */
type ProgressTone = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info';

type ProgressPaint = { tone?: ProgressTone; color?: never } | { color: string; tone?: never };

type ProgressPart = ProgressPaint & {
  value: number;
  label: string;
};

type ProgressSegment = ProgressPart & {
  start: number;
  width: number;
};

interface ProgressBarBase {
  max?: number;
  secondaryValue?: number;
  secondaryTone?: ProgressTone;
  label?: string;
  live?: boolean;
  className?: string;
}

interface ProgressBarSingle extends ProgressBarBase {
  value: number;
  tone?: ProgressTone;
  parts?: never;
  legend?: never;
}

interface ProgressBarMultipart extends ProgressBarBase {
  parts: readonly ProgressPart[];
  legend?: boolean;
  value?: never;
  tone?: never;
}

type ProgressBarProps = ProgressBarSingle | ProgressBarMultipart;

export type { ProgressBarProps, ProgressPaint, ProgressPart, ProgressSegment, ProgressTone };
