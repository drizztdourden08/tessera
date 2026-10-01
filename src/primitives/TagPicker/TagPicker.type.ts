/* @layer renderer-components @kind types */
import type { TagLook } from '../Tag';

type TagPickerOption<T extends string = string> = TagLook & {
  value: T;
  label: string;
};

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
