/* @layer renderer-components @kind types */
type Comparator = (a: unknown, b: unknown) => number;
type GroupKeyFn = (value: unknown) => string;

export type { Comparator, GroupKeyFn };
