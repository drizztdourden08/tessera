/* @layer renderer-components @kind types */
import type { SelectDropdown } from '../behavior/useSelectDropdown.type';

interface SelectTriggerProps {
  dropdown: SelectDropdown;
  className: string;
  disabled: boolean;
  invalid: boolean;
  selectedLabel?: string;
  placeholder: string;
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export type { SelectTriggerProps };
