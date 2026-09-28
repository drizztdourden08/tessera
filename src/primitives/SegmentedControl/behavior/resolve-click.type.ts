/* @layer renderer-components @kind types */
type ClickOutcome<T extends string> =
  | { kind: 'change'; value: T }
  | { kind: 'deselect' };

export type { ClickOutcome };
