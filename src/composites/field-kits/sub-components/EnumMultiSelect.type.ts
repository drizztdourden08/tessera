/* @layer renderer-components @kind types */
interface EnumMultiSelectProps {
  options: readonly string[];
  selected: readonly string[];
  placeholder: string;
  onChange: (selected: readonly string[]) => void;
}

export type { EnumMultiSelectProps };
