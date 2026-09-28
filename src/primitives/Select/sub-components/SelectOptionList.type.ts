/* @layer renderer-components @kind types */
import type { SelectDropdown } from '../behavior/useSelectDropdown.type';
import type { SelectGroup, SelectOption, SelectProps } from '../Select.type';

interface SelectOptionListProps {
  dropdown: SelectDropdown;
  value: string;
  groups?: SelectGroup[];
  allOptions: SelectOption[];
  renderOption?: SelectProps['renderOption'];
}

export type { SelectOptionListProps };
