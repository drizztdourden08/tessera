/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintHandlers, HintReport } from '../hint/hint.type';

interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  hint?: Hint;
  disabled?: boolean | string;
}

interface RadioGroupProps<T extends string = string> {
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  onHint?: HintReport;
  label?: string;
  description?: string;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  name?: string;
  size?: ControlSize;
}

interface RadioGroupOptionProps<T extends string> {
  option: RadioOption<T>;
  checked: boolean;
  groupDisabled: boolean;
  name: string;
  handlers: HintHandlers;
  onChange: (value: T) => void;
}

export type {
  RadioGroupOptionProps,
  RadioOption,
  RadioGroupProps,
};
