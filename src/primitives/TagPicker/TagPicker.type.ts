/* @layer renderer-components @kind types */
interface TagPickerOption<T extends string = string> {
  value: T;
  label: string;
}

interface TagPickerGroup<T extends string = string> {
  id: string;
  label?: string;
  options: TagPickerOption<T>[];
}

interface TagPickerProps<T extends string = string> {
  value: T[];
  groups: TagPickerGroup<T>[];
  onChange: (value: T[]) => void;
  label?: string;
  disabled?: boolean;
  single?: boolean;
}

export type { TagPickerGroup, TagPickerOption, TagPickerProps };
