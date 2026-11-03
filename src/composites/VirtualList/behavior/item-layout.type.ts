/* @layer renderer-components @kind types */
interface ItemLayout {
  count: number;
  total: number;
  startOf: (index: number) => number;
  sizeOf: (index: number) => number;
  indexAt: (offset: number) => number;
}

export type { ItemLayout };
