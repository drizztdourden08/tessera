/* @layer renderer-components @kind types */
import type { ComboboxState } from '../behavior/useCombobox.type';
import type { ComboboxLookProps } from '../Combobox.type';

interface ComboboxFieldProps<T> {
  box: ComboboxState<T>;
  look: ComboboxLookProps;
}

export type { ComboboxFieldProps };
