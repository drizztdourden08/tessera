/* @layer renderer-components @kind types */
import type { ControlSize } from '../field-control/field-control.type';
import type { Hint, HintHandlers, HintReport } from '../hint/hint.type';
import type { OptionTooltip, TooltipPlacement } from '../Tooltip';

interface ToggleOption<T extends string = string> {
  value: T;
  label: string;
  hint?: Hint;
  tooltip?: OptionTooltip;
  disabled?: boolean | string;
}

interface ToggleGroupProps<T extends string = string> {
  value: T[];
  mixed?: readonly T[];
  options: ToggleOption<T>[];
  onChange: (value: T[]) => void;
  onHint?: HintReport;
  tooltipPlacement?: TooltipPlacement;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: ControlSize;
}

interface ToggleGroupButtonProps<T extends string> {
  option: ToggleOption<T>;
  active: boolean;
  mixed: boolean;
  groupDisabled: boolean;
  first: boolean;
  last: boolean;
  handlers: HintHandlers;
  placement: TooltipPlacement;
  onToggle: (value: T) => void;
}

export type { ToggleGroupButtonProps, ToggleOption, ToggleGroupProps };
