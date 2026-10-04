/* @layer renderer-components @kind types */
import type { ReactNode, SelectHTMLAttributes } from 'react';
import type {
  FieldOf, ListboxColumn, ListboxFieldProps, ListboxLook, ListboxValueProps, ValueDisplay, ValueOf,
} from '../listbox/listbox.type';
import type { ControlSize } from '../field-control/field-control.type';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface SelectGroup {
  label: string;
  icon?: ReactNode;
  options: SelectOption[];
}

type MultiDisplay = 'count' | 'tags';

interface SelectLookProps extends ListboxFieldProps {
  searchable?: boolean;
  multiDisplay?: MultiDisplay;
}

interface SelectItemsProps<T, F extends FieldOf<T>> extends ListboxLook<T>, ListboxValueProps<T, F>, SelectLookProps {
  onActiveChange?: (value: ValueOf<T, F> | null) => void;
  options?: never;
  groups?: never;
  renderOption?: never;
}

interface SelectOptionsProps extends SelectLookProps {
  options?: readonly SelectOption[];
  groups?: readonly SelectGroup[];
  value?: string;
  onChange?: (value: string) => void;
  values?: readonly string[];
  onValuesChange?: (values: string[]) => void;
  onActiveChange?: (value: string | null) => void;
  columns?: readonly ListboxColumn<SelectOption>[];
  valueDisplay?: ValueDisplay;
  renderOption?: (option: SelectOption, isSelected: boolean) => ReactNode;
  items?: never;
}

type SelectProps<T = string, F extends FieldOf<T> = never> = SelectItemsProps<T, F> | SelectOptionsProps;

interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: ControlSize;
}

export type {
  MultiDisplay,
  NativeSelectProps,
  SelectGroup,
  SelectItemsProps,
  SelectLookProps,
  SelectOption,
  SelectOptionsProps,
  SelectProps,
};
