/* @layer renderer-components @kind types */
interface FlattenInput<T> {
  open: ReadonlySet<string>;
  getItemKey: (item: T) => string;
}

export type { FlattenInput };
