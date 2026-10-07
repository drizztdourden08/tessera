/* @layer renderer-components @kind types */
import type { ControlName } from '../field-control/control-name.type';
import type { ControlSize } from '../field-control/field-control.type';
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

interface TagPickerProps<T extends string = string> extends ControlName {
  value: T[];
  groups: TagPickerGroup<T>[];
  onChange: (value: T[]) => void;
  label?: string;
  disabled?: boolean;
  single?: boolean;
  size?: ControlSize;
}

export type { TagPickerGroup, TagPickerOption, TagPickerProps };
