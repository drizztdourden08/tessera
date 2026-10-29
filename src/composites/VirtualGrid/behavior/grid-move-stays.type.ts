/* @layer renderer-components @kind types */
interface GridMoveStaysInput {
  keys: readonly string[];
  moving: readonly string[];
  index: number;
  section?: string;
  owners: readonly string[];
  indexOfKey: ReadonlyMap<string, number>;
}

export type { GridMoveStaysInput };
