/* @layer renderer-components @kind types */
import type { LogInputResult } from '../behavior/log-input-result.type';

interface LogInputProps {
  onInput?: (text: string) => LogInputResult;
  prompt?: string;
  disabled?: boolean;
  placeholder?: string;
}

export type { LogInputProps };
