/* @layer renderer-components @kind types */
type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

export type { SpinnerProps, SpinnerSize };
