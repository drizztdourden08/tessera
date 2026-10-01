/* @layer renderer-components @kind util */
import type { FieldControl } from '../field-control/field-control.type';
import type { FieldState } from './field-state.type';
import type { ListboxFieldProps } from './listbox.type';

const fieldState = (look: ListboxFieldProps, control: FieldControl): FieldState => ({
  invalid: look.invalid ?? control.invalid ?? false,
  labelledBy: look['aria-labelledby'] ?? control.labelId,
  disabled: look.disabled === true,
  size: look.size ?? control.size ?? 'md',
  className: look.className ?? '',
});

export { fieldState };
