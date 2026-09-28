/* @layer renderer-components @kind types */
interface ToggleOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface ToggleGroupProps<T extends string = string> {
  value: T[];
  options: ToggleOption<T>[];
  onChange: (value: T[]) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export type { ToggleOption, ToggleGroupProps };
