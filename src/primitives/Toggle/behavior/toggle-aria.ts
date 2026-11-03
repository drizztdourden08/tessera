/* @layer renderer-components @kind util */
import { mixedOr } from '../../field-control/mixed-or';
import type { ToggleAria, ToggleAriaInput } from './toggle-aria.type';

const toggleAria = (input: ToggleAriaInput): ToggleAria => {
  const { checked, mixed, label, labelId, labelledBy, ariaLabel, hintLabel } = input;
  return {
    'aria-checked': mixedOr(mixed, checked),
    'data-mixed': mixed || undefined,
    'aria-label': label || labelledBy ? undefined : ariaLabel ?? hintLabel,
    'aria-labelledby': label ? labelId : labelledBy,
  };
};

export { toggleAria };
