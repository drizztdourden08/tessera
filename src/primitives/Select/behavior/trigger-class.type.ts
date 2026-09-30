/* @layer renderer-components @kind types */
interface TriggerClassInput {
  open: boolean;
  disabled: boolean;
  size: 'md' | 'sm';
  full: boolean;
  className: string;
}

export type { TriggerClassInput };
