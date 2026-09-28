/* @layer renderer-components @kind types */
interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export type { StepperProps };
