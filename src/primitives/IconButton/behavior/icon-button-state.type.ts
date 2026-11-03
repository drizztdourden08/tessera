/* @layer renderer-components @kind types */
interface IconButtonStateInput {
  mixed: boolean;
  active: boolean;
  loading: boolean;
  disabled: boolean | undefined;
}

interface IconButtonState {
  'aria-pressed': boolean | 'mixed' | undefined;
  'aria-busy': true | undefined;
  disabled: boolean | undefined;
}

export type { IconButtonState, IconButtonStateInput };
