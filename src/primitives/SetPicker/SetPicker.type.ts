/* @layer renderer-components @kind types */
interface SetPickerProps {
  options: readonly string[];
  value: readonly string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

export type { SetPickerProps };
