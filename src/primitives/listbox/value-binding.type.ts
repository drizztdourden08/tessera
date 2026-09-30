/* @layer renderer-components @kind types */
interface ValueBinding<T, V> {
  valueOf: (item: T) => V;
  identityOfValue: (value: V) => string;
  identityOfItem: (item: T) => string;
  itemOfValue: (value: unknown) => T | undefined;
  selected: readonly V[];
  commit: (values: readonly V[]) => void;
}

export type { ValueBinding };
