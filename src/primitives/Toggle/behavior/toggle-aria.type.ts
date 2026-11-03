/* @layer renderer-components @kind types */
interface ToggleAriaInput {
  checked: boolean;
  mixed: boolean;
  label: string | undefined;
  labelId: string | undefined;
  labelledBy: string | undefined;
  ariaLabel: string | undefined;
  hintLabel: string | undefined;
}

interface ToggleAria {
  'aria-checked': boolean | 'mixed';
  'data-mixed': true | undefined;
  'aria-label': string | undefined;
  'aria-labelledby': string | undefined;
}

export type { ToggleAria, ToggleAriaInput };
