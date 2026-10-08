/* @layer renderer-components @kind types */
interface EnumMultiSelectProps {
  options: readonly string[];
  selected: readonly string[];
  placeholder: string;
  labelOf?: (option: string) => string;
  onChange: (selected: readonly string[]) => void;
}

export type { EnumMultiSelectProps };
