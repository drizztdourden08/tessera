/* @layer renderer-components @kind types */
import type { SelectOption } from '../Select.type';
import type { useSelectDropdown } from './useSelectDropdown';

interface UseSelectDropdownParams {
  disabled: boolean;
  searchable: boolean;
  allOptions: SelectOption[];
  onChange: (value: string) => void;
  defaultOpen?: boolean;
  inline?: boolean;
}

type SelectDropdown = ReturnType<typeof useSelectDropdown>;

export type { UseSelectDropdownParams, SelectDropdown };
