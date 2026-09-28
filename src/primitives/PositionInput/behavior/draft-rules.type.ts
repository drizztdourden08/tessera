/* @layer renderer-components @kind types */
type TypedOutcome =
  | { kind: 'emit'; value: number }
  | { kind: 'hold'; draft: number };

export type { TypedOutcome };
