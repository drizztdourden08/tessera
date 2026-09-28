/* @layer renderer-components @kind types */
interface EnumTagSelectProps {
  id: string;
  options: readonly string[];
  selected: readonly string[];
  onChange: (selected: readonly string[]) => void;
  single?: boolean;
  disabled?: boolean;
}

export type { EnumTagSelectProps };
