/* @layer renderer-components @kind util */
import { mixedOr } from '../../field-control/mixed-or';
import type { ToggleAria, ToggleAriaInput } from './toggle-aria.type';

const toggleAria = (input: ToggleAriaInput): ToggleAria => {
  const { checked, mixed, label, labelId, labelledBy, ariaLabel, hintLabel } = input;
  const named = Boolean(ariaLabel) && labelledBy === undefined;
  const fallback = label || labelledBy ? undefined : hintLabel;
  return {
    'aria-checked': mixedOr(mixed, checked),
    'data-mixed': mixed || undefined,
    'aria-label': named ? ariaLabel : fallback,
    'aria-labelledby': named || !label ? labelledBy : labelId,
  };
};

export { toggleAria };
