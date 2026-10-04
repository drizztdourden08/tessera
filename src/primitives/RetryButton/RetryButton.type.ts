/* @layer renderer-components @kind types */
import type { ButtonProps } from '../Button/Button.type';

interface RetryButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'icon' | 'loading'> {
  onRetry: () => void;
  retryAt?: number | null;
  attempt?: number;
  attempts?: number;
  retrying?: boolean;
  label?: string;
}

interface RetryLineParams {
  secondsLeft: number;
  attempt?: number;
  attempts?: number;
}

export type { RetryButtonProps, RetryLineParams };
