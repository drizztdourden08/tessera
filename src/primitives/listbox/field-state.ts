/* @layer renderer-components @kind util */
import type { ControlSize, FieldControl } from '../field-control/field-control.type';
import type { FieldState } from './field-state.type';
import type { ListboxFieldProps } from './listbox.type';

const fieldState = (look: ListboxFieldProps, control: FieldControl, fallback: ControlSize): FieldState => ({
  invalid: look.invalid ?? control.invalid ?? false,
  labelledBy: look['aria-labelledby'] ?? control.labelId,
  disabled: look.disabled === true,
  size: look.size ?? control.size ?? fallback,
  className: look.className ?? '',
});

export { fieldState };
