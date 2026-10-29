/* @layer renderer-components @kind types */
interface FlattenItemsInput<T> {
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
  isBranch: (item: T) => boolean;
  open: ReadonlySet<string>;
  loading: ReadonlySet<string>;
  kept: ReadonlySet<string> | null;
}

interface KeptKeysInput<T> {
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
  filter: (item: T) => boolean;
}

interface KeptKeys {
  kept: ReadonlySet<string>;
  forced: ReadonlySet<string>;
}

export type { FlattenItemsInput, KeptKeys, KeptKeysInput };
