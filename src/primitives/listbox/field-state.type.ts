/* @layer renderer-components @kind types */
interface FieldState {
  invalid: boolean;
  labelledBy: string | undefined;
  disabled: boolean;
  size: 'md' | 'sm';
  className: string;
}

export type { FieldState };
